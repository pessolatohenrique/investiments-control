const { check } = require("express-validator");

// "Reserva de emergência"
class EmergencyReserveValidator {
  constructor(investiment) {
    this.investiment = investiment;
  }

  calculate() {
    const profit = this.calculateProfit();
    this.investiment = { ...this.investiment._doc, profit };
  }

  calculateProfit() {
    const { net_value, invested_amount } = this.investiment;
    const result = net_value - invested_amount;
    return result;
  }

  async validate(req) {
    await check("type").notEmpty().run(req);

    if (!req.params.id) {
      await check("description").notEmpty().run(req);
      await check("category").notEmpty().run(req);
      await check("platform").notEmpty().run(req);
      await check("net_value").notEmpty().run(req);
      await check("indexer.name").notEmpty().run(req);
      await check("final_date").notEmpty().run(req);
      await check("monthly_profitability").notEmpty().run(req);
      await check("invested_amount").notEmpty().run(req);
      await check("expected_net_value").notEmpty().run(req);
    }
  }
}

module.exports = EmergencyReserveValidator;
