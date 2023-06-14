const request = require("supertest");
const app = require("../..");
const { loginUser } = require("./common");

let token = null;

const DATA_INVESTIMENT = {
  type: "EMERGENCY_RESERVE",
  category: "Tesouro Direto",
  description: "Selic 2027",
  platform: "Modal Mais",
  indexer: { name: "CDI", contracted_rate: 120 },
  final_date: "2027-01-01 00:00",
  monthly_profitability: "0.50",
  invested_amount: 3000,
  net_value: 3150,
  expected_net_value: 5000,
};

describe("Investiments CRUD", () => {
  beforeAll(async () => {
    const response = await loginUser();
    token = response.body.accessToken;
  });

  it("should list investiments", async () => {
    const response = await request(app)
      .get("/investiment")
      .set("Authorization", `Bearer ${token}`);

    const responseFixedIncome = [...response.body].find(
      (item) => item.type === "FIXED_INCOME"
    );

    const responseEmergyReserve = [...response.body].find(
      (item) => item.type === "EMERGENCY_RESERVE"
    );

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(responseFixedIncome).toHaveProperty("expected_profit");
    expect(responseEmergyReserve).toHaveProperty("profit");
    // expect(checkingAccountResponse).toHaveProperty("profit");
    // expect(variableIncomesResponse).toHaveProperty("expected_profit");
  });

  it("should not found unexpected category", async () => {
    const response = await request(app)
      .get("/category/abcd1331")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it("should store investiment", async () => {
    const response = await request(app)
      .post("/investiment")
      .set("Authorization", `Bearer ${token}`)
      .send(DATA_INVESTIMENT);

    expect(response.status).toBe(200);
    //expect(response.body.indexer).toHaveProperty("type", "EMERGENCY_RESERVE");
  });

  it("should not store investiment with blank fields", async () => {
    const response = await request(app)
      .post("/investiment")
      .set("Authorization", `Bearer ${token}`)
      .send({ description: "" });

    expect(response.status).toBe(400);
  });

  it("should update investiment with fields", async () => {
    const response = await request(app)
      .put("/investiment/6326196307f624462348707b")
      .set("Authorization", `Bearer ${token}`)
      .send({ type: "EMERGENCY_RESERVE", monthly_profitability: "0.65" });

    expect(response.status).toBe(204);
  });
});
