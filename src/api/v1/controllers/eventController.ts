import { Request, Response } from "express";

let eventIdCounter = 1;

export const createEvent = (req: Request, res: Response) => {

  const {
    name,
    date,
    capacity,
    registrationCount = 0,
    status = "active",
    category = "general"
  } = req.body;

  const newEvent = {
    id: `evt_${String(eventIdCounter++).padStart(6, "0")}`,
    name,
    date,
    capacity,
    registrationCount,
    status,
    category,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  return res.status(201).json({
    message: "Event created",
    data: newEvent
  });
};
