class ExpectedProfit {
  constructor(investiment) {
    this.investiment = investiment;
  }

  calculate() {
    const expected_profit = this.calculateExpectedProfit();
    this.investiment = { ...this.investiment._doc, expected_profit };
  }

  calculateExpectedProfit() {
    const { expected_net_value, invested_amount } = this.investiment;
    const result = expected_net_value - invested_amount;
    return result;
  }
}

module.exports = ExpectedProfit;
