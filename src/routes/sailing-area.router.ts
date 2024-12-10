import express from "express";
import { createSailingArea } from "../controllers/sailing-area.controller";

const router = express.Router();

router.post("/create", createSailingArea);

export default router;
