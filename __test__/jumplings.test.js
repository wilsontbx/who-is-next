const request = require("supertest");
const app = require("../src/app");
const JumplingModel = require("../src/models/jumpling.model");
const dbHandlers = require("../test/dbHandler");

describe("Route", () => {
  let token;
  const JumplingData = [
    {
      name: "Jump 1",
    },
    {
      name: "Jump 2",
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
    it("should return a random jumpling", async () => {});
  });

  describe("GET /jumplings/:name", () => {
    it("should retrieve jumpling with requested name", async () => {});
  });

  describe("POST /jumplings", () => {
    it("should create new jumpling if fields are valid", async () => {});

    it("should throw error if name is empty", async () => {});

    it("should throw error if name is too short", async () => {});
  });

  describe("PUT /jumplings/:id", () => {
    it("should modify specified jumpling if fields are valid", async () => {});

    it("should throw error if name is empty", async () => {});

    it("should throw error if request body is not json", async () => {});
  });

  describe("DELETE /jumplings/:id", () => {
    it("should delete jumpling if jumpling exists", async () => {});

    it("should throw error if jumpling does not exist", async () => {});
  });
  // it("GET / should get all the route", async () => {
  //   const { body } = await request(app).get("/jumplings").expect(200);
  //   expect(body).toEqual([]);
  // });
  // it("POST / should able create", async () => {
  //   const { body } = await request(app)
  //     .post("/jumplings")
  //     .send({
  //       name: "testing",
  //     })
  //     .expect(200);
  //   expect(body).toEqual({ id: 1, name: "testing" });
  // });
  // it("GET / should get all the jumplings", async () => {
  //   const { body } = await request(app).get("/jumplings").expect(200);
  //   expect(body).toEqual([{ id: 1, name: "testing" }]);
  // });
  // // post a error
  // it("POST / should throw error name is required", async () => {
  //   const { text } = await request(app).post("/jumplings").send({}).expect(400);
  //   expect(text).toEqual('"name" is required');
  // });
  // it("POST / should able create", async () => {
  //   const { body } = await request(app)
  //     .post("/jumplings")
  //     .send({
  //       name: "another-guy",
  //     })
  //     .expect(200);
  //   expect(body).toEqual({ id: 2, name: "another-guy" });
  // });
  // it("GET / should get id 2", async () => {
  //   const { body } = await request(app)
  //     .get("/jumplings/another-guy")
  //     .expect(200);
  //   expect(body).toEqual({ id: 2, name: "another-guy" });
  // });
  // it("PUT / should able edit id 1 guy", async () => {
  //   const { body } = await request(app)
  //     .put("/jumplings/1")
  //     .send({
  //       name: "Update-Testing",
  //     })
  //     .expect(200);
  //   expect(body).toEqual({ id: 1, name: "Update-Testing" });
  // });
  // //   error checking
  // it("PUT / should throw error name is not allowed to be empty", async () => {
  //   const { text } = await request(app)
  //     .put("/jumplings/1")
  //     .send({ name: "" })
  //     .expect(400);
  //   expect(text).toEqual('"name" is not allowed to be empty');
  // });
  // it("DELETE / should able to delete", async () => {
  //   const { body } = await request(app).delete("/jumplings/1").expect(200);
  //   expect(body).toEqual({ id: 1, name: "Update-Testing" });
  // });
  // it("GET / should get only id 2", async () => {
  //   const { body } = await request(app).get("/jumplings").expect(200);
  //   expect(body).toEqual([{ id: 2, name: "another-guy" }]);
  // });
  // it("POST / should able create", async () => {
  //   const { body } = await request(app)
  //     .post("/jumplings")
  //     .send({
  //       name: "another-guy-1",
  //     })
  //     .expect(200);
  //   expect(body).toEqual({ id: 3, name: "another-guy-1" });
  // });
  // it("POST / should able create", async () => {
  //   const { body } = await request(app)
  //     .post("/jumplings")
  //     .send({
  //       name: "another-guy-2",
  //     })
  //     .expect(200);
  //   expect(body).toEqual({ id: 4, name: "another-guy-2" });
  // });
  // it("GET / should able get random", async () => {
  //   const { body } = await request(app).get("/jumplings/presenter").expect(200);
  //   expect([body].length).toEqual(1);
  // });
});
