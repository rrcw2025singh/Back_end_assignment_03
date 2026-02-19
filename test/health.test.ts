import request from "supertest";
import app from "../src/app";

describe("Health Endpoint", () => {

  it("should return 200 and health details", async () => {

    // Arrange
    const expectedStatus = 200;

    // Act
    const response = await request(app).get("/api/v1/health");

    // Assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toHaveProperty("status", "OK");
    expect(response.body).toHaveProperty("timestamp");
    expect(response.body).toHaveProperty("uptime");
    expect(response.body).toHaveProperty("version");

  });

});
