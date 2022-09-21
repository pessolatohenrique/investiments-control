const { InvestimentFactory } = require("../factories");
const { InvalidFactory } = require("../utils/Errors");
const { Investiment } = require("../models");

describe("Investiment CRUD", () => {
  test("it should create factory when type is valid", () => {
    const factory = new InvestimentFactory();
    const result = factory.create("FIXED_INCOME");
    expect(result).toHaveProperty("validate");
  });

  test("it should throw error in factory when type is invalid", () => {
    const factory = new InvestimentFactory();
    expect(() => factory.create("INVALID_TYPE")).toThrow(InvalidFactory);
  });

  test("it should call validate without errors", async () => {
    const reqFake = { params: {} };
    const factory = new InvestimentFactory();
    const checkingAccount = factory.create("CHECKING_ACCOUNT");
    const emergencyReserve = factory.create("EMERGENCY_RESERVE");
    const fixedIncome = factory.create("FIXED_INCOME");
    const variableIncomeFunds = factory.create("VARIABLE_INCOME_FUNDS");
    const variableIncomeShares = factory.create("VARIABLE_INCOME_SHARES");

    await checkingAccount.validate(reqFake);
    await emergencyReserve.validate(reqFake);
    await fixedIncome.validate(reqFake);
    await variableIncomeFunds.validate(reqFake);
    await variableIncomeShares.validate(reqFake);

    expect(checkingAccount).toHaveProperty("validate");
    expect(emergencyReserve).toHaveProperty("validate");
    expect(fixedIncome).toHaveProperty("validate");
    expect(variableIncomeFunds).toHaveProperty("validate");
    expect(variableIncomeShares).toHaveProperty("validate");
  });
});
