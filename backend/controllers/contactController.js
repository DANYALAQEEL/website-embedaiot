const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");
const dns = require("dns");

// EMAIL SETUP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // Force IPv4 lookup because Hugging Face / some environments have unrouted IPv6
  lookup: (hostname, options, callback) => {
    dns.lookup(hostname, { ...options, family: 4 }, callback);
  },
});

// CREATE CONTACT MESSAGE
const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;  
    
    if (!name || !email || !subject || !message) {  
      return res.status(400).json({ message: "All fields required" });
    }

    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    // Send emails in the background (non-blocking)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      // Send notification to admin
      transporter.sendMail({
        from: `"${name} (via Website)" <${process.env.EMAIL_USER}>`,
        replyTo: email,
        to: process.env.EMAIL_RECEIVER || "embedaiot@gmail.com",      
        subject: `New Contact Message from ${name}: ${subject}`,
        text: `Hi, I am ${name}.\n\n${message}`,
        html: `<p>Hi, I am <strong>${name}</strong>.</p><p>${message}</p>`,
      }).catch(err => console.error("Error sending admin notification email:", err));

      // Send confirmation to visitor
      transporter.sendMail({
        from: `"Embed AIoT" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "We received your message — Embed AIoT",
        html: `
          <h2>Thank you for contacting Embed AIoT, ${name}!</h2>
          <p>We have received your message and will get back to you shortly.</p>
          <br/>
          <p>Your message:</p>
          <p style="color:gray">${message}</p>
          <br/>
          <p>Best regards,</p>
          <p><strong>Embed AIoT Team</strong></p>
        `,
      }).catch(err => console.error("Error sending visitor confirmation email:", err));
    } else {
      console.log("----------------------------------------");
      console.log("EMAIL CREDENTIALS NOT CONFIGURED IN DEV ENV.");
      console.log("Logged Contact Message Details:");
      console.log(`From Visitor: Name: ${name}, Email: ${email}, Subject: ${subject}`);
      console.log(`Message: ${message}`);
      console.log("----------------------------------------");
    }

    // Respond immediately to the client
    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newContact,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL CONTACTS — admin only
const getContacts = async (req, res) => {
  try {
    // newest messages first
    const contacts = await Contact.find().sort({ date: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// DELETE CONTACT MESSAGE
const deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createContact,
  getContacts,
  deleteContact, 
};