/** @format */

var createError = require("http-errors");
const {
  registerNewUser,
  loginUser,
} = require("../../query/userQuery/userQuery");
const { generateToken } = require("../../helper/helper");

class PublicController {
  constructor() {}

  async register(req, res, next) {
    try {
      if (
        !req.body.name.trim() ||
        !req.body.email.trim() ||
        !req.body.password.trim()
      ) {
        throw createError.BadRequest("Required field is empty");
      } else {
        const user = await registerNewUser(req.body);
        if (!user) {
          throw createError.Conflict("Save user did not come");
        } else {
          // *** If we successfully save user in DATABASE then generate authentication token
          const token = await generateToken(user);
          try {
            return res.status(201).json({
              msg: "Registration successfull",
              user: user,
              token: token,
            });
          } catch (error) {
            throw createError.BadRequest(error.message);
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      if (!req.body.email.trim() || !req.body.password.trim()) {
        throw createError.BadRequest("Required field is empty");
      } else {
        const user = await loginUser(req.body);
        try {
          // *** If user successfully login then generate authentication token
          const token = await generateToken(user);
          try {
            return res.status(201).json({
              msg: "Login successfull",
              user: user,
              token: token,
            });
          } catch (error) {
            throw createError.BadRequest(error.message);
          }
        } catch (error) {
          createError.Conflict(error.message);
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PublicController();
