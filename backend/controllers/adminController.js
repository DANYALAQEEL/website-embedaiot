const Admin = require("../models/Admin");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


// REGISTER ADMIN
const registerAdmin = async (req, res) => {
  try {

    const { name, email, password } = req.body;


    // CHECK EXISTING ADMIN
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }


    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);


    // CREATE ADMIN
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });


    res.status(201).json({
      message: "Admin registered successfully",
      admin,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// LOGIN ADMIN
const loginAdmin = async (req, res) => {
  try {

    const { email, password } = req.body;


    // FIND ADMIN
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
      { id: admin._id },
      process.env.JWT_SECRET || "default_dev_secret_key_12345",
      { expiresIn: "7d" }
    );


    res.status(200).json({
      message: "Login successful",
      token,
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
};