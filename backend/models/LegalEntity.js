const mongoose = require("mongoose");

const legalEntitySchema = new mongoose.Schema({
  entityName: String,
  legalName: String,
  cin: String,
  date: Date,
  type: String,
  sector: String,
  nature: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,
  country: String
}, { timestamps: true });

module.exports = mongoose.model("LegalEntity", legalEntitySchema);