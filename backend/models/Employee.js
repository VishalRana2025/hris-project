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
    // 🔥 REMOVE userId (IMPORTANT)
    // userId: ❌ DELETE THIS

    // 🔥 AUTH FIELDS (NEW)
    email: {
      type: String,
      required: true,
      unique: true
    },

    password: String,

    isRegistered: {
      type: Boolean,
      default: false
    },

    role: {
      type: String,
      default: "employee"
    },

    // 🔥 BASIC INFO
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

    // 🔥 EMAILS
    personalEmail: String,
    workEmail: String,

    // 🔥 ADD MAIN EMAIL LINK
    // (important for login)
    // You can use workEmail as login OR keep separate email

    // 🔥 ADDRESS
    currentAddress: addressSchema,
    permanentAddress: addressSchema,

    // 🔥 ID DETAILS
    aadhaarNumber: String,
    panNumber: String,

    cabFacility: Boolean
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);