const CheckingAccountValidator = require("../middlewares/CheckingAccountValidator");
const EmergencyReserveValidator = require("../middlewares/EmergencyReserveValidator");
const FixedIncomeValidator = require("../middlewares/FixedIncomeValidator");
const VariableIncomeSharesValidator = require("../middlewares/VariableIncomeSharesValidator");
const VariableIncomeFundsValidator = require("../middlewares/VariableIncomeFundsValidator");

module.exports = {
  CHECKING_ACCOUNT: CheckingAccountValidator,
  EMERGENCY_RESERVE: EmergencyReserveValidator,
  FIXED_INCOME: FixedIncomeValidator,
  VARIABLE_INCOME_SHARES: VariableIncomeSharesValidator,
  VARIABLE_INCOME_FUNDS: VariableIncomeFundsValidator,
};
