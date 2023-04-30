/** @format */
var createError = require("http-errors");
const { uploadImage } = require("../../helper/helper");
const Item = require("../../model/itemModal/item");
const mongoose = require("mongoose");
const Cart = require("../../model/cartModel/cartModel");
const Order = require("../../model/orderModel/order");

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

  async addRatingToProduct(id, type, userId) {
    const item = await Item.findById(id);
    var isExists, option;
    if (type === "one") {
      console.log("One star");
      isExists = item.one_star && item.one_star.includes(userId);
      option = isExists ? "$pull" : "$addToSet";
      console.log(isExists, option);
      const updated = await Item.findByIdAndUpdate(
        id,
        { [option]: { one_star: userId } },
        { new: true }
      );
      return updated;
    } else if (type === "two") {
      isExists = item.two_star && item.two_star.includes(userId);
      option = isExists ? "$pull" : "$addToSet";

      const updated = await Item.findByIdAndUpdate(
        id,
        { [option]: { two_star: userId } },
        { new: true }
      );
      return updated;
    } else if (type === "three") {
      isExists = item.three_star && item.three_star.includes(userId);
      option = isExists ? "$pull" : "$addToSet";
      const updated = await Item.findByIdAndUpdate(
        id,
        { [option]: { three_star: userId } },
        { new: true }
      );
      return updated;
    } else if (type === "four") {
      isExists = item.four_star && item.four_star.includes(userId);
      option = isExists ? "$pull" : "$addToSet";
      const updated = await Item.findByIdAndUpdate(
        id,
        { [option]: { four_star: userId } },
        { new: true }
      );
      return updated;
    } else {
      isExists = item.five_star && item.five_star.includes(userId);
      option = isExists ? "$pull" : "$addToSet";
      const updated = await Item.findByIdAndUpdate(
        id,
        { [option]: { five_star: userId } },
        { new: true }
      );
      return updated;
    }
  }

  async createAndSaveOrder(details, userId) {
    const parseData = JSON.parse(details);
    const items = JSON.parse(parseData.items);
    const cartItems = JSON.parse(parseData.cardItemsId);

    const data = Order({
      _id: new mongoose.Types.ObjectId(),
      item_id: items,
      user: userId,
      amount: parseData.price,
      payment_mode: parseData.payment,
      address: {
        location: parseData.location,
        phn: parseData.phn,
        landmark: parseData.landmark,
        pin: parseData.pin,
      },
    });
    const savedData = await data.save();
    try {
      for (let i = 0; i < cartItems.length; i++) {
        const removeItem = await Cart.findByIdAndDelete(cartItems);
      }
      return { msg: "You order has been confirmed", savedData };
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }

  async fetchOrderDetails() {
    const data = await Order.find()
      .populate({
        path: "user",
        select: "_id email name",
      })
      .sort({ createdAt: -1 });
    try {
      return data;
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }
}

module.exports = new ItemQuery();
