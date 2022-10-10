const { check } = require("express-validator");
const Profit = require("./Profit");

// "Conta Corrente"
class CheckingAccount extends Profit {
  constructor(investiment) {
    super(investiment);
    this.investiment = investiment;
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

module.exports = CheckingAccount;
