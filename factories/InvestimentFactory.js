const { InvestimentTypes } = require("../enums");
const { InvalidFactory } = require("../utils/Errors");

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
      throw new InvalidFactory();
    }
  }
}

module.exports = InvestimentFactory;
