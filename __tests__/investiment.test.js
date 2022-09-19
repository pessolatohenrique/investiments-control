const { InvestimentFactory } = require("../factories");

describe("Investiment CRUD", () => {
  test("it should create factory when type is valid", () => {
    const factory = new InvestimentFactory();
    const result = factory.create("FIXED_INCOME");
    expect(result).toHaveProperty("validate");
  });
});
