const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

// EMAIL SETUP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
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

    // send emails
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      // STEP 3 — send email to your client
      await transporter.sendMail({
        from: `"Embed AIoT Website" <${process.env.EMAIL_USER}>`,
        replyTo: email,
        to: process.env.EMAIL_RECEIVER || "embedaiot@gmail.com",      
        subject: `New Contact Message from ${name}: ${subject}`,

        html: `
          <h2>New message from your website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <hr/>
          <p style="color:gray; font-size:12px">
            Received on ${new Date().toLocaleString()}
          </p>
        `,

      });

      // STEP 4 — send confirmation email to the person who contacted
      await transporter.sendMail({

        from: process.env.EMAIL_USER,
        to: email,                       // sends to the visitor
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

      });
    } else {
      console.log("----------------------------------------");
      console.log("EMAIL CREDENTIALS NOT CONFIGURED IN DEV ENV.");
      console.log("Logged Contact Message Details:");
      console.log(`From Visitor: Name: ${name}, Email: ${email}, Subject: ${subject}`);
      console.log(`Message: ${message}`);
      console.log("----------------------------------------");
    }

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newContact,
    });

  } catch (error) {
    res.status(500).json({
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