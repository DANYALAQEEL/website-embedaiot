const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

const seedAdmin = async () => {
  try {
    const email = process.env.MASTER_ADMIN_EMAIL || "admin@embedaiot.com";
    const password = process.env.MASTER_ADMIN_PASSWORD || "admin12345";

    const masterAdmin = await Admin.findOne({ email });
    if (!masterAdmin) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await Admin.create({
        name: "Master Admin",
        email,
        password: hashedPassword,
        role: "admin",
      });
      console.log(`✅ Default admin account seeded in database: ${email}`);
    } else if (masterAdmin.role !== "admin") {
      masterAdmin.role = "admin";
      await masterAdmin.save();
      console.log(`✅ Default admin account role updated to 'admin': ${email}`);
    }
  } catch (error) {
    console.error("❌ Seeding admin failed:", error);
  }
};

const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI;
    if (!uri) {
      console.log("No MONGODB_URI found in env. Starting MongoMemoryServer for testing...");
      const { MongoMemoryServer } = require("mongodb-memory-server");
      const mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      console.log("MongoMemoryServer started at:", uri);
    }

    await mongoose.connect(uri);
    console.log("MongoDB Connected");

    // Run the seeding logic
    await seedAdmin();

  } catch (error) {
    console.error("DB Connection Error:", error);
  }
};

module.exports = connectDB;