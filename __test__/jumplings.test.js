const request = require("supertest");
const app = require("../src/app");
const JumplingModel = require("../src/models/jumpling.model");
const UserModel = require("../src/models/user.model");
const dbHandlers = require("../test/dbHandler");
const createJWTToken = require("../src/config/jwt");

describe("Route", () => {
  let token;
  const JumplingData = [
    {
      name: "jump1",
    },
    {
      name: "jump2",
    },
    {
      name: "jump3",
    },
    {
      name: "jump4",
    },
  ];
  beforeAll(async () => {
    await dbHandlers.connect();
    const user = new UserModel({
      username: "ash3",
      password: "iWannaB3DVeryBest",
    });
    await user.save();
    token = createJWTToken(user.username);
  });

  beforeEach(async () => {
    await JumplingModel.create(JumplingData);
  });
  afterEach(async () => await dbHandlers.clearDatabase());
  afterAll(async () => await dbHandlers.closeDatabase());

  describe("GET /jumplings", () => {
    it("should retrieve list of jumplings", async () => {
      const response = await request(app).get("/jumplings").expect(200);
      expect(response.body).toMatchObject(JumplingData);
    });
  });

  describe("GET /jumplings/presenter", () => {
    it("should return a random jumpling", async () => {
      const { body } = await request(app)
        .get("/jumplings/presenter")
        .expect(200);
      expect(body).toMatchObject({ choose: true });
    });

    it("should return all random jumpling (1)", async () => {
      await request(app).get("/jumplings/presenter");
      const { body } = await request(app)
        .get("/jumplings/presenter/all")
        .expect(200);
      expect(body.length).toEqual(1);
    });

    it("should return all random jumpling (3)", async () => {
      await request(app).get("/jumplings/presenter");
      await request(app).get("/jumplings/presenter");
      await request(app).get("/jumplings/presenter");
      const { body } = await request(app)
        .get("/jumplings/presenter/all")
        .expect(200);
      expect(body.length).toEqual(3);
    });

    it("should return all random jumpling (5) if more than 4 will reset to 0", async () => {
      await request(app).get("/jumplings/presenter");
      await request(app).get("/jumplings/presenter");
      await request(app).get("/jumplings/presenter");
      await request(app).get("/jumplings/presenter");
      await request(app).get("/jumplings/presenter");

      const { body } = await request(app)
        .get("/jumplings/presenter/all")
        .expect(200);
      expect(body.length).toEqual(1);
    });
  });

  describe("GET /jumplings/:name", () => {
    it("should retrieve jumpling with requested name", async () => {
      const response = await request(app).get("/jumplings/jump2").expect(200);
      expect(response.body).toMatchObject([
        {
          name: "jump2",
        },
      ]);
    });
  });

  describe("POST /jumplings", () => {
    it("should create new jumpling if fields are valid", async () => {
      const response = await request(app)
        .post("/jumplings/")
        .send({ name: "song3" })
        .expect(201);
      expect(response.body).toMatchObject({ name: "song3" });
    });

    it("should throw error if name is empty", async () => {
      const response = await request(app)
        .post("/jumplings/")
        .send({ name: "" })
        .expect(500);
      expect(response.text).toEqual(
        "Jumpling validation failed: name: Path `name` is required."
      );
    });

    it("should throw error if name is too short", async () => {
      const response = await request(app)
        .post("/jumplings/")
        .send({ name: "1" })
        .expect(500);
      expect(response.text).toEqual(
        "Jumpling validation failed: name: Path `name` (`1`) is shorter than the minimum allowed length (3)."
      );
    });
  });

  describe("PUT /jumplings/:id", () => {
    it("should modify specified jumpling if fields are valid", async () => {
      const jump = await JumplingModel.findOne({ name: "jump1" });
      const response = await request(app)
        .put(`/jumplings/${jump.id}`)
        .send({ name: "songUpdated" })
        .set("Cookie", `token = ${token}`)
        .expect(200);
      expect(response.body).toMatchObject({ name: "songUpdated" });
    });

    it("should throw error if name is empty", async () => {
      const jump = await JumplingModel.findOne({ name: "jump1" });
      const response = await request(app)
        .put(`/jumplings/${jump.id}`)
        .send({ name: "" })
        .set("Cookie", `token = ${token}`)
        .expect(500);
      expect(response.text).toEqual(
        "Validation failed: name: Path `name` is required."
      );
    });

    it("should throw error if name is too short", async () => {
      const jump = await JumplingModel.findOne({ name: "jump1" });
      const response = await request(app)
        .put(`/jumplings/${jump.id}`)
        .send({ name: "1" })
        .set("Cookie", `token = ${token}`)
        .expect(500);
      expect(response.text).toEqual(
        "Validation failed: name: Path `name` (`1`) is shorter than the minimum allowed length (3)."
      );
    });
    // should throw error if request body is not json
    it("should throw error if token didnt send", async () => {
      const jump = await JumplingModel.findOne({ name: "jump1" });
      const response = await request(app)
        .put(`/jumplings/${jump.id}`)
        .expect(500);
      expect(response.text).toEqual("You are not authorized");
    });

    it("should throw error if jumpling does not exist", async () => {
      const response = await request(app)
        .put("/jumplings/603f3ef83a4e062e07efb05a")
        .set("Cookie", `token = ${token}`)
        .expect(500);
      expect(response.text).toEqual("Cannot read property 'id' of null");
    });
  });

  describe("DELETE /jumplings/:id", () => {
    it("should delete jumpling if jumpling exists", async () => {
      const jump = await JumplingModel.findOne({ name: "jump1" });
      const response = await request(app)
        .delete(`/jumplings/${jump.id}`)
        .set("Cookie", `token = ${token}`)
        .expect(200);
      expect(response.body).toMatchObject({ name: "jump1" });
    });

    it("should throw error if jumpling does not exist", async () => {
      const response = await request(app)
        .delete("/jumplings/603f3ef83a4e062e07efb05a")
        .set("Cookie", `token = ${token}`)
        .expect(500);
      expect(response.text).toEqual("Cannot read property 'id' of null");
    });

    it("should throw error if token didnt send", async () => {
      const response = await request(app)
        .delete("/jumplings/603f3ef83a4e062e07efb05a")
        .expect(500);
      expect(response.text).toEqual("You are not authorized");
    });
  });

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
});
