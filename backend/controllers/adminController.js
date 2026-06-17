const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Hardcoded Master Admin Credentials
const MASTER_ADMIN_EMAIL = process.env.MASTER_ADMIN_EMAIL || "admin@embedaiot.com";
const MASTER_ADMIN_PASSWORD = process.env.MASTER_ADMIN_PASSWORD || "admin12345";

// REGISTER ADMIN / STAFF (Only available to existing admins)
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // CHECK EXISTING
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin || email === MASTER_ADMIN_EMAIL) {
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

    // Check against Master Admin first
    if (email === MASTER_ADMIN_EMAIL && password === MASTER_ADMIN_PASSWORD) {
      const token = jwt.sign(
        { id: "master_admin", role: "admin", name: "Master Admin" },
        process.env.JWT_SECRET || "default_dev_secret_key_12345",
        { expiresIn: "7d" }
      );
      return res.status(200).json({
        message: "Login successful",
        token,
        role: "admin",
        name: "Master Admin",
      });
    }

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

module.exports = {
  registerAdmin,
  loginAdmin,
  getUsers,
  deleteUser,
};