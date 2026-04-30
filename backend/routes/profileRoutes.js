const express = require("express");
const router = express.Router();

const Employee = require("../models/Employee");
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// ================= GET PROFILE =================
router.get("/", auth, async (req, res) => {
  try {
    console.log("🔍 PROFILE USER ID:", req.user.id);

    const employee = await Employee.findById(req.user.id);

    if (!employee) {
      return res.status(404).json({
        msg: "Employee not found"
      });
    }

    res.json(employee);

  } catch (err) {
    console.log("❌ PROFILE ERROR:", err);
    res.status(500).json({
      msg: "Error fetching profile"
    });
  }
});


// ================= UPDATE PROFILE =================
router.put("/", auth, async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    console.log("❌ UPDATE PROFILE ERROR:", err);
    res.status(500).json({
      msg: "Update failed"
    });
  }
});


// ================= UPLOAD DOCUMENT =================
router.post("/upload", auth, upload.single("file"), async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.id);

    if (!employee) {
      return res.status(404).json({
        msg: "Employee not found"
      });
    }

    // 🔥 ensure documents array exists
    if (!employee.documents) {
      employee.documents = [];
    }

    employee.documents.push({
      name: req.file.originalname,
      url: req.file.path
    });

    await employee.save();

    res.json(employee);

  } catch (err) {
    console.log("❌ UPLOAD ERROR:", err);
    res.status(500).json({
      msg: "Upload failed"
    });
  }
});


module.exports = router;