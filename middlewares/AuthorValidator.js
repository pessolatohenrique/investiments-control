const { body } = require("express-validator");
const { Author } = require("../models");

class AuthorValidator {
  static validate() {
    return [
      body("name").notEmpty(),
      body("name").custom(async (value) => {
        const user = await Author.findOne({ name: value }).exec({
          name: value,
        });
        if (user) {
          return Promise.reject("Name already in use");
        }
      }),
      body("location").custom((value, { req }) => {
        const allFilled = Object.values(value).every(
          (item) => item !== null && item !== ""
        );

        if (value && !allFilled) {
          return Promise.reject(
            "When location is filled, all fields are required"
          );
        }

        return true;
      }),
    ];
  }
}

module.exports = AuthorValidator;
