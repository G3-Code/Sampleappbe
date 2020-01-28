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

describe("TS2: Test suite for testing /forecast/:place route", () => {
  it("TC1: Test the response status for get: forecast.", async () => {
    const res = await request(server)
      .get("/forecast/Chennai")
      .expect(201);
  });

  it("TC2: Test the data response back from forecast for a place", async () => {
    const res = await request(server).get("/forecast/Chennai");
    const { city } = res.body;
    expect(city).toBe("Chennai");
  });

  it("TC3: Test the data response back to have a length of 5", async () => {
    const res = await request(server).get("/forecast/Chennai");
    const { forecasts } = res.body;
    expect(forecasts.length).toBe(5);
  });
  it("TC4: Test the data response back to be of object type currentForecast", async () => {
    const currentForecastData = {
      city: "Chennai",
      day: "Tue",
      high: "91",
      low: "71",
      message: "Sunny",
      id: 0
    };
    const res = await request(server).get("/forecast/Chennai");
    const { currentForecast } = res.body;
    expect(currentForecast).toMatchObject(currentForecastData);
  });
});
