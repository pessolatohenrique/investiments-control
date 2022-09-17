const { check } = require("express-validator");

// "Reserva de emergência"
class EmergencyReserveValidator {
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
