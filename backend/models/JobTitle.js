const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
  department: String,
  description: String
}, { timestamps: true });

module.exports = mongoose.model("JobTitle", schema);