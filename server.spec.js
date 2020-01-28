const request = require("supertest");

const server = require("./server.js");

describe("TS1: Test suite for testing server set-up", () => {
  it("TC1: Testing the environment", () => {
    expect(process.env.NODE_ENV).toBe("test");
  });
  it("TC2: Test the default GET request. Should return 200", async () => {
    const res = await request(server).get("/");
    expect(res.status).toBe(200);
  });
  it("TC3: Test the response type to be application/json", async () => {
    const res = await request(server).get("/");
    expect(res.type).toBe("application/json");
  });
  it("TC4: Test the message in the response.", async () => {
    const res = await request(server).get("/");
    const { message } = res.body;
    expect(message).toBe("The Weather server is up and running!");
  });
});
