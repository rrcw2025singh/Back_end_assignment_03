import request from "supertest";
import app from "../src/app";

describe("Event Validation - Create Endpoint", () => {

  it("should return 400 if date is in the past", async () => {

    // Arrange
    const invalidEvent = {
      name: "Tech Event",
      date: "2020-01-01T00:00:00.000Z",
      capacity: 100
    };

    // Act
    const response = await request(app)
      .post("/api/v1/events")
      .send(invalidEvent);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");

  });

});
