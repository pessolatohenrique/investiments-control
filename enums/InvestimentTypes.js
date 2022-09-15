const CheckingAccountValidator = require("../middlewares/CheckingAccountValidator");
const EmergencyReserveValidator = require("../middlewares/EmergencyReserveValidator");

module.exports = {
  CHECKING_ACCOUNT: CheckingAccountValidator,
  EMERGENCY_RESERVE: EmergencyReserveValidator,
};
