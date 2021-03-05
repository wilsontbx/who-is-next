const request = require("supertest");
const app = require("../src/app");
const UserModel = require("../src/models/user.model");
const dbHandlers = require("../test/dbHandler");

describe("Route", () => {
  beforeAll(async () => {
    await dbHandlers.connect();
  });

  beforeEach(async () => {
    await dbHandlers.connect();
    const user = new UserModel({
      username: "ash3",
      password: "iWannaB3DVeryBest",
    });
    await user.save();
  });
  afterEach(async () => await dbHandlers.clearDatabase());
  afterAll(async () => await dbHandlers.closeDatabase());

  describe("POST /users", () => {
    it("should create new user if fields are valid", async () => {
      const response = await request(app)
        .post("/users/")
        .send({ username: "username", password: "12345678" })
        .expect(201);
      expect(response.body).toMatchObject({
        username: "username",
      });
    });

    it("should throw error if username and password is empty", async () => {
      const response = await request(app)
        .post("/users/")
        .send({ username: "", password: "" })
        .expect(500);
      expect(response.text).toEqual(
        "ValidationError: username: Path `username` is required., password: Path `password` is required."
      );
    });

    it("should throw error if username and password is too short", async () => {
      const response = await request(app)
        .post("/users/")
        .send({ username: "1", password: "1" })
        .expect(500);
      expect(response.text).toEqual(
        "ValidationError: username: Path `username` (`1`) is shorter than the minimum allowed length (3)., password: Path `password` (`1`) is shorter than the minimum allowed length (8)."
      );
    });
  });

  describe("POST /users/login", () => {
    it("should create new user if fields are valid", async () => {
      const response = await request(app)
        .post("/users/login")
        .send({ username: "ash3", password: "iWannaB3DVeryBest" })
        .expect(200);
      expect(response.text).toEqual("You are now logged in!");
    });

    it("should throw error if username and password is wrong", async () => {
      const response = await request(app)
        .post("/users/login")
        .send({ username: "ash3", password: "B3DVeryBest" })
        .expect(400);
      expect(response.text).toEqual("Error: Login failed");
    });

    it("should throw error if username and password is empty", async () => {
      const response = await request(app)
        .post("/users/login")
        .send({ username: "", password: "" })
        .expect(500);
      expect(response.text).toEqual(
        "TypeError: Cannot read property 'password' of null"
      );
    });
  });
});
