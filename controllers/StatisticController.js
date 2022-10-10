const { validationResult } = require("express-validator");
const { Statistic } = require("../business");
const { Investiment } = require("../models");
const { QueryHelper } = require("../utils");
const {
  INVESTED_AMOUNT,
  EXPECTED_NET_VALUE,
} = require("../enums/StatisticQueryTypes");

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
        sum: INVESTED_AMOUNT,
      });

      const sumExpectedNetValue = await QueryHelper.groupAndSum({
        model: Investiment,
        by,
        sum: EXPECTED_NET_VALUE,
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
