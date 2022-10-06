const { query } = require("express-validator");
const {
  DREAM_TYPE_NAME,
  INVESTED_AMOUNT,
} = require("../enums/StatisticQueryTypes");

const VALID_BY = [DREAM_TYPE_NAME];
const VALID_SUM = [INVESTED_AMOUNT];

class StatisticQueryValidator {
  static validate() {
    return [query("by").isString().isIn(VALID_BY).trim()];
  }
}

module.exports = StatisticQueryValidator;
