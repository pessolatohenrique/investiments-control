const mockingoose = require("mockingoose");
const { InvestimentFactory } = require("../../factories");
const { InvalidFactory } = require("../../utils/Errors");
const { Investiment } = require("../../models");

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

  test("it should return investiments list", async () => {
    mockingoose(Investiment).toReturn(
      [
        {
          description: "IPCA+ 2026",
          type: "FIXED_INCOME",
        },
      ],
      "find"
    );
    const results = await Investiment.find().exec();
    expect(results[0].description).toBe("IPCA+ 2026");
    expect(results[0].type).toBe("FIXED_INCOME");
  });

  test("it should save investiment", async () => {
    const result = {
      _id: "507f191e810c19729de860ea",
      description: "IPCA+ 2026",
      invested_amount: 3000,
    };

    mockingoose(Investiment).toReturn(result, "findOneAndUpdate");

    return Investiment.findOneAndUpdate({ invested_amount: 2500 })
      .where({ _id: "507f191e810c19729de860ea" })
      .then((response) =>
        expect(JSON.parse(JSON.stringify(response))).toMatchObject(result)
      );
  });

  test("it should calculate investiments with expected_profit", async () => {
    mockingoose(Investiment).toReturn(
      {
        description: "IPCA+ 2026",
        type: "FIXED_INCOME",
        invested_amount: 3000,
        expected_net_value: 5000,
      },
      "findOne"
    );

    const resultFind = await Investiment.findOne().exec();
    const factory = new InvestimentFactory();
    const fixedIncome = factory.create("FIXED_INCOME", resultFind);
    fixedIncome.calculate();

    expect(fixedIncome.investiment).toHaveProperty("expected_profit");
  });

  test("it should calculate investiments with profit", async () => {
    mockingoose(Investiment).toReturn(
      {
        description: "Selic",
        type: "EMERGENCY_RESERVE",
        invested_amount: 3000,
        net_value: 3500,
      },
      "findOne"
    );

    const resultFind = await Investiment.findOne().exec();
    const factory = new InvestimentFactory();
    const fixedIncome = factory.create("EMERGENCY_RESERVE", resultFind);
    fixedIncome.calculate();

    expect(fixedIncome.investiment).toHaveProperty("profit");
  });

  test("it should find investiment by userId", async () => {
    mockingoose(Investiment).toReturn(
      {
        description: "Selic",
        type: "EMERGENCY_RESERVE",
        invested_amount: 3000,
        net_value: 3500,
      },
      "findByUserId"
    );

    const investiment = new Investiment();

    const resultFind = await investiment.findByUserId({ userId: 1 });
    expect(resultFind[0]).toHaveProperty("_id");
  })
});
