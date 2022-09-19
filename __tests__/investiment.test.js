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
});
