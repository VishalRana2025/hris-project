const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Employee = require("../models/Employee");
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// GET PROFILE (USER + EMPLOYEE)
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    let employee = await Employee.findOne({ userId: req.user.id });

    // 🔥 AUTO CREATE IF NOT EXISTS
    if (!employee) {
      employee = new Employee({
        userId: user._id,
        fullName: user.name,
        workEmail: user.email
      });

      await employee.save();
    }

    res.json({
      user,
      employee
    });

  } catch (err) {
    res.status(500).json({ msg: "Error fetching profile" });
  }
});

// UPDATE PROFILE
router.put("/", auth, async (req, res) => {
  const updated = await User.findByIdAndUpdate(
    req.user.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// UPLOAD DOCUMENT
router.post("/upload", auth, upload.single("file"), async (req, res) => {
  const user = await User.findById(req.user.id);

  user.documents.push({
    name: req.file.originalname,
    url: req.file.path
  });

  await user.save();

  res.json(user);
});


router.put("/employee", auth, async (req, res) => {
  const updated = await Employee.findOneAndUpdate(
    { userId: req.user.id },
    req.body,
    { new: true }
  );

  res.json(updated);
});

module.exports = router;