/** @format */

const {
  addToWishlist,
  fetchWishlist,
} = require("../../controller/userController/userController");

const router = require("express").Router();
router.put("/add/wishlist/:id", addToWishlist); // Here id is the item id
router.get("/fetch/wishlist/", fetchWishlist); // Here id is the item id

module.exports = router;
