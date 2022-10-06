const { validationResult } = require("express-validator");
const { Statistic } = require("../middlewares");
const { Investiment } = require("../models");
const { QueryHelper } = require("../utils");

class InvestimentController {
  static async group(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { by } = req.query;

      const sumInvestedAmount = await QueryHelper.groupAndSum({
        model: Investiment,
        by,
        sum: "invested_amount",
      });

      const sumExpectedNetValue = await QueryHelper.groupAndSum({
        model: Investiment,
        by,
        sum: "expected_net_value",
      });

      const statisticMap = new Statistic(
        sumInvestedAmount,
        sumExpectedNetValue
      );

      return res.status(200).json({
        result: statisticMap.groupByDream(),
      });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = InvestimentController;
