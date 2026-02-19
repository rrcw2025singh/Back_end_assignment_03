import { Request, Response } from "express";

let eventIdCounter = 1;
const EventSource: any[] = [];

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

  EventSource.push(newEvent);

  return res.status(201).json({
    message: "Event created",
    data: newEvent
  });
};

  export const getAllEvents =(req: Request, res: Response) => {
        return res.status(200).json({
            message: "Events retrieved successfully",
            data: EventSource
        });
};

export const getEventById = (req: Request, res: Response) => {
  const { id } = req.params;

  const event = EventSource.find(e => e.id === id);

  if (!event) {
    return res.status(404).json({
      message: `Event with id ${id} not found`
    });
  }

  return res.status(200).json({
    message: "Event retrieved successfully",
    data: event
  });
};
export const updateEvent = (req: Request, res: Response) => {
  const { id } = req.params;

  const eventIndex = EventSource.findIndex(event => event.id === id);

  if (eventIndex === -1) {
    return res.status(404).json({
      message: `Event with id ${id} not found`
    });
  }

  const updatedEvent = {
    ...EventSource[eventIndex],
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  EventSource[eventIndex] = updatedEvent;

  return res.status(200).json({
    message: "Event updated successfully",
    data: updatedEvent
  });
};

