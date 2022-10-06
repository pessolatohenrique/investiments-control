const { query } = require("express-validator");
const {
  DREAM_TYPE_NAME,
  PLATFORM,
  TYPE,
  CATEGORY,
} = require("../enums/StatisticQueryTypes");

const VALID_BY = [DREAM_TYPE_NAME, PLATFORM, TYPE, CATEGORY];

class StatisticQueryValidator {
  static validate() {
    return [query("by").isString().isIn(VALID_BY).trim()];
  }
}

module.exports = StatisticQueryValidator;
