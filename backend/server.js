require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ DEBUG (VERY IMPORTANT)
console.log("🚀 SERVER FILE LOADED");

// ✅ ROUTES IMPORT
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const profileRoutes = require("./routes/profileRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const orgRoutes = require("./routes/orgRoutes"); // 🔥 IMPORTANT

// ✅ ROUTES USE
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/org", require("./routes/orgRoutes"));

// 🔥 ORG ROUTE (THIS WAS YOUR ISSUE AREA)
app.use("/api/org", orgRoutes);

// ✅ TEST ROUTE (FOR DEBUG)
app.get("/api/test", (req, res) => {
  res.send("API WORKING ✅");
});

// ✅ STATIC
app.use("/uploads", express.static("uploads"));

// ✅ DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// ✅ SERVER
app.listen(5000, () => {
  console.log("🔥 Server running on port 5000");
});