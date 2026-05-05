const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");
console.log("🔥 AUTH ROUTE FILE LOADED");


// ================= REGISTER =================
// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email?.toLowerCase().trim();

    if (!email || !password) {
      return res.status(400).json({
        msg: "Email & password required"
      });
    }

    const emp = await Employee.findOne({ email });

    if (!emp) {
      return res.status(400).json({
        msg: "Employee not found"
      });
    }

    if (emp.password) {
      return res.status(400).json({
        msg: "Already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    emp.password = hashedPassword;
    emp.isRegistered = true;

    await emp.save();

    res.json({ msg: "Registered successfully ✅" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email?.toLowerCase().trim();

    if (!email || !password) {
      return res.status(400).json({
        msg: "Email & password required"
      });
    }

    console.log("🔥 LOGIN RUNNING:", email);

    const user = await Employee.findOne({
      email,
      password: { $ne: null }
    });

    console.log("FINAL USER:", user);

    // ✅ IMPORTANT FIX
    if (!user) {
      return res.status(400).json({
        msg: "User not found or not registered"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        msg: "Wrong password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role,
      user
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;