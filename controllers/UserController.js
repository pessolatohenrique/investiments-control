const { validationResult } = require("express-validator");

const { User } = require("../models");
const tokens = require("../auth/tokens");

const bcrypt = require("bcrypt");
const ROUNDS_BCRYPT = 12;

class UserController {
  static async login(req, res, next) {
    try {
      const { user } = req;
      const token = tokens.access.create(user.id);
      const refreshToken = await tokens.refresh.create(user.id);
      // res.set({ Authorization: token });
      return res.status(200).json({ accessToken: token, refreshToken });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async index(req, res, next) {
    try {
      const authors = await Author.find().exec();
      return res.status(200).json(authors);
    } catch (error) {
      return next(error);
    }
  }

  static async store(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const bodyWithPassword = {
        ...req.body,
        password: await bcrypt.hash(req.body.password, ROUNDS_BCRYPT),
      };

      const user = new User(bodyWithPassword);
      user.save((error) => console.log(error));

      return res.status(201).json(user);
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      await Author.findOneAndUpdate({ _id: id }, req.body);

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      await Author.findByIdAndDelete(id);

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = UserController;
