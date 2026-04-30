const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    // 🔥 Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No valid token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Token missing" });
    }

    // 🔥 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 Attach user to request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };

    // 🔥 Debug (only in development)
    if (process.env.NODE_ENV !== "production") {
      console.log("✅ AUTH USER:", req.user);
    }

    next();

  } catch (err) {
    console.log("❌ JWT ERROR:", err.message);

    return res.status(401).json({
      msg: "Invalid or expired token"
    });
  }
};