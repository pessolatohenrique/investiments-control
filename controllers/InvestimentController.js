const { validationResult } = require("express-validator");
const { InvestimentFactory } = require("../factories");
const { NotFoundError } = require("../utils/Errors");
const { Investiment } = require("../models");
const { InvestimentList } = require("../business");
const { InvestimentProducer } = require("../producers");
const InvestimentCached = require("../business/InvestimentCached");

class InvestimentController {
  static async index(req, res, next) {
    try {
      // using Proxy Design Pattern
      const investimentCached = new InvestimentCached({ userId: req.user.id });
      const investiments = await investimentCached.findByUserId();

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

      const investimentCached = new InvestimentCached({
        ...req.body,
        userId: req.user._id,
      });

      // const investimentProducer = new InvestimentProducer(investiment);
      await investimentCached.save();
      // await investimentProducer.sendStore();

      return res.status(200).json(investimentCached);
    } catch (error) {
      return next(error);
    }
  }

  static async show(req, res, next) {
    try {
      const { id } = req.params;
      const result = await Investiment.findById(id).exec();

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

      const investimentCached = new InvestimentCached({
        userId: req.user._id,
      })

      await investimentCached.findOneAndUpdate({ id, body: req.body })

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const investimentCached = new InvestimentCached({
        userId: req.user._id,
      })

      await investimentCached.delete(id);

      return res.status(204).send();
    } catch (error) {
      console.log("error???", error);
      return next(error);
    }
  }

  static async redeemed(req, res, next) {
    try {
      const { id } = req.params;

      const investimentCached = new InvestimentCached({
        userId: req.user._id,
      })

      await investimentCached.redeemed(id);

      return res.status(200).send(investimentCached);
    } catch (error) {
      return next(error);
    }
  }

  static async cancel(req, res, next) {
    try {
      const { id } = req.params;

      const investimentCached = new InvestimentCached({
        userId: req.user._id,
      })

      await investimentCached.cancel(id);

      return res.status(200).send(investimentCached);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = InvestimentController;
