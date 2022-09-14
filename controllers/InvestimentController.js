const { validationResult } = require("express-validator");

const { Author } = require("../models");

class InvestimentController {
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

      return res.status(204).send();

      //   const author = new Author({ name, location });
      //   author.save((error) => console.log(error));

      //   return res.status(201).json(author);
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

module.exports = InvestimentController;
