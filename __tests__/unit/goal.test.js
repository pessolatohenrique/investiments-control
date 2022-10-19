const mockingoose = require("mockingoose");
const { Goal } = require("../../models");

describe("Goal CRUD", () => {
  test("it should return goals list", async () => {
    mockingoose(Goal).toReturn(
      [
        {
          name: "Imóvel",
          invest_in_month: 4000,
          total_value: 400000,
          status: true,
        },
      ],
      "find"
    );
    const results = await Goal.find().exec();
    expect(results[0].name).toBe("Imóvel");
    expect(results[0].invest_in_month).toBe(4000);
  });

  test("it should save goal", async () => {
    const result = {
      _id: "507f191e810c19729de860ea",
      name: "Imóvel",
      invest_in_month: 3000,
      total_value: 300000,
      status: true,
    };

    mockingoose(Goal).toReturn(result, "findOneAndUpdate");

    return Goal.findOneAndUpdate({ invest_in_month: 3000 })
      .where({ _id: "507f191e810c19729de860ea" })
      .then((response) =>
        expect(JSON.parse(JSON.stringify(response))).toMatchObject(result)
      );
  });
});
