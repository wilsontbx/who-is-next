const request = require("supertest");
const app = require("../src/app");

describe("App", () => {
  it("GET / should get all the route", async () => {
    const { body } = await request(app).get("/").expect(200);
    expect(body).toEqual({
      0: "GET    /",
      1: "GET    /jumplings",
      2: "POST   /jumplings",
      3: "GET /jumplings/:name",
      4: "PUT /jumplings/:id",
      5: "DELETE /jumplings/:id",
      6: "-----------------------",
      7: "GET    /jumplings/presenter",
    });
  });
});
