const authMiddleware = require("../middleware/authmiddleware");
const {
  handleAdminLogin,
  feedbackRegister,
  getFeedBackForAdmin,
} = require("../controllers/feedController");

const router = require("express").Router();

router.post("/feedback-register", feedbackRegister);
router.post("/admin-login", handleAdminLogin);
router.get("/feedbacklist",  getFeedBackForAdmin);

router.get("/verify-session", authMiddleware, (req, res) => {
  res.status(200).json({
    isAuthenticated: true,
    admin: {
      id: req.admin.id,
      email: req.admin.email,
      role: req.admin.role,
    },
  });
});

router.post("/admin-logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid"); // Clear session cookie
    res.status(200).json({ message: "Logged out successfully" });
  });
});

module.exports = router;
