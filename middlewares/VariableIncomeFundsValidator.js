const { check } = require("express-validator");

// "Renda variável - FIIs"
class VariableIncomeFundsValidator {
  async validate(req) {
    await check("description").notEmpty().run(req);
    await check("type").notEmpty().run(req);
    await check("category").notEmpty().run(req);
    await check("platform").notEmpty().run(req);
    await check("invested_amount").notEmpty().run(req);
    await check("average_dividents").notEmpty().run(req);
  }
}

module.exports = VariableIncomeFundsValidator;
