import request from "supertest";
import app from "../src/app";

describe("Event Validation - Create Endpoint", () => {

  it("should return 400 if date is in the past", async () => {

    // Arrange
    const invalidEvent = {
      name: "Tech Conference",
      date: "2020-01-01T00:00:00.000Z",
      capacity: 200
    };

    // Act
    const response = await request(app)
      .post("/api/v1/events")
      .send(invalidEvent);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });


  it("should return 400 if name is too short", async () => {

    // Arrange
    const invalidEvent = {
      name: "AB",
      date: "2026-12-25T09:00:00.000Z",
      capacity: 200
    };

    // Act
    const response = await request(app)
      .post("/api/v1/events")
      .send(invalidEvent);

    // Assert
    expect(response.status).toBe(400);
  });


  it("should return 400 if capacity is less than minimum", async () => {

    // Arrange
    const invalidEvent = {
      name: "Valid Event",
      date: "2026-12-25T09:00:00.000Z",
      capacity: -5
    };

    // Act
    const response = await request(app)
      .post("/api/v1/events")
      .send(invalidEvent);

    // Assert
    expect(response.status).toBe(400);
  });


  it("should return 201 for valid event", async () => {

    // Arrange
    const validEvent = {
      name: "Tech Conference",
      date: "2026-12-25T09:00:00.000Z",
      capacity: 200
    };

    // Act
    const response = await request(app)
      .post("/api/v1/events")
      .send(validEvent);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Event created");
    expect(response.body.data).toHaveProperty("id");
  });

});
