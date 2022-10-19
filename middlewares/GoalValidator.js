const { body } = require("express-validator");

class GoalValidator {
  static validate() {
    return [
      body("userId").notEmpty(),
      body("name").notEmpty(),
      body("total_value").notEmpty().isNumeric(),
      body("initial_date").notEmpty().isDate(),
      body("final_date").notEmpty().isDate(),
      body("total_installments").notEmpty().isNumeric(),
      body("monthly_profitability").notEmpty().isNumeric(),
      body("invest_in_month").notEmpty().isNumeric(),
      body("status").notEmpty().isBoolean(),
    ];
  }
}

module.exports = GoalValidator;
