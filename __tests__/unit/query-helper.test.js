const mockingoose = require("mockingoose");
const { Investiment } = require("../../models");
const { QueryHelper } = require("../../utils");

const {
  INVESTED_AMOUNT,
  INDEXER_NAME,
  FINAL_DATE,
} = require("../../enums/StatisticQueryTypes");

describe("Query Helper", () => {
  test("it should prepare query with indexer.name", async () => {
    const groupQuery = {
      _id: `$${INDEXER_NAME}`,
      count: { $sum: `$${INVESTED_AMOUNT}` },
    };

    const results = QueryHelper.prepareDateQuery({
      by: INDEXER_NAME,
      sum: INVESTED_AMOUNT,
      groupQuery,
    });

    expect(results._id).toBe("$indexer.name");
    expect(results.count).toHaveProperty("$sum");
  });

  test("it should prepare query with final_date", async () => {
    const groupQuery = {
      _id: `$${FINAL_DATE}`,
      count: { $sum: `$${INVESTED_AMOUNT}` },
    };

    const results = QueryHelper.prepareDateQuery({
      by: FINAL_DATE,
      sum: INVESTED_AMOUNT,
      groupQuery,
    });

    expect(results._id).toHaveProperty("year");
    expect(results.count).toHaveProperty("$sum");
  });

  test("it should group and sum with indexer.name", async () => {
    mockingoose(Investiment).toReturn(
      [{ _id: "CDI", count: 3000 }],
      "aggregate"
    );

    const results = await QueryHelper.groupAndSum({
      model: Investiment,
      by: INDEXER_NAME,
      sum: INVESTED_AMOUNT,
      userId: 123,
    });

    expect(results[0]._id).toBe("CDI");
    expect(results[0].count).toBe(3000);
  });

  test("it should group and sum with final_date", async () => {
    mockingoose(Investiment).toReturn(
      [{ _id: { year: 2027 }, count: 5000 }],
      "aggregate"
    );

    const results = await QueryHelper.groupAndSum({
      model: Investiment,
      by: FINAL_DATE,
      sum: INVESTED_AMOUNT,
      userId: 123,
    });

    expect(results[0]._id).toBe(2027);
    expect(results[0].count).toBe(5000);
  });

  test("it should summarize with sum", async () => {
    mockingoose(Investiment).toReturn(
      [{ _id: null, result: 3000 }],
      "aggregate"
    );

    const results = await QueryHelper.compileSingleResult({
      model: Investiment,
      by: INVESTED_AMOUNT,
      operation: "sum",
      userId: 123,
    });

    expect(results[0]._id).toBe(null);
    expect(results[0].result).toBe(3000);
  });

  test("it should summarize with count", async () => {
    mockingoose(Investiment).toReturn(
      [{ _id: null, result: 3000 }],
      "aggregate"
    );

    const results = await QueryHelper.compileSingleResult({
      model: Investiment,
      by: INVESTED_AMOUNT,
      operation: "count",
      userId: 123,
    });

    expect(results[0]._id).toBe(null);
    expect(results[0].result).toBe(3000);
  });
});
