/** @format */

const {
  createItem,
  fetchItems,
  updateItem,
  deleteItem,
  fetchItem,
  fetchTypeItems,
  addToCart,
  fetchCartItem,
  removeToCart,
  addToRating,
  createNewOrder,
  fetchOrders,
} = require("../../controller/itemController/itemController");

const router = require("express").Router();

router.post("/", createItem);
router.get("/", fetchItems);
router.get("/type", fetchTypeItems);
router.get("/:id", fetchItem);
router.put("/update/:id", updateItem);
router.delete("/delete/:id", deleteItem);
router.put("/cart/:id", addToCart); // Here id is the item id
router.get("/fetch/cart", fetchCartItem);
router.delete("/remove/cart/:id", removeToCart);
router.put("/rating/:id", addToRating);
router.post("/order", createNewOrder);
router.get("/fetch/order", fetchOrders);

module.exports = router;
