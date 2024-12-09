import express from "express";
import { createYacht, yachSearch } from "../controllers/yachts.controller";

const router = express.Router();

router.get("/search", yachSearch);
router.post("/create", createYacht);

export default router;
