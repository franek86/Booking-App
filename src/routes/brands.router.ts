import express from "express";
import { createBrand, createBrandModel } from "../controllers/brands.controller";

const router = express.Router();
router.post("/create", createBrand);
router.post("/create-model", createBrandModel);

export default router;
