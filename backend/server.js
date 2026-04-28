require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ================= CORS CONFIG ================= */
const corsOptions = {
  origin: function (origin, callback) {
    if (
      !origin || // allow Postman / curl
      origin.includes("localhost") ||
      origin.includes("vercel.app") // 🔥 allow all Vercel deployments
    ) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed: " + origin));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

/* ✅ APPLY CORS (NO app.options needed) */
app.use(cors(corsOptions));

/* ================= MIDDLEWARE ================= */
app.use(express.json());

console.log("🚀 SERVER FILE LOADED");

/* ================= ROUTES ================= */
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const profileRoutes = require("./routes/profileRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const orgRoutes = require("./routes/orgRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/org", orgRoutes);

/* ================= TEST ROUTE ================= */
app.get("/api/test", (req, res) => {
  res.send("API WORKING ✅");
});

/* ================= STATIC ================= */
app.use("/uploads", express.static("uploads"));

/* ================= DATABASE ================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});