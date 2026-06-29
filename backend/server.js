const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
require("dotenv").config();
const productRoutes = require("./routes/productRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const adminRoutes = require("./routes/adminRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const homeRoutes = require("./routes/homeRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const contactRoutes = require("./routes/contactRoutes");
const teamRoutes = require("./routes/teamRoutes");
const storyRoutes = require("./routes/storyRoutes");


const app = express();

connectDB();

// CORS Whitelist Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    const isVercel = origin.endsWith(".vercel.app");
    const isAllowedLocal = allowedOrigins.indexOf(origin) !== -1;
    
    if (isVercel || isAllowedLocal) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS policy violation: Access from specified Origin is denied."), false);
    }
  },
  credentials: true
}));

app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/api/products", productRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/stories", storyRoutes);
app.use("/admin", express.static("admin"));

app.get("/", function(req, res) {
  res.send("Backend is running successfully");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
  console.log("Server running on port " + PORT);
});
