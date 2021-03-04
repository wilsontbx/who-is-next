const request = require("supertest");
const app = require("../src/app");
const JumplingModel = require("../src/models/jumpling.model");
const dbHandlers = require("../test/dbHandler");

describe("Route", () => {
  let token;
  const JumplingData = [
    {
      name: "jump1",
    },
    {
      name: "jump2",
    },
  ];
  beforeAll(async () => {
    await dbHandlers.connect();
    // const user = new UserModel({
    //   username: "ash3",
    //   password: "iWannaB3DVeryBest",
    // });
    // await user.save();
    // token = createJWTToken(user.username);
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
        .expect(200);
      expect(response.body).toMatchObject({ name: "songUpdated" });
    });

    it("should throw error if name is empty", async () => {
      const jump = await JumplingModel.findOne({ name: "jump1" });
      const response = await request(app)
        .put(`/jumplings/${jump.id}`)
        .send({ name: "" })
        .expect(500);
      expect(response.text).toEqual(
        "Validation failed: name: Path `name` is required."
      );
    });

    it("should throw error if request body is not json", async () => {
      const jump = await JumplingModel.findOne({ name: "jump1" });
      const response = await request(app)
        .put(`/jumplings/${jump.id}`)
        .send({ name: "1" })
        .expect(500);
      expect(response.text).toEqual(
        "Validation failed: name: Path `name` (`1`) is shorter than the minimum allowed length (3)."
      );
    });
  });

  describe("DELETE /jumplings/:id", () => {
    it("should delete jumpling if jumpling exists", async () => {
      const jump = await JumplingModel.findOne({ name: "jump1" });
      const response = await request(app)
        .delete(`/jumplings/${jump.id}`)
        .expect(200);
      expect(response.body).toMatchObject({ name: "jump1" });
    });

    it("should throw error if jumpling does not exist", async () => {
      const jump = await JumplingModel.findOne({ name: "jump1" });
      const response = await request(app)
        .delete("/jumplings/603f3ef83a4e062e07efb05a")
        .expect(500);
      expect(response.text).toEqual("Cannot read property 'id' of null");
    });
  });
});
