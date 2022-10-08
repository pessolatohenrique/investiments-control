const request = require("supertest");
const app = require("../..");
const { loginUser } = require("./common");
const {
  DREAM_TYPE_NAME,
  PLATFORM,
  TYPE,
  CATEGORY,
  FINAL_DATE,
} = require("../../enums/StatisticQueryTypes");

let token = null;

describe("Investiments Statistic", () => {
  beforeAll(async () => {
    const response = await loginUser();
    token = response.body.accessToken;
  });

  it("should group by dream type", async () => {
    const response = await request(app)
      .get(`/statistic/group?by=${DREAM_TYPE_NAME}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should group by platform", async () => {
    const response = await request(app)
      .get(`/statistic/group?by=${PLATFORM}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should group by type", async () => {
    const response = await request(app)
      .get(`/statistic/group?by=${TYPE}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should group by category", async () => {
    const response = await request(app)
      .get(`/statistic/group?by=${CATEGORY}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should group by final_date", async () => {
    const response = await request(app)
      .get(`/statistic/group?by=${FINAL_DATE}`)
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
      .get("/statistic/group?by=abcd")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});
