/** @format */

var createError = require("http-errors");
const {
  saveNewItem,
  fetchListOfItems,
  fetchaSingleItem,
  updateSingleItem,
  deleteSingleItem,
  fetchTypeOfItems,
} = require("../../query/itemQuery/itemQuery");
const { create } = require("../../model/itemModal/item");
class ItemController {
  constructor() {}

  // create a new item
  async createItem(req, res, next) {
    try {
      if (!req.files.image) {
        throw createError.Conflict("Image file is missing");
      } else {
        if (
          !req.body.title.trim() ||
          !req.body.description.trim() ||
          req.body.price <= 0
        ) {
          throw createError.Conflict("Some of the required fields are missing");
        } else {
          const item = await saveNewItem(req.body, req.files.image);
          try {
            return res
              .status(201)
              .json({ msg: "Item listed successfully", item });
          } catch (error) {
            throw createError.InternalServerError("Something went wrong");
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // fetch items
  async fetchItems(req, res, next) {
    const items = await fetchListOfItems();
    try {
      return res.status(200).json(items);
    } catch (error) {
      throw createError.InternalServerError(error.message);
    }
    try {
    } catch (error) {
      next(error);
    }
  }

  async fetchTypeItems(req, res, next) {
    const type = req.query.type || "pizza";
    const items = await fetchTypeOfItems(type);
    try {
      return res.status(200).json(items);
    } catch (error) {
      throw createError.InternalServerError(error.message);
    }
    try {
    } catch (error) {
      next(error);
    }
  }

  // fetch single item
  async fetchItem(req, res, next) {
    try {
      if (!req.params.id) {
        throw createError.Conflict("Item id is missing");
      } else {
        const item = await fetchaSingleItem(req.params.id);
        try {
          return res.status(200).json(item);
        } catch (error) {
          throw createError.InternalServerError(error.message);
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // Edit item
  async updateItem(req, res, next) {
    try {
      if (!req.params.id) {
        throw createError.Conflict("Item id is missing");
      } else {
        if (
          !req.body.title.trim() ||
          !req.body.description.trim() ||
          req.body.price <= 0
        ) {
          createError.Conflict("Required fields are missing");
        } else {
          const item = await updateSingleItem(req.params.id, req.body);
          try {
            return res.status(200).json(item);
          } catch (error) {
            throw createError.InternalServerError(error.message);
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // Delete item
  async deleteItem(req, res, next) {
    try {
      if (!req.params.id) {
        throw createError.Conflict("Item id is missing");
      } else {
        const item = await deleteSingleItem(req.params.id);
        try {
          return res.status(200).json({ msg: "Item has been unlisted", item });
        } catch (error) {
          throw createError.InternalServerError(error.message);
        }
        try {
          return res.status(200).json(item);
        } catch (error) {
          throw createError.InternalServerError(error.message);
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ItemController();
