const { validationResult } = require("express-validator");
const { InvestimentFactory } = require("../factories");
const { Investiment } = require("../models");

class InvestimentController {
  static async index(req, res, next) {
    try {
      const investiments = await Investiment.find().exec();
      return res.status(200).json(investiments);
    } catch (error) {
      return next(error);
    }
  }

  static async prepareValidation(req, res, next) {
    const factory = new InvestimentFactory();
    const createdInvestiment = factory.create(req.body.type);
    await createdInvestiment.validate(req);
  }

  static async store(req, res, next) {
    try {
      await InvestimentController.prepareValidation(req);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const investiment = new Investiment({
        ...req.body,
        userId: req.user._id,
      });
      investiment.save((error) => console.log("error model", error));

      return res.status(200).json(investiment);
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      await InvestimentController.prepareValidation(req);

      const { id } = req.params;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      await Investiment.findOneAndUpdate({ _id: id }, req.body);

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      await Investiment.findByIdAndDelete(id);

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = InvestimentController;
