const request = require("supertest");
const app = require("../..");
const { loginUser } = require("./common");

let token = null;

const DATA_GOAL = {
  userId: process.env.USER_ID_EXAMPLE,
  name: "Imóvel",
  total_value: 400000,
  initial_date: "2022-01-01",
  final_date: "2026-01-01",
  total_installments: 72,
  monthly_profitability: 0.72,
  invest_in_month: 4000,
  status: true,
};

describe("Goals CRUD", () => {
  beforeAll(async () => {
    const response = await loginUser();
    token = response.body.accessToken;
  });

  it("should list goals", async () => {
    const response = await request(app)
      .get("/goal")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should detail specific category", async () => {
    const responseInsert = await request(app)
      .post("/goal")
      .set("Authorization", `Bearer ${token}`)
      .send(DATA_GOAL);

    const response = await request(app)
      .get(`/goal/${responseInsert.body._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should store goal", async () => {
    const response = await request(app)
      .post("/goal")
      .set("Authorization", `Bearer ${token}`)
      .send(DATA_GOAL);

    expect(response.status).toBe(200);
  });

  it("should not store goal with blank fields", async () => {
    const response = await request(app)
      .post("/goal")
      .set("Authorization", `Bearer ${token}`)
      .send({ description: "" });

    expect(response.status).toBe(400);
  });

  it("should update goal with fields", async () => {
    const response = await request(app)
      .put("/goal/6326196307f624462348707b")
      .set("Authorization", `Bearer ${token}`)
      .send({ total_value: 300000, monthly_profitability: "0.65" });

    expect(response.status).toBe(204);
  });

  it("should delete when category exists", async () => {
    const responseInsert = await request(app)
      .post("/goal")
      .set("Authorization", `Bearer ${token}`)
      .send(DATA_GOAL);

    const response = await request(app)
      .delete(`/goal/${responseInsert.body._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});
