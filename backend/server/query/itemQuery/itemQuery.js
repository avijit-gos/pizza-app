/** @format */
var createError = require("http-errors");
const { uploadImage } = require("../../helper/helper");
const Item = require("../../model/itemModal/item");
const mongoose = require("mongoose");
const Cart = require("../../model/cartModel/cartModel");

class ItemQuery {
  constructor() {}

  // create and save a new item in DB
  async saveNewItem(item, file) {
    const result = await uploadImage(file);
    try {
      const newItem = Item({
        _id: new mongoose.Types.ObjectId(),
        title: item.title,
        description: item.description,
        price: Number(item.price),
        image: result.url,
        item_type: item.itemtype,
      });

      const data = await newItem.save();
      try {
        return newItem;
      } catch (error) {
        throw createError.InternalServerError("Could not save new item in DB");
      }
    } catch (error) {
      throw createError.InternalServerError("Image could not be uploaded");
    }
  }

  // fetch list of items
  async fetchListOfItems() {
    try {
      const items = await Item.find({}).sort({ createdAt: -1 });
      try {
        return items;
      } catch (error) {
        throw createError.InternalServerError(error.message);
      }
    } catch (error) {
      throw createError.InternalServerError("Sorry! Try again later");
    }
  }

  async fetchTypeOfItems(type) {
    console.log(type);
    try {
      const items = await Item.find({ item_type: type }).sort({
        createdAt: -1,
      });
      try {
        return items;
      } catch (error) {
        throw createError.InternalServerError(error.message);
      }
    } catch (error) {
      throw createError.InternalServerError("Sorry! Try again later");
    }
  }

  async fetchaSingleItem(id) {
    try {
      const item = await Item.findById(id);
      try {
        return item;
      } catch (error) {
        throw createError.InternalServerError(error.message);
      }
    } catch (error) {
      throw createError.InternalServerError("Sorry! Try again later");
    }
  }

  async updateSingleItem(id, item) {
    try {
      const updatedResult = await Item.findByIdAndUpdate(
        id,
        {
          $set: {
            title: item.title,
            description: item.description,
            price: Number(item.price),
          },
        },
        { new: true }
      );

      try {
        return updatedResult;
      } catch (error) {
        throw createError.InternalServerError(error.message);
      }
    } catch (error) {
      throw createError.InternalServerError(error.message);
    }
  }

  async deleteSingleItem(id) {
    try {
      const item = await Item.findByIdAndDelete(id);
      try {
        return item;
      } catch (error) {
        throw createError.InternalServerError(error.message);
      }
    } catch (error) {
      throw createError.InternalServerError(error.message);
    }
  }

  async addItemToCart(id, userId) {
    const cartItem = Cart({
      _id: new mongoose.Types.ObjectId(),
      user: userId,
      item: id,
    });
    const data = await cartItem.save();
    try {
      return data;
    } catch (error) {
      throw createError.InternalServerError(error.message);
    }
  }

  async fetchItemToCart(userId) {
    const data = await Cart.find({ user: userId }).populate("item");
    try {
      return data;
    } catch (error) {
      throw createError.InternalServerError(error.message);
    }
  }

  async removeItemToCart(id) {
    const data = await Cart.findByIdAndDelete(id);
    try {
      return data;
    } catch (error) {
      throw createError.InternalServerError(error.message);
    }
  }
}

module.exports = new ItemQuery();
