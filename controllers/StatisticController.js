const { validationResult } = require("express-validator");
const { Investiment } = require("../models");
const { QueryHelper } = require("../utils");

class InvestimentController {
  static async group(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { by, sum } = req.query;

      const result = await QueryHelper.groupAndSum({
        model: Investiment,
        by,
        sum,
      });

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = InvestimentController;
