const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ================= LOGIN ================= */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN DATA:", email);

    // 1. check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // 2. check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // 3. create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4. send response
    res.json({
      token,
      role: user.role,
      user
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


/* ================= REGISTER ================= */
exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      email,
      password: hashed,
      name,
      role: "employee"
    });

    res.json(user);

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};