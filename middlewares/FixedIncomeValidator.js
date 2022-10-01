const { check } = require("express-validator");

// "Renda fixa - curto e médio prazo"
class FixedIncomeValidator {
  constructor(investiment) {
    this.investiment = investiment;
  }

  calculate() {
    const expected_profit = this.calculateExpectedProfit();
    this.investiment = { ...this.investiment._doc, expected_profit };
  }

  calculateExpectedProfit() {
    const { expected_net_value, invested_amount } = this.investiment;
    const result = expected_net_value - invested_amount;
    return result;
  }

  async validate(req) {
    await check("type").notEmpty().run(req);

    if (!req.params.id) {
      await check("description").notEmpty().run(req);
      await check("category").notEmpty().run(req);
      await check("dream_type.name").notEmpty().run(req);
      await check("dream_type.months").notEmpty().run(req);
      await check("platform").notEmpty().run(req);
      await check("indexer.name").notEmpty().run(req);
      await check("indexer.contracted_rate").notEmpty().run(req);
      await check("final_date").notEmpty().run(req);
      await check("monthly_profitability").notEmpty().run(req);
      await check("invested_amount").notEmpty().run(req);
      await check("expected_net_value").notEmpty().run(req);
    }
  }
}

module.exports = FixedIncomeValidator;
