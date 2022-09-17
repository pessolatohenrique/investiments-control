const { check } = require("express-validator");

// "Renda variável - ações"
class VariableIncomeSharesValidator {
  async validate(req) {
    await check("description").notEmpty().run(req);
    await check("type").notEmpty().run(req);
    await check("category").notEmpty().run(req);
    await check("dream_type.name").notEmpty().run(req);
    await check("dream_type.months").notEmpty().run(req);
    await check("platform").notEmpty().run(req);
    await check("final_date").notEmpty().run(req);
    await check("average_price").notEmpty().run(req);
    await check("monthly_profitability").notEmpty().run(req);
    await check("invested_amount").notEmpty().run(req);
    await check("expected_net_value").notEmpty().run(req);
  }
}

module.exports = VariableIncomeSharesValidator;
