const { ObjectId } = require("mongodb");

class QueryHelper {
  static async groupAndSum({ model, by, sum, userId }) {
    let groupQuery = {
      _id: `$${by}`,
      count: { $sum: `$${sum}` },
    };

    groupQuery = QueryHelper.prepareDateQuery({ by, groupQuery, sum });

    const result = await model
      .aggregate([
        {
          $match: {
            [by]: { $ne: null },
            userId: ObjectId(userId),
          },
        },
        {
          $group: groupQuery,
        },
      ])
      .exec();

    const mappedResult = this.mapDateResult({ by, result });

    return mappedResult;
  }

  static prepareDateQuery({ by, groupQuery, sum }) {
    let newGroupQuery = Object.assign({}, groupQuery);
    if (by === "final_date") {
      newGroupQuery = {
        _id: { year: { $year: `$${by}` } },
        count: { $sum: `$${sum}` },
      };
    }

    return newGroupQuery;
  }

  static mapDateResult({ by, result }) {
    if (by === "final_date") {
      const mappedResult = [...result].map((item) => {
        return { _id: item._id.year, count: item.count };
      });

      return mappedResult;
    }

    return result;
  }
}

module.exports = QueryHelper;
