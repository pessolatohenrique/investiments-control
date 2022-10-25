const { InvestimentFactory } = require("../factories");

class Statistic {
  constructor(sumInvestedAmount, sumExpectedNetValue) {
    this.sumInvestedAmount = sumInvestedAmount;
    this.sumExpectedNetValue = sumExpectedNetValue;
  }

  groupByDream() {
    const investedAmountMaped = [...this.sumInvestedAmount].map((amount) => {
      const expectedNetValue = [...this.sumExpectedNetValue].find(
        (netValue) => {
          if (typeof netValue._id !== "object") {
            return netValue._id === amount._id;
          }
          return netValue._id.equals(amount._id);
        }
      );

      const investimentFormatted = {
        dream_name: amount._id,
        sum_expected_net_value: expectedNetValue.count,
        sum_invested_amount: amount.count,
        expected_profit: this.calculate(expectedNetValue.count, amount.count),
      };
      return investimentFormatted;
    });

    return investedAmountMaped;
  }

  calculate(expected_net_value, invested_amount) {
    return expected_net_value - invested_amount;
  }
}

module.exports = Statistic;
