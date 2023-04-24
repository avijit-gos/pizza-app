/** @format */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var createError = require("http-errors");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

class Helper {
  constructor() {}

  async hashUserPassword(password) {
    if (password.trim()) {
      const hash = await bcrypt.hash(password, 10);
      try {
        return hash;
      } catch (error) {
        throw createError.BadRequest(error.message);
      }
    } else {
      throw createError.BadRequest("Empty password could not be hashed");
    }
  }

  async comparePassword(password, user) {
    if (!user || !password.trim()) {
      throw createError.Conflict("User or user password is not present");
    } else {
      const result = await bcrypt.compare(password, user.password);
      try {
        return result;
      } catch (error) {
        throw createError.Conflict(error.message);
      }
    }
  }

  async generateToken(user) {
    if (!user) {
      throw createError.BadRequest(
        "could not generate token without user information"
      );
    } else {
      const token = jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        process.env.SECRET_KEY,
        { expiresIn: "7d" }
      );
      try {
        return token;
      } catch (error) {
        createError.InternalServerError(error.message);
      }
    }
  }

  // upload image
  async uploadImage(file) {
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    try {
      return result;
    } catch (error) {
      return false;
    }
  }
}

module.exports = new Helper();
