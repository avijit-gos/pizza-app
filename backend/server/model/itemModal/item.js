/** @format */

const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, trim: true, require: true },
    description: { type: String, trim: true, require: true },
    price: { type: Number, default: 0 },
    image: { type: String, default: "" },
    item_type: { type: String, default: "pizza" },
    t_rating: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    one_star: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    two_star: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    three_star: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    four_star: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    five_star: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "reviews" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
