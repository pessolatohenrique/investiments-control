const request = require("supertest");
const app = require("../..");

async function loginUser() {
  const response = await request(app).post("/login").send({
    username: "pessolatohenrique",
    password: process.env.CORRECT_PASSWORD_TEST,
  });

  return response;
}

it("should load common file", async () => {
  expect(1).toBe(1);
});

module.exports = { loginUser };
