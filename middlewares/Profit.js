class Profit {
  constructor(investiment) {
    this.investiment = investiment;
  }
  calculate() {
    const profit = this.calculateProfit();
    this.investiment = { ...this.investiment._doc, profit };
  }
  calculateProfit() {
    const { net_value, invested_amount } = this.investiment;
    const result = net_value - invested_amount;
    return result || 0;
  }
}

module.exports = Profit;
