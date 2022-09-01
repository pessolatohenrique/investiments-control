const { body } = require("express-validator");
const { User } = require("../models");

class UserValidator {
  static validate() {
    return [
      body("username").notEmpty(),
      body("email").notEmpty(),
      body("password").notEmpty(),
      body("username").custom(async (value) => {
        const user = await User.findOne({ username: value }).exec({
          name: value,
        });
        if (user) {
          return Promise.reject("Name already in use");
        }
      }),
    ];
  }
}

module.exports = UserValidator;
