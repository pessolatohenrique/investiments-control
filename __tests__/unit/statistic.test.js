const { Statistic } = require("../../business");

describe("Statistic Business", () => {
  test("it should group by dream with indexer.name", async () => {
    const sumInvestedAmount = [{ _id: "CDI", count: 3000 }];
    const sumExpectedNetValue = [{ _id: "CDI", count: 5000 }];
    const statisticMapper = new Statistic(
      sumInvestedAmount,
      sumExpectedNetValue
    );

    const results = statisticMapper.groupByDream();

    expect(results[0].dream_name).toBe("CDI");
    expect(results[0].sum_expected_net_value).toBe(5000);
    expect(results[0].sum_invested_amount).toBe(3000);
    expect(results[0].expected_profit).toBe(2000);
  });
});
