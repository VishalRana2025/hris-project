const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    line1: String,
    line2: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  { _id: false }
);

const employeeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    employeeNumber: String,
    firstName: String,
    middleName: String,
    lastName: String,
    displayName: String,
    fullName: String,

    nationality: String,
    bloodGroup: String,
    dob: Date,
    gender: String,
    maritalStatus: String,

    employmentStatus: String,
    dateJoined: Date,
    probationEndDate: Date,
    reportingManager: String,
    jobTitle: String,
    socialDesignation: String,
    department: String,
    band: String,
    payGrade: String,
    shiftPolicy: String,
    lastWorkingDay: Date,

    mobilePhone: String,
    personalEmail: String,
    workEmail: String,

    currentAddress: addressSchema,
    permanentAddress: addressSchema,

    aadhaarNumber: String,
    panNumber: String,

    cabFacility: Boolean
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);