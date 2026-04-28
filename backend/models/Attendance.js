const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee"
  },
  date: {
    type: String
  },
  checkIn: String,
  checkOut: String
});

module.exports = mongoose.model("Attendance", attendanceSchema);