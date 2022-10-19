const { validationResult } = require("express-validator");
const { NotFoundError } = require("../utils/Errors");
const { Goal } = require("../models");

class GoalController {
  static async index(req, res, next) {
    try {
      const result = await Goal.find().exec();
      return res.status(200).json(result);
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

      const result = new Goal({
        ...req.body,
        userId: req.user._id,
        status: true,
      });
      result.save();

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async show(req, res, next) {
    try {
      const { id } = req.params;
      const result = await Goal.findById(id);

      if (!result) throw new NotFoundError();

      return res.status(200).json(result);
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

      await Goal.findOneAndUpdate({ _id: id }, req.body);

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      await Goal.findByIdAndDelete(id);

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = GoalController;
