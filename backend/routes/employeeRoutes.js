const router = require("express").Router();
const Employee = require("../models/Employee");
const auth = require("../middleware/authMiddleware");

// ✅ GET MY EMPLOYEE
router.get("/me", auth, async (req, res) => {
  try {
    const employee = await Employee.findOne({ userId: req.user.id });

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

    // 🔥 show only employees created by this admin
    const employees = await Employee.find({ userId: req.user.id });

    res.json(employees);
  } catch (err) {
    console.log("GET ALL ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
});

// ✅ CREATE EMPLOYEE (ADMIN ONLY) 🔥 FIXED
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    console.log("BODY:", req.body);

    const emp = new Employee({
      ...req.body,

      // 🔥 MOST IMPORTANT FIX
      userId: req.user.id
    });

    await emp.save();

    res.json(emp);
  } catch (err) {
    console.log("CREATE ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
});

// ✅ UPDATE EMPLOYEE (ADMIN ONLY)
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

// ✅ DELETE EMPLOYEE (ADMIN ONLY)
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