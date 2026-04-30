const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");


// 🔥 REGISTER (ACTIVATE EXISTING EMPLOYEE)
router.post("/register", async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);

    const { email, password } = req.body;

    // ✅ VALIDATION
    if (!email || !password) {
      return res.status(400).json({
        msg: "Email & password required"
      });
    }

    // 🔍 FIND EMPLOYEE (NOT USER)
    const emp = await Employee.findOne({ email });

    if (!emp) {
      return res.status(400).json({
        msg: "Employee not found. Contact admin."
      });
    }

    // 🚫 PREVENT DUPLICATE REGISTRATION
    if (emp.isRegistered) {
      return res.status(400).json({
        msg: "Already registered. Please login."
      });
    }

    // 🔐 HASH PASSWORD
    const hashed = await bcrypt.hash(password, 10);

    // ✅ UPDATE SAME RECORD (NO NEW USER)
    emp.password = hashed;
    emp.isRegistered = true;

    await emp.save();

    res.json({
      msg: "Registered successfully ✅"
    });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


// 🔥 LOGIN (USING EMPLOYEE MODEL)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ VALIDATION
    if (!email || !password) {
      return res.status(400).json({
        msg: "Email & password required"
      });
    }

    // 🔍 FIND EMPLOYEE
    const user = await Employee.findOne({ email });

    if (!user || !user.password) {
      return res.status(400).json({
        msg: "Invalid credentials"
      });
    }

    // 🔐 CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        msg: "Wrong password"
      });
    }

    // 🔑 GENERATE TOKEN (IMPORTANT: INCLUDE EMAIL)
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ RESPONSE
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