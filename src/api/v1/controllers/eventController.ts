import { Request, Response } from "express";
import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../repositories/eventRepository";

export const createEvent = async (req: Request, res: Response) => {
  const {
    name,
    date,
    capacity,
    registrationCount = 0,
    status = "active",
    category = "general",
  } = req.body;

  const newEvent = await createDocument("events", {
    name,
    date,
    capacity,
    registrationCount,
    status,
    category,
  });

  return res.status(201).json({
    message: "Event created",
    data: newEvent,
  });
};

export const getAllEvents = async (req: Request, res: Response) => {
  const events = await getDocuments("events");

  return res.status(200).json({
    message: "Events retrieved successfully",
    data: events,
  });
};

export const getEventById = async (req: Request, res: Response) => {
  const id = String(req.params.id);

  const event = await getDocumentById("events", id);

  if (!event) {
    return res.status(404).json({
      message: `Event with id ${id} not found`,
    });
  }

  return res.status(200).json({
    message: "Event retrieved successfully",
    data: event,
  });
};

export const updateEvent = async (req: Request, res: Response) => {
  const id = String(req.params.id);

  const existingEvent = await getDocumentById("events", id);

  if (!existingEvent) {
    return res.status(404).json({
      message: `Event with id ${id} not found`,
    });
  }

  const updatedEvent = await updateDocument("events", id, req.body);

  return res.status(200).json({
    message: "Event updated successfully",
    data: updatedEvent,
  });
};

export const deleteEvent = async (req: Request, res: Response) => {
  const id = String(req.params.id);

  const existingEvent = await getDocumentById("events", id);

  if (!existingEvent) {
    return res.status(404).json({
      message: `Event with id ${id} not found`,
    });
  }

  await deleteDocument("events", id);

  return res.status(200).json({
    message: "Event deleted successfully",
  });
};
       