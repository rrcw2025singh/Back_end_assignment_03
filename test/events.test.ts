import request from "supertest";
import app from "../src/app";

describe("Events API", () => {

  let createdEventId: string;

  // POST /api/v1/events
  

  it("should create an event successfully (201)", async () => {

    // Arrange
    const newEvent = {
      name: "Tech Conference",
      date: "2026-03-01",
      capacity: 100
    };

    // Act
    const response = await request(app)
      .post("/api/v1/events")
      .send(newEvent);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("id");

    createdEventId = response.body.data.id;
  });

  it("should fail validation if required fields are missing (400)", async () => {

    // Arrange
    const invalidEvent = {
      date: "2026-03-01"
    };

    // Act
    const response = await request(app)
      .post("/api/v1/events")
      .send(invalidEvent);

    // Assert
    expect(response.status).toBe(400);
  });

  // GET /api/v1/events
  

  it("should return all events (200)", async () => {

    // Arrange
    // (event already created above)

    // Act
    const response = await request(app)
      .get("/api/v1/events");

    // Assert
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  // GET /api/v1/events/:id
  

  it("should return event by id (200)", async () => {

    // Arrange
    // createdEventId from previous test

    // Act
    const response = await request(app)
      .get(`/api/v1/events/${createdEventId}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(createdEventId);
  });

  it("should return 404 if event not found", async () => {

    // Arrange
    const fakeId = "evt_999999";

    // Act
    const response = await request(app)
      .get(`/api/v1/events/${fakeId}`);

    // Assert
    expect(response.status).toBe(404);
  });

  // PUT /api/v1/events/:id
  

  it("should update an event (200)", async () => {

    // Arrange
    const updateData = {
      name: "Updated Event Name",
      capacity: 200
    };

    // Act
    const response = await request(app)
      .put(`/api/v1/events/${createdEventId}`)
      .send(updateData);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("Updated Event Name");
  });

  // DELETE /api/v1/events/:id
  

  it("should delete an event (200 or 204)", async () => {

    // Arrange
    // createdEventId exists

    // Act
    const response = await request(app)
      .delete(`/api/v1/events/${createdEventId}`);

    // Assert
    expect([200, 204]).toContain(response.status);
  });

  it("should return 404 when deleting non-existing event", async () => {

    // Arrange
    const fakeId = "evt_999999";

    // Act
    const response = await request(app)
      .delete(`/api/v1/events/${fakeId}`);

    // Assert
    expect(response.status).toBe(404);
  });

});