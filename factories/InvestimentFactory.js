const { InvestimentTypes } = require("../enums");
/**
 * @constructor
 * @abstract
 */
class InvestimentFactory {
  create(type) {
    try {
      const investiment = new InvestimentTypes[type]();
      return investiment;
    } catch (error) {
      throw new Error("Type of factory not found");
    }
  }
}

module.exports = InvestimentFactory;
