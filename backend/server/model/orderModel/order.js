/** @format */

const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    item_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "item" }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number, require: true },
    address: {
      location: { type: String, require: true, require: true },
      phn: { type: Number, require: true },
      landmark: { type: String, require: true, require: true },
      pin: { type: Number, require: true },
    },
    order_status: { type: Number, require: true, default: 0 },
    payment_status: { type: Number, require: true },
    payment_mode: { type: String, default: "cod" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
