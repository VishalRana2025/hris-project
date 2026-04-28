const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: String,
  country: String,
  state: String,
  city: String,
  zip: String,
  address1: String,
  address2: String,
  description: String
}, { timestamps: true });

module.exports = mongoose.model("Location", locationSchema);