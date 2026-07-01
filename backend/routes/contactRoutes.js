const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  sendOtp,
  verifyOtpAndSave,
  getContacts,
  deleteContact,
} = require("../controllers/contactController");

// PUBLIC — OTP flow (step 1: send code, step 2: verify code + save)
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtpAndSave);

// ADMIN ONLY — must be logged in
router.get("/", protect, getContacts);
router.delete("/:id", protect, deleteContact);

module.exports = router;