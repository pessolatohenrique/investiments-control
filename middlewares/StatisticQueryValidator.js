const { query } = require("express-validator");
const {
  DREAM_TYPE_NAME,
  PLATFORM,
  TYPE,
  CATEGORY,
  FINAL_DATE,
  GOAL_ID,
} = require("../enums/StatisticQueryTypes");

const VALID_BY = [
  DREAM_TYPE_NAME,
  PLATFORM,
  TYPE,
  CATEGORY,
  FINAL_DATE,
  GOAL_ID,
];

class StatisticQueryValidator {
  static validate() {
    return [query("by").isString().isIn(VALID_BY).trim()];
  }
}

module.exports = StatisticQueryValidator;
