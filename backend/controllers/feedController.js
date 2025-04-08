const feedUser = require("../models/feedUser");
const adminUser = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const jwt_secret = process.env.jwt_secret;

const feedbackRegister = async (req, res) => {
  try {
    const { fullName, email, message } = req.body;
    const feedback = new feedUser({ fullName, email, message });
    await feedback.save();
    return res.status(200).json({
      message: "Your Response Submitted",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getFeedBackForAdmin = async (req, res) => {
  try {
  
    const feedbackList = await feedUser.find(); 
    return res.status(200).json({
      message: "Feedback user list",
      feedbacks: feedbackList,
    });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await adminUser.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Create session
    req.session.admin = {
      id: admin._id,
      email: admin.email,
      role: admin.role,
    };

    const adminData = admin.toObject();
    delete adminData.password;

    return res.status(200).json({
      message: "Admin logged in",
      admin: adminData,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  handleAdminLogin,
  feedbackRegister,
  getFeedBackForAdmin,
};
