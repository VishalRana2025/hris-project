const router = require("express").Router();
const Employee = require("../models/Employee");
let Leave;
try {
  Leave = require("../models/Leave"); // optional
} catch (err) {
  Leave = null;
}

const auth = require("../middleware/authMiddleware");

router.get("/stats", auth, async (req, res) => {
  try {
    // 🔐 ADMIN CHECK
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    // ✅ TOTAL EMPLOYEES
    const totalEmployees = await Employee.countDocuments();

    // ✅ TEMP PRESENT (until attendance added)
    const presentToday = totalEmployees;

    // ✅ LEAVE DATA (SAFE)
    let onLeave = 0;
    let pendingRequests = 0;

    if (Leave) {
      onLeave = await Leave.countDocuments({ status: "approved" });
      pendingRequests = await Leave.countDocuments({ status: "pending" });
    }

    res.json({
      totalEmployees,
      presentToday,
      onLeave,
      pendingRequests
    });

  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ msg: "Error fetching stats" });
  }
});

module.exports = router;