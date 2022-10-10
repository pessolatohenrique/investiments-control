const CheckingAccount = require("../middlewares/CheckingAccount");
const EmergencyReserve = require("../middlewares/EmergencyReserve");
const FixedIncome = require("../middlewares/FixedIncome");
const VariableIncomeShares = require("../middlewares/VariableIncomeShares");
const VariableIncomeFunds = require("../middlewares/VariableIncomeFunds");

module.exports = {
  CHECKING_ACCOUNT: CheckingAccount,
  EMERGENCY_RESERVE: EmergencyReserve,
  FIXED_INCOME: FixedIncome,
  VARIABLE_INCOME_SHARES: VariableIncomeShares,
  VARIABLE_INCOME_FUNDS: VariableIncomeFunds,
};
