class QueryHelper {
  static async groupAndSum({ model, by, sum }) {
    const result = await model
      .aggregate([
        {
          $match: { [by]: { $ne: null } },
        },
        {
          $group: {
            _id: `$${by}`,
            count: { $sum: `$${sum}` },
          },
        },
      ])
      .exec();

    return result;
  }
}

module.exports = QueryHelper;
