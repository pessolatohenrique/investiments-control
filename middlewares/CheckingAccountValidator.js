const { check } = require("express-validator");

// "Conta Corrente"
class CheckingAccountValidator {
  async validate(req) {
    await check("description").notEmpty().run(req);
    await check("type").notEmpty().run(req);
    await check("platform").notEmpty().run(req);
    await check("net_value").notEmpty().run(req);
  }
}

module.exports = CheckingAccountValidator;
