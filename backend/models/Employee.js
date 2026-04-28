const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    // 🔥 ADD THIS (MOST IMPORTANT FIX)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // BASIC
    employeeNumber: String,
    firstName: String,
    middleName: String,
    lastName: String,
    displayName: String,
    fullName: String,

    // PERSONAL
    nationality: String,
    bloodGroup: String,
    dob: Date,
    gender: String,
    maritalStatus: String,

    // JOB
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

    // CONTACT
    mobilePhone: String,
    personalEmail: String,
    workEmail: String,

    // ADDRESS
    currentAddress: {
      line1: String,
      line2: String,
      city: String,
      state: String,
      zipCode: String
    },

    permanentAddress: {
      line1: String,
      line2: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    },

    // GOVT
    aadhaarNumber: String,
    panNumber: String,

    cabFacility: Boolean
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);