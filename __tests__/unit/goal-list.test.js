const mockingoose = require("mockingoose");
const { ObjectId } = require("mongodb");

const { GoalList } = require("../../business");
const { Investiment } = require("../../models");

const goals = [
  {
    _id: new ObjectId("63fa64f8c42b39c15b1d9541"),
    userId: new ObjectId("63fa64e21be42dc9a80e0791"),
    name: "Imóvel",
    total_value: 400000,
    initial_date: "2022-01-01T00:00:00.000Z",
    final_date: "2026-01-01T00:00:00.000Z",
    total_installments: 72,
    monthly_profitability: 0.72,
    invest_in_month: 4000,
    status: true,
    __v: 0,
  },
];

const goalGrouppedDetail = { sum_expected_net_value: 25913 };

Date.now = jest.fn(() => new Date());

describe("Goal LIst", () => {
  test("it should get goals groupped", async () => {
    mockingoose(Investiment).toReturn(
      [{ _id: new ObjectId("63fa64f8c42b39c15b1d9542"), count: 5000 }],
      "aggregate"
    );

    const goalList = new GoalList(goals, "63fa64e21be42dc9a80e0791");

    const result = await goalList.getGoalsGroupped();

    expect(result[0].sum_expected_net_value).toBe(5000);
    expect(result[0].sum_invested_amount).toBe(5000);
  });

  test("it should get goals groupped when is empty", async () => {
    mockingoose(Investiment).toReturn([], "aggregate");

    const goalList = new GoalList(goals, "63fa64e21be42dc9a80e0791");

    const result = await goalList.getGoalsGroupped();

    expect(result.length).toBe(0);
    expect(result.length).toBe(0);
  });

  test("it should map extra properties", async () => {
    mockingoose(Investiment).toReturn(
      [{ _id: new ObjectId("63fa64f8c42b39c15b1d9542"), count: 5000 }],
      "aggregate"
    );

    const goalList = new GoalList(goals, "63fa64e21be42dc9a80e0791");
    const result = await goalList.mapExtraProperties();

    expect(result[0]).toHaveProperty("remaining_months");
  });

  test("it should calculate actual value percentage", async () => {
    const goalList = new GoalList(goals, "63fa64e21be42dc9a80e0791");
    const result = goalList.calculateActualValuePercentage(
      goals[0],
      goalGrouppedDetail
    );

    expect(result).toBe("6.48");
  });

  test("it should calculate when total installments is higher than actual_months", async () => {
    const goalList = new GoalList(goals, "63fa64e21be42dc9a80e0791");
    const result = goalList.calculateExpectedValuePercentage(goals[0], 100);

    expect(result).toBe("100.00");
  });

  test("it should calculate remaining months", async () => {
    const goalList = new GoalList(goals, "63fa64e21be42dc9a80e0791");
    const goal = { final_date: "2000-01-05T00:00:00.000+00:00" };
    const result = goalList.calculateRemainingMonths(goal);

    expect(result).toBe(0);
  });
});
