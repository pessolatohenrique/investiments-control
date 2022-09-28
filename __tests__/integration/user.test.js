const request = require("supertest");
const app = require("../..");
const { loginUser } = require("./common");

let token = null;

const DATA_USER = {
  username: `pessolatohenrique${Math.random() * 500}`,
  email: `pessolatohenrique${Math.random() * 500}@gmail.com`,
  password: process.env.CORRECT_PASSWORD_TEST,
};

describe("Users CRUD", () => {
  beforeAll(async () => {
    const response = await loginUser();
    token = response.body.accessToken;
  });

  it("should store user", async () => {
    const response = await request(app)
      .post("/user")
      .set("Authorization", `Bearer ${token}`)
      .send(DATA_USER);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("username", DATA_USER.username);
  });

  it("should not store user with blank fields", async () => {
    const response = await request(app)
      .post("/user")
      .set("Authorization", `Bearer ${token}`)
      .send({ description: "" });

    expect(response.status).toBe(400);
  });
});
