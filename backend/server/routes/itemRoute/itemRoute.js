/** @format */

const {
  createItem,
  fetchItems,
  updateItem,
  deleteItem,
  fetchItem,
  fetchTypeItems,
} = require("../../controller/itemController/itemController");

const router = require("express").Router();

router.post("/", createItem);
router.get("/", fetchItems);
router.get("/type", fetchTypeItems);
router.get("/:id", fetchItem);
router.put("/update/:id", updateItem);
router.delete("/delete/:id", deleteItem);

module.exports = router;
