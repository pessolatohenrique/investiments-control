const {
  CheckingAccountValidator,
  EmergencyReserveValidator,
} = require("../middlewares");

module.exports = {
  CHECKING_ACCOUNT: CheckingAccountValidator,
  EMERGENCY_RESERVE: EmergencyReserveValidator,
};
