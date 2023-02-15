const moment = require("moment");
const { QueryHelper } = require("../utils");
const { Investiment } = require("../models");
const Statistic = require("./Statistic");
const {
  GOAL_ID,
  EXPECTED_NET_VALUE,
  INVESTED_AMOUNT,
} = require("../enums/StatisticQueryTypes");

class GoalList {
  constructor(goals, userId) {
    this.goals = goals;
    this.userId = userId;
  }

  async mapExtraProperties() {
    const mappedResult = [];

    for (const goal of this.goals) {
      const goalsGroupped = await this.getGoalsGroupped();
      const goalGrouppedDetail = [...goalsGroupped].find((item) =>
        item.dream_name.equals(goal._id)
      );

      const actual_months = this.calculateActualMonths(goal) || 0;

      mappedResult.push({
        ...goal._doc,
        actual_value: goalGrouppedDetail?.sum_expected_net_value || 0,
        actual_months,
        remaining_months: this.calculateRemainingMonths(goal) || 0,
        actual_value_percentage: this.calculateActualValuePercentage(
          goal,
          goalGrouppedDetail
        ),
        expected_value_percenage: this.calculateExpectedValuePercentage(
          goal,
          actual_months
        ),
      });
    }

    return mappedResult;
  }

  async getGoalsGroupped() {
    const sumExpectedNetValue = await QueryHelper.groupAndSum({
      model: Investiment,
      by: GOAL_ID,
      sum: EXPECTED_NET_VALUE,
      userId: this.userId,
    });

    const sumInvestedAmount = await QueryHelper.groupAndSum({
      model: Investiment,
      by: GOAL_ID,
      sum: INVESTED_AMOUNT,
      userId: this.userId,
    });

    const statisticMap = new Statistic(sumInvestedAmount, sumExpectedNetValue);

    return statisticMap.groupByDream();
  }

  calculateActualMonths(goal) {
    const { initial_date } = goal;
    const finalDateMoment = moment();
    const initialDateMoment = moment(initial_date);
    const differenceMonths = finalDateMoment.diff(initialDateMoment, "months");
    return differenceMonths;
  }

  calculateRemainingMonths(goal) {
    const { final_date } = goal;
    const finalDateMoment = moment(final_date);
    const initialDateMoment = moment();
    const differenceMonths = finalDateMoment.diff(initialDateMoment, "months");

    if (differenceMonths < 0) return 0;
    return differenceMonths;
  }

  calculateActualValuePercentage(goal, goalGrouppedDetail) {
    if (!goalGrouppedDetail) return 0;
    const { sum_expected_net_value } = goalGrouppedDetail;
    const { total_value } = goal;
    const result = (sum_expected_net_value * 100) / total_value;
    return result.toFixed(2);
  }

  calculateExpectedValuePercentage(goal, actual_months) {
    const { total_installments } = goal;
    if (actual_months > total_installments) {
      actual_months = total_installments;
    }
    const result = (100 / total_installments) * actual_months;
    return result.toFixed(2);
  }
}

module.exports = GoalList;
