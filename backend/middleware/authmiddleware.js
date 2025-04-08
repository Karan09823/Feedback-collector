const AdminUser = require("../models/Admin");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.session || !req.session.admin) {
      return res.status(401).json({ error: "Access denied - not logged in" });
    }

    const admin = await AdminUser.findById(req.session.admin.id);
    if (!admin) {
      req.session.destroy();
      return res.status(401).json({ message: "Admin no longer exists" });
    }

    req.admin = {
      id: admin._id,
      email: admin.email,
      role: admin.role,
    };

    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(500).json({ message: "Authentication failed" });
  }
};

module.exports = authMiddleware;
