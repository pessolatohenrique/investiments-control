const { ObjectId } = require("mongodb");
const mockingoose = require("mockingoose");
const { Investiment } = require("../../models");
const InvestimentCached = require("../../business/InvestimentCached");
const investimentListCache = require("../../redis/investiments");

const mockInvestiment = [
  {
    description: "IPCA+ 2026",
    type: "FIXED_INCOME",
  },
];

const configs = {
  userId: 123,
};

describe("Investiment Cached", () => {
  const investimentCached = new InvestimentCached(configs);

  it("should map to doc structure", () => {
    const investimentCached = new InvestimentCached();

    const result = investimentCached.mapToDocStructure(mockInvestiment);

    expect(result[0].type).toBe("FIXED_INCOME");
    expect(result[0]).toHaveProperty("_doc");
  });

  it("should delete user cache", async () => {
    investimentCached.delete = jest.fn();

    const result = await investimentCached.clearCache();
    expect(result).toBe(true);
  });

  it("should find by userId when it's cached", async () => {
    investimentListCache.search = jest.fn().mockResolvedValue(JSON.stringify(mockInvestiment));
    const result = await investimentCached.findByUserId();

    expect(result[0].type).toBe("FIXED_INCOME");
    expect(result[0]).toHaveProperty("_doc");
  });

  it("should find by userId when it's not cached", async () => {

    investimentListCache.search = jest.fn().mockResolvedValue(null);
    investimentCached.service.findByUserId = jest.fn().mockResolvedValue(mockInvestiment);

    investimentListCache.insert = jest.fn().mockResolvedValue();
    const result = await investimentCached.findByUserId();

    expect(result[0].type).toBe("FIXED_INCOME");
  });

  it("should save user", async () => {
    investimentCached.service.save = jest.fn();
    investimentCached.clearCache = jest.fn().mockResolvedValue(true);

    const result = await investimentCached.save();
    expect(result).toBe(true);
  });

  it("should find one and update", async () => {
    mockingoose(Investiment).toReturn(
      mockInvestiment,
      "findOneAndUpdate"
    );
    investimentCached.clearCache = jest.fn().mockResolvedValue(true);

    const result = await investimentCached.findOneAndUpdate({ id: ObjectId(123), body: {} });
    expect(result).toBe(true);
  });

  it("should delete", async () => {
    mockingoose(Investiment).toReturn(
      true,
      "findByIdAndDelete"
    );
    investimentCached.clearCache = jest.fn().mockResolvedValue(true);

    await investimentCached.delete(123);
  });

  it("should redeemed", async () => {
    mockingoose(Investiment).toReturn(
      mockInvestiment,
      "findByIdAndUpdate"
    );
    investimentCached.clearCache = jest.fn().mockResolvedValue(true);

    const result = await investimentCached.redeemed({ id: ObjectId(123), body: {} });
    expect(result).toBe(true);
  });

  it("should cancel", async () => {
    mockingoose(Investiment).toReturn(
      mockInvestiment,
      "findByIdAndUpdate"
    );
    investimentCached.clearCache = jest.fn().mockResolvedValue(true);

    const result = await investimentCached.cancel({ id: ObjectId(123), body: {} });
    expect(result).toBe(true);
  })
})