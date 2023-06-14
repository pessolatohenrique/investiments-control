const moment = require("moment");
const { Investiment } = require("../models");
const investimentListCache = require("../redis/investiments");

const expires_at = moment().add("5", "d").unix();

class InvestimentCached {
  constructor(configs = {}) {
    this.service = new Investiment(configs);
    this.configs = configs;
  }

  mapToDocStructure(cachedArray) {
    const mapped = [...cachedArray].map(item => {
      return { type: item.type, _doc: { ...item } }
    })
    return mapped;
  }

  async clearCache() {
    const userIdStr = this.configs.userId.toString();
    await investimentListCache.delete(userIdStr);
    return true;
  }

  async findByUserId() {
    const userId = this.configs.userId;
    const cached = await investimentListCache.search(userId);

    if (!cached) {
      const result = await this.service.findByUserId({ userId });
      const resultStringFy = JSON.stringify(result);
      const userIdStr = userId.toString();
      await investimentListCache.insert(userIdStr, resultStringFy, expires_at);
      return result;
    }

    const cachedConvert = await JSON.parse(cached);
    const cachedMapped = this.mapToDocStructure(cachedConvert);

    return cachedMapped;
  }

  async save() {
    await this.service.save();
    await this.clearCache();
    return true;
  }

  async findOneAndUpdate({ id, body }) {
    await Investiment.findOneAndUpdate({ _id: id }, body).exec();
    await this.clearCache();
    return true;
  }

  async delete(id) {
    await Investiment.findByIdAndDelete(id).exec();
    await this.clearCache();
    return true;
  }

  async redeemed(id) {
    await Investiment.findByIdAndUpdate(id, {
      has_redeemed: true,
    }).exec();
    await this.clearCache();
    return true;
  }

  async cancel(id) {
    await Investiment.findByIdAndUpdate(id, {
      has_redeemed: false,
    }).exec();
    await this.clearCache();
    return true;
  }
}

module.exports = InvestimentCached;