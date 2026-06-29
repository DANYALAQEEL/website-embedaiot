const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");


// REGISTER ADMIN / STAFF (Only available to existing admins)
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // CHECK EXISTING
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        message: "Account already exists with this email",
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role: role || "staff",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        createdAt: admin.createdAt,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// LOGIN ADMIN / STAFF
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Search in Database
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // CREATE TOKEN
    const token = jwt.sign(
      { id: admin._id, role: admin.role || "staff", name: admin.name },
      process.env.JWT_SECRET || "default_dev_secret_key_12345",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: admin.role || "staff",
      name: admin.name,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL USERS (Admin only)
const getUsers = async (req, res) => {
  try {
    const users = await Admin.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE USER (Admin only)
const deleteUser = async (req, res) => {
  try {
    // PREVENT SELF DELETION
    if (req.admin && req.admin.id === req.params.id) {
      return res.status(400).json({
        message: "Action denied: You cannot delete your own account.",
      });
    }

    const user = await Admin.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await Admin.findOne({ email });
    if (!user) {
      // Generic message to prevent email enumeration
      return res.status(200).json({
        message: "If that email is registered, a password reset link has been sent.",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash token and save to database
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration
    await user.save();

    // Create reset URL
    const frontendUrl = process.env.FRONTEND_URL || "https://embedaiot81.vercel.app";
    const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}&email=${email}`;

    // Mail options
    const mailOptions = {
      from: process.env.EMAIL_USER || "embedaiot@gmail.com",
      to: user.email,
      subject: "Password Reset Request - EMBED AIOT",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #0891b2; text-align: center;">EMBED AIOT Admin Portal</h2>
          <p>You requested a password reset for your administrator account. Please click the button below to set a new password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #0891b2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset Password</a>
          </div>
          <p>If the button doesn't work, you can also copy and paste the following link into your browser:</p>
          <p style="word-break: break-all; color: #64748b;"><a href="${resetUrl}">${resetUrl}</a></p>
          <p style="font-size: 12px; color: #94a3b8; margin-top: 40px; border-t: 1px solid #f1f5f9; padding-top: 20px;">
            This link is valid for 1 hour. If you did not request this reset, please ignore this email.
          </p>
        </div>
      `,
    };

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    try {
      await transporter.sendMail(mailOptions);
      console.log(`✅ Reset password email sent to ${user.email}`);
    } catch (mailError) {
      console.error("❌ Email sending failed. Logging reset link instead:", resetUrl);
      console.error(mailError.message);
    }

    res.status(200).json({
      message: "If that email is registered, a password reset link has been sent.",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;
    if (!email || !token || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Hash the incoming token to match it with DB
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find user with matching token and valid expiry
    const user = await Admin.findOne({
      email,
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid token, email, or token has expired",
      });
    }

    // Hash new password and save
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    
    // Clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({
      message: "Password reset successful. You can now log in with your new password.",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getUsers,
  deleteUser,
  forgotPassword,
  resetPassword,
};