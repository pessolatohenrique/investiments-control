const { check } = require("express-validator");

// "Conta Corrente"
class CheckingAccountValidator {
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
    return result || 0;
  }

  async validate(req) {
    await check("type").notEmpty().run(req);
    if (!req.params.id) {
      await check("description").notEmpty().run(req);
      await check("platform").notEmpty().run(req);
      await check("net_value").notEmpty().run(req);
    }
  }
}

module.exports = CheckingAccountValidator;
