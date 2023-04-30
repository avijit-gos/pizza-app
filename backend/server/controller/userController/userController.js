/** @format */

var createError = require("http-errors");
const {
  addToWishListData,
  fetchWishlistData,
} = require("../../query/userQuery/userQuery");

class UserController {
  constructor() {}
  async addToWishlist(req, res, next) {
    try {
      if (!req.params.id) {
        throw createError.BadRequest("Request id is invalid");
      } else {
        const result = await addToWishListData(req.params.id, req.user._id);
        try {
          return res.status(200).json(result);
        } catch (error) {
          throw createError.BadRequest(error.message);
        }
      }
    } catch (error) {
      next(error);
    }
  }

  async fetchWishlist(req, res, next) {
    try {
      const fetchData = await fetchWishlistData(req.user._id);
      return res.status(200).json(fetchData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
