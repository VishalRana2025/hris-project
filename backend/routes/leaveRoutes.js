const router = require("express").Router();
const Leave = require("../models/Leave");
const auth = require("../middleware/authMiddleware");

// APPLY LEAVE (USER)
router.post("/", auth, async (req, res) => {
  const leave = new Leave({
    ...req.body,
    userId: req.user.id
  });

  await leave.save();
  res.json(leave);
});

// GET MY LEAVES (USER)
router.get("/my", auth, async (req, res) => {
  const leaves = await Leave.find({ userId: req.user.id });
  res.json(leaves);
});

// GET ALL LEAVES (ADMIN)
router.get("/", auth, async (req, res) => {
  const leaves = await Leave.find().populate("userId");
  res.json(leaves);
});

// APPROVE / REJECT (ADMIN)
router.put("/:id", auth, async (req, res) => {
  const updated = await Leave.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(updated);
});

module.exports = router;