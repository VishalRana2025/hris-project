const router = require("express").Router();

const Legal = require("../models/LegalEntity");
const Location = require("../models/Location");
const Business = require("../models/BusinessUnit");
const Department = require("../models/Department");
const Job = require("../models/JobTitle");

console.log("🔥 ORG ROUTES LOADED");

/* =========================
   🔥 LEGAL ENTITY
========================= */

// CREATE
router.post("/legal", async (req, res) => {
  try {
    const data = await Legal.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL
router.get("/legal", async (req, res) => {
  try {
    const data = await Legal.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/legal/:id", async (req, res) => {
  try {
    const data = await Legal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/legal/:id", async (req, res) => {
  try {
    await Legal.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* =========================
   🔥 BUSINESS UNIT
========================= */

router.post("/business", async (req, res) => {
  const data = await Business.create(req.body);
  res.json(data);
});

router.get("/business", async (req, res) => {
  const data = await Business.find().sort({ createdAt: -1 });
  res.json(data);
});

router.put("/business/:id", async (req, res) => {
  const data = await Business.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(data);
});

router.delete("/business/:id", async (req, res) => {
  await Business.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted successfully" });
});


/* =========================
   🔥 LOCATION
========================= */

router.post("/location", async (req, res) => {
  const data = await Location.create(req.body);
  res.json(data);
});

router.get("/location", async (req, res) => {
  const data = await Location.find().sort({ createdAt: -1 });
  res.json(data);
});

router.put("/location/:id", async (req, res) => {
  const data = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(data);
});

router.delete("/location/:id", async (req, res) => {
  await Location.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted successfully" });
});


/* =========================
   🔥 DEPARTMENT
========================= */

router.post("/department", async (req, res) => {
  const data = await Department.create(req.body);
  res.json(data);
});

router.get("/department", async (req, res) => {
  const data = await Department.find().sort({ createdAt: -1 });
  res.json(data);
});

router.put("/department/:id", async (req, res) => {
  const data = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(data);
});

router.delete("/department/:id", async (req, res) => {
  await Department.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted successfully" });
});


/* =========================
   🔥 JOB TITLE
========================= */

router.post("/job", async (req, res) => {
  const data = await Job.create(req.body);
  res.json(data);
});

router.get("/job", async (req, res) => {
  const data = await Job.find().sort({ createdAt: -1 });
  res.json(data);
});

router.put("/job/:id", async (req, res) => {
  const data = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(data);
});

router.delete("/job/:id", async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted successfully" });
});


/* =========================
   🔥 TEST ROUTE
========================= */

router.get("/test", (req, res) => {
  res.send("ORG ROUTES WORKING ✅");
});

module.exports = router;