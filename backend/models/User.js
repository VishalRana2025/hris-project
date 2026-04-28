const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,

    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee"
    },

    // 🔥 NEW FIELDS (PROFILE)
    phone: String,
    address: String,

    // 🔥 DOCUMENT STORAGE
    documents: [
      {
        name: String,   // file name
        url: String     // file path
      }
    ],

    // 🔥 PROFILE IMAGE (OPTIONAL)
    profileImage: String
  },
  { timestamps: true } // 🔥 important
);

module.exports = mongoose.model("User", userSchema);