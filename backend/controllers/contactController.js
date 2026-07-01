const Contact = require("../models/Contact");

// ─── In-memory OTP store ───────────────────────────────────────────────────
// Structure: { [email]: { otp, name, subject, message, expiresAt } }
// OTPs live for 5 minutes then are auto-cleared
const otpStore = new Map();

const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ─── STEP 1: Send OTP to the user's email ─────────────────────────────────
const sendOtp = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Basic format check
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email address format." });
    }

    // Generate OTP and store it with the form data
    const otp = generateOtp();
    const expiresAt = Date.now() + OTP_TTL_MS;

    otpStore.set(email.toLowerCase(), { otp, name, subject, message, expiresAt });

    // Auto-delete after TTL to keep memory clean
    setTimeout(() => {
      const entry = otpStore.get(email.toLowerCase());
      if (entry && entry.expiresAt <= Date.now()) {
        otpStore.delete(email.toLowerCase());
      }
    }, OTP_TTL_MS + 1000);

    // Send OTP email via Vercel email relay
    const relayUrl = "https://embedaiot81.vercel.app/api/send-email";
    const secret = "embedaiot_relay_secret_2026_key";

    const relayRes = await fetch(relayUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        to: email,
        subject: "Your Verification Code — Embed AIoT",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; border: 1px solid #e5e7eb; border-radius: 12px;">
            <h2 style="color: #1f2937; margin-bottom: 8px;">Email Verification</h2>
            <p style="color: #6b7280; margin-bottom: 24px;">Hi <strong>${name}</strong>, use the code below to verify your email and send your message to Embed AIoT.</p>
            <div style="background: #fef3c7; border-radius: 8px; padding: 24px; text-align: center; margin-bottom: 24px;">
              <p style="font-size: 40px; font-weight: 900; letter-spacing: 12px; color: #92400e; margin: 0;">${otp}</p>
            </div>
            <p style="color: #9ca3af; font-size: 13px;">This code expires in <strong>5 minutes</strong>. If you did not request this, please ignore this email.</p>
          </div>
        `,
      })
    });

    if (!relayRes.ok) {
      const errData = await relayRes.json().catch(() => ({}));
      throw new Error(errData.message || errData.error || "Email relay returned non-OK status");
    }

    return res.status(200).json({
      success: true,
      message: "A 6-digit verification code has been sent to your email. Please check your inbox.",
    });

  } catch (error) {
    console.error("sendOtp error:", error);
    return res.status(500).json({
      message: "Failed to send verification email. Please try again shortly.",
    });
  }
};

// ─── STEP 2: Verify OTP and save the contact message ──────────────────────
const verifyOtpAndSave = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and verification code are required." });
    }

    const entry = otpStore.get(email.toLowerCase());

    if (!entry) {
      return res.status(400).json({
        message: "No verification code was found for this email. Please request a new one.",
      });
    }

    if (Date.now() > entry.expiresAt) {
      otpStore.delete(email.toLowerCase());
      return res.status(400).json({
        message: "Your verification code has expired. Please request a new one.",
      });
    }

    if (entry.otp !== otp.toString().trim()) {
      return res.status(400).json({ message: "Incorrect verification code. Please try again." });
    }

    // ✅ OTP is valid — save the contact message
    const { name, subject, message } = entry;
    otpStore.delete(email.toLowerCase()); // consume OTP — one-time use

    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    // Send confirmation emails in the background (non-blocking)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const relayUrl = "https://embedaiot81.vercel.app/api/send-email";
      const secret = "embedaiot_relay_secret_2026_key";

      // Notify admin
      fetch(relayUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret,
          to: process.env.EMAIL_RECEIVER || "embedaiot@gmail.com",
          subject: `New Contact Message from ${name}: ${subject}`,
          text: `Hi, I am ${name}.\n\n${message}`,
          html: `<p>Hi, I am <strong>${name}</strong>.</p><p>${message}</p>`,
          replyTo: email,
        }),
      }).catch(err => console.error("Admin email relay error:", err));

      // Confirm to visitor
      fetch(relayUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret,
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
        }),
      }).catch(err => console.error("Visitor confirmation email error:", err));
    }

    return res.status(201).json({
      success: true,
      message: "Message sent successfully! We'll get back to you soon.",
    });

  } catch (error) {
    console.error("verifyOtpAndSave error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ─── GET ALL CONTACTS — admin only ────────────────────────────────────────
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ date: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── DELETE CONTACT MESSAGE ────────────────────────────────────────────────
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
  sendOtp,
  verifyOtpAndSave,
  getContacts,
  deleteContact,
};