import { Router } from "express";

import { validate } from "../middleware/validate";
import { createEventSchema } from "../validation/eventvalidation";
import { createEvent, getAllEvents, getEventById, updateEvent } from "../controllers/eventController";

const router = Router();

router.post("/", validate(createEventSchema), createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", updateEvent);
export default router;
