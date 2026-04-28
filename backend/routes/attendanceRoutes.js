const router = require("express").Router();
const Attendance = require("../models/Attendance");
const auth = require("../middleware/authMiddleware");

console.log("🔥 ATTENDANCE ROUTE FILE LOADED");

// ✅ Check-in
router.post("/checkin", auth, async (req, res) => {
  const today = new Date().toDateString();

  const existing = await Attendance.findOne({
    employeeId: req.user.id,
    date: today
  });

  if (existing) return res.json({ msg: "Already checked in" });

  const record = new Attendance({
    employeeId: req.user.id,
    date: today,
    checkIn: new Date().toLocaleTimeString()
  });

  await record.save();
  res.json(record);
});

// ✅ Check-out
router.post("/checkout", auth, async (req, res) => {
  const today = new Date().toDateString();

  const record = await Attendance.findOne({
    employeeId: req.user.id,
    date: today
  });

  if (!record) return res.status(400).json({ msg: "Check-in first" });

  record.checkOut = new Date().toLocaleTimeString();
  await record.save();

  res.json(record);
});

// ✅ Today attendance
router.get("/today", auth, async (req, res) => {
  const today = new Date().toDateString();
  const records = await Attendance.find({ date: today });
  res.json(records);
});

// 🔥🔥🔥 THIS WAS MISSING
// ✅ Attendance History
router.get("/history", auth, async (req, res) => {
  try {
    const records = await Attendance.find({
      employeeId: req.user.id
    }).sort({ createdAt: -1 });

    res.json(records);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error fetching history" });
  }
});

module.exports = router;