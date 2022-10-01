const { InvestimentTypes } = require("../enums");
const { InvalidFactory } = require("../utils/Errors");

/**
 * @constructor
 * @abstract
 */
class InvestimentFactory {
  create(type, resultFind = null) {
    try {
      const investiment = new InvestimentTypes[type](resultFind);
      return investiment;
    } catch (error) {
      throw new InvalidFactory();
    }
  }
}

module.exports = InvestimentFactory;
