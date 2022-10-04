const request = require("supertest");
const app = require("../..");
const { loginUser } = require("./common");

let token = null;

describe("Investiments Statistic", () => {
  beforeAll(async () => {
    const response = await loginUser();
    token = response.body.accessToken;
  });

  it("should group by dream type", async () => {
    const response = await request(app)
      .get("/statistic/group?by=dream_type.name&sum=invested_amount")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("it should validate filter", async () => {
    const response = await request(app)
      .get("/statistic/group")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("it should validate filter when queries is invalids", async () => {
    const response = await request(app)
      .get("/statistic/group?by=abcd&sum=xyz")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});
