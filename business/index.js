const UserValidator = require("../middlewares/UserValidator");
const CheckingAccount = require("./CheckingAccount");
const EmergencyReserve = require("./EmergencyReserve");
const FixedIncome = require("./FixedIncome");
const VariableIncomeShares = require("./VariableIncomeShares");
const VariableIncomeFunds = require("./VariableIncomeFunds");
const StatisticQueryValidator = require("../middlewares/StatisticQueryValidator");
const InvestimentList = require("./InvestimentList");
const Statistic = require("./Statistic");
const GoalList = require("./GoalList");

module.exports = {
  UserValidator,
  CheckingAccount,
  EmergencyReserve,
  FixedIncome,
  VariableIncomeShares,
  VariableIncomeFunds,
  StatisticQueryValidator,
  InvestimentList,
  Statistic,
  GoalList,
};
