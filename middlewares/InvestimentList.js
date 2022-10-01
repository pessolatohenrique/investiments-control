const { InvestimentFactory } = require("../factories");

class InvestimentList {
  constructor(investiments) {
    this.investiments = investiments;
  }

  async mapExtraProperties() {
    const factory = new InvestimentFactory();

    const mappedResult = [...this.investiments].map((investiment) => {
      const factoryResult = factory.create(investiment.type, investiment);
      if (typeof factoryResult.calculate === "function") {
        factoryResult.calculate();
      }

      return factoryResult.investiment;
    });

    return mappedResult;
  }
}

module.exports = InvestimentList;
