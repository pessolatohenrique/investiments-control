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
        userId: req.user.id,
      });

      const sumExpectedNetValue = await QueryHelper.groupAndSum({
        model: Investiment,
        by,
        sum: EXPECTED_NET_VALUE,
        userId: req.user.id,
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

  static async summary(req, res, next) {
    try {
      const averageMonthProfitability = await QueryHelper.compileSingleResult({
        model: Investiment,
        operation: "avg",
        by: "monthly_profitability",
        userId: req.user.id,
      });

      const sumInvestedAmount = await QueryHelper.compileSingleResult({
        model: Investiment,
        operation: "sum",
        by: "invested_amount",
        userId: req.user.id,
      });

      const countInvestiments = await QueryHelper.compileSingleResult({
        model: Investiment,
        operation: "count",
        by: "invested_amount",
        userId: req.user.id,
      });

      return res.status(200).json({
        average_month_profitability: averageMonthProfitability[0]?.result,
        invested_amount: sumInvestedAmount[0]?.result,
        count_investiments: countInvestiments[0]?.result,
      });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = InvestimentController;
