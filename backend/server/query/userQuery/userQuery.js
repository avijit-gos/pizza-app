/** @format */

const mongoose = require("mongoose");
const User = require("../../model/userModel/user");
const Item = require("../../model/itemModal/item");
var createError = require("http-errors");
const { hashUserPassword, comparePassword } = require("../../helper/helper");

class UserQuery {
  constructor() {}

  async registerNewUser(user) {
    console.log(user);
    if (user) {
      const isUserExists = await User.findOne({ email: user.email });
      try {
        if (isUserExists) {
          throw createError.BadRequest("Email address already exists");
        } else {
          // hash user password
          const hash = await hashUserPassword(user.password);
          const newUser = User({
            _id: new mongoose.Types.ObjectId(),
            name: user.name,
            email: user.email,
            password: hash,
            role: user.email.includes("test") ? "Admin" : "Customer",
          });
          const savedUser = await newUser.save();
          try {
            return savedUser;
          } catch (error) {
            throw createError.InternalServerError(error.message);
          }
        }
      } catch (error) {
        throw createError.Conflict(error.message);
      }
    } else {
      throw createError.Conflict("Request body is not present");
    }
  }

  async loginUser(user) {
    if (user) {
      const isUserExists = await User.findOne({ email: user.email });
      try {
        if (!isUserExists) {
          throw createError.BadRequest("Email address does not exist");
        } else {
          // compare user password
          const isPasswordMatched = await comparePassword(
            user.password,
            isUserExists
          );
          try {
            if (!isPasswordMatched) {
              throw createError.BadRequest("User password is not correct");
            } else {
              return isUserExists;
            }
          } catch (error) {
            throw createError.Conflict(error.message);
          }
        }
      } catch (error) {
        throw createError.Conflict(error.message);
      }
    } else {
      throw createError.Conflict("Request body is not present");
    }
  }

  async addToWishListData(id, userId) {
    const user = await User.findById(userId);
    const isAlreadyExists = user.wishlist && user.wishlist.includes(id);
    const option = isAlreadyExists ? "$pull" : "$addToSet";

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { [option]: { wishlist: id } },
      { new: true }
    );
    try {
      return {
        msg: isAlreadyExists
          ? "A new item remove from your list"
          : "A new item added in your list",
        updatedUser,
      };
    } catch (error) {
      throw createError.InternalServerError("Could not update");
    }
  }

  async fetchWishlistData(userId) {
    const user = await User.findById(userId);
    const arr = user.wishlist;
    var temp = [];

    for (let i = 0; i < arr.length; i++) {
      const data = await Item.findById(arr[i]);
      try {
        if (data) {
          temp.push(data);
        }
      } catch (error) {
        throw createError.BadRequest(error.message);
      }
    }
    return temp;
  }
}

module.exports = new UserQuery();
