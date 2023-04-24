/** @format */

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, trim: true },
    email: { type: String, trim: true, unique: true, index: true },
    password: { type: String },
    role: { type: String, default: "Customer" },
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", UserSchema);
