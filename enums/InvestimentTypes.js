const CheckingAccount = require("../business/CheckingAccount");
const EmergencyReserve = require("../business/EmergencyReserve");
const FixedIncome = require("../business/FixedIncome");
const VariableIncomeShares = require("../business/VariableIncomeShares");
const VariableIncomeFunds = require("../business/VariableIncomeFunds");

module.exports = {
  CHECKING_ACCOUNT: CheckingAccount,
  EMERGENCY_RESERVE: EmergencyReserve,
  FIXED_INCOME: FixedIncome,
  VARIABLE_INCOME_SHARES: VariableIncomeShares,
  VARIABLE_INCOME_FUNDS: VariableIncomeFunds,
};
