const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app.js");
const User = require("../../models/User.js");

const { DB_TEST_HOST, PORT = 3000 } = process.env;

describe("test /api/auth/ route", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_HOST);
    server = app.listen(2000);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  // afterEach(async () => {
  //   await User.deleteMany();
  // });

  // "test /api/auth/login with not register email=>statusCode = 403"

  it("test /api/auth/login with not register email", async () => {
    const loginData = {
      email: "test@gmail.com",
      password: "123456",
    };

    const { statusCode } = await request(app)
      .post("/api/auth/login")
      .send(loginData);

    expect(statusCode).toBe(401);
  });

  // "test /api/auth/login with wrong password"

  test("test /api/auth/login with wrong password", async () => {
    const loginData = {
      email: "buvoro@gmail.com",
      password: "1234567",
    };

    const { statusCode } = await request(app)
      .post("/api/auth/login")
      .send(loginData);

    expect(statusCode).toBe(401);
  });

  // "test /api/auth/login with registered correct email";

  it("test /api/auth/login with registered correct email", async () => {
    const loginData = {
      email: "buvoro@gmail.com",
      password: "123456",
    };
    const { body, statusCode } = await request(app)
      .post("/api/auth/login")
      .send(loginData);

    expect(statusCode).toBe(201);
    expect(body.user.email).toBe(loginData.email);
    expect(body.token).toBeDefined();
  });
});
