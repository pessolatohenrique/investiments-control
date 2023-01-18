const { validationResult } = require("express-validator");
const { InvestimentFactory } = require("../factories");
const { NotFoundError } = require("../utils/Errors");
const { Investiment } = require("../models");
const { InvestimentList } = require("../business");
const { InvestimentProducer } = require("../producers");

class InvestimentController {
  static async index(req, res, next) {
    try {
      const investiments = await Investiment.find({
        userId: req.user.id,
      }).exec();
      const investimentList = new InvestimentList(investiments);
      const result = await investimentList.mapExtraProperties();
      return res.status(200).json(result);
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
      const investimentProducer = new InvestimentProducer(investiment);
      await investiment.save();
      await investimentProducer.sendStore();

      return res.status(200).json(investiment);
    } catch (error) {
      return next(error);
    }
  }

  static async show(req, res, next) {
    try {
      const { id } = req.params;
      const result = await Investiment.findById(id);

      if (!result) throw new NotFoundError();

      return res.status(200).json(result);
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

  static async redeemed(req, res, next) {
    try {
      const { id } = req.params;
      const investiment = await Investiment.findByIdAndUpdate(id, {
        has_redeemed: true,
      });

      return res.status(200).send(investiment);
    } catch (error) {
      return next(error);
    }
  }

  static async cancel(req, res, next) {
    try {
      const { id } = req.params;

      const investiment = await Investiment.findByIdAndUpdate(id, {
        has_redeemed: false,
      });

      return res.status(200).send(investiment);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = InvestimentController;
