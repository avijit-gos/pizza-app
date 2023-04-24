/** @format */

const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
