const router = require("express").Router();
const Employee = require("../models/Employee");
const auth = require("../middleware/authMiddleware");


// ==============================
// ✅ GET MY PROFILE
// ==============================
router.get("/me", auth, async (req, res) => {
  try {
    const userEmail = req.user.email.toLowerCase().trim();

    const employee = await Employee.findOne({
      $or: [
        { email: userEmail },
        { workEmail: userEmail },
        { personalEmail: userEmail }
      ]
    }).select("-password");

    if (!employee) {
      return res.status(404).json({
        msg: "Employee not found"
      });
    }

    res.json(employee);

  } catch (err) {
    console.log("GET ME ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
});


// ==============================
// ✅ GET ALL EMPLOYEES (ADMIN)
// ==============================
router.get("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const employees = await Employee.find().sort({ createdAt: -1 });

    res.json(employees);

  } catch (err) {
    console.log("GET ALL ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
});


// ==============================
// ✅ CREATE EMPLOYEE
// ==============================
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const workEmail = req.body.workEmail?.toLowerCase().trim();
    const personalEmail = req.body.personalEmail?.toLowerCase().trim();

    const existing = await Employee.findOne({
      $or: [
        { email: workEmail },
        { workEmail },
        { personalEmail }
      ]
    });

    if (existing) {
      return res.status(400).json({
        msg: "Email already used"
      });
    }

    const emp = await Employee.create({
      ...req.body,
      email: workEmail, // 🔥 LINK FIELD
      workEmail,
      personalEmail
    });

    res.json(emp);

  } catch (err) {
    console.log("CREATE ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
});


// ==============================
// ✅ UPDATE EMPLOYEE
// ==============================
router.put("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
});


// ==============================
// ✅ DELETE EMPLOYEE
// ==============================
router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    await Employee.findByIdAndDelete(req.params.id);

    res.json({ msg: "Employee deleted" });

  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;