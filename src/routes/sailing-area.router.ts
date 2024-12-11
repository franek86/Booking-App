import express from "express";
import { createSailingArea, getSailingArea } from "../controllers/sailing-area.controller";
import validate from "../middleware/validations";
import { sailingAreaSchema } from "../shared/validationSchema";
import { paginationMiddleware } from "../middleware/paginations";

const router = express.Router();

router.post("/create", validate(sailingAreaSchema), createSailingArea);
router.get("/", paginationMiddleware(), getSailingArea);

export default router;
