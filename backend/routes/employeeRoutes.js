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
    res.status(500).json({ msg: "Error fetching employee" });
  }
});

// ✅ GET ALL EMPLOYEES (ADMIN ONLY)
router.get("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching employees" });
  }
});

// ✅ CREATE EMPLOYEE (ADMIN ONLY)
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const emp = new Employee(req.body);
    await emp.save();

    res.json(emp);
  } catch (err) {
    res.status(500).json({ msg: "Error creating employee" });
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
    res.status(500).json({ msg: "Update error" });
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
    res.status(500).json({ msg: "Delete error" });
  }
});


router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Only admin can add employee" });
  }

  const emp = new Employee(req.body);
  await emp.save();

  res.json(emp);
});

module.exports = router;