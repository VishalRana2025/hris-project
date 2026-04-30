const router = require("express").Router();
const Employee = require("../models/Employee");
const auth = require("../middleware/authMiddleware");


// ✅ GET MY PROFILE (FIXED)
router.get("/me", auth, async (req, res) => {
  try {
    // 🔥 USE EMAIL FROM TOKEN
    const employee = await Employee.findOne({ email: req.user.email });

    if (!employee) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    res.json(employee);
  } catch (err) {
    console.log("GET ME ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
});


// ✅ GET ALL EMPLOYEES (ADMIN ONLY)
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


// ✅ CREATE EMPLOYEE (NO DUPLICATE)
router.post("/", auth, async (req, res) => {
  try {
    // 🔒 ONLY ADMIN
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const { email } = req.body;

    // 🔥 🔥 PASTE HERE (IMPORTANT)
    const existing = await Employee.findOne({ email });

    if (existing) {
      return res.status(400).json({
        msg: "Employee already exists"
      });
    }

    // ✅ CREATE EMPLOYEE
    const emp = await Employee.create({
      ...req.body,
      isRegistered: false
    });

    res.json(emp);

  } catch (err) {
    console.log("CREATE ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
});


// ✅ UPDATE EMPLOYEE
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

    if (!updated) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    res.json(updated);

  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
});


// ✅ DELETE EMPLOYEE
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