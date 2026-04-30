const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");


// 🔥 REGISTER (FIXED)
router.post("/register", async (req, res) => {
  try {
    let { email, password } = req.body;

    // ✅ NORMALIZE EMAIL
    email = email.toLowerCase().trim();

    if (!email || !password) {
      return res.status(400).json({
        msg: "Email & password required"
      });
    }

    // 🔥 FIX: SEARCH USING ALL EMAILS
    const emp = await Employee.findOne({
      $or: [
        { email },
        { workEmail: email },
        { personalEmail: email }
      ]
    });

    if (!emp) {
      return res.status(400).json({
        msg: "Employee not found. Contact admin."
      });
    }

    if (emp.isRegistered) {
      return res.status(400).json({
        msg: "Already registered. Please login."
      });
    }

    // 🔐 HASH PASSWORD
    const hashed = await bcrypt.hash(password, 10);

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


// 🔥 LOGIN (ALREADY GOOD, JUST NORMALIZE EMAIL)
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.toLowerCase().trim();

    if (!email || !password) {
      return res.status(400).json({
        msg: "Email & password required"
      });
    }

    const user = await Employee.findOne({
      $or: [
        { email },
        { workEmail: email },
        { personalEmail: email }
      ]
    });

    if (!user) {
      return res.status(400).json({
        msg: "User not found"
      });
    }

    if (!user.password) {
      return res.status(400).json({
        msg: "Please register first"
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