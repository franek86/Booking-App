import express from "express";
import { createCountry, deleteCountry, editCountry, getCountries, getSingleCountry } from "../controllers/countires.controller";
import { paginationMiddleware } from "../middleware/paginations";
import upload from "../middleware/multer";

const router = express.Router();

router.get("/", paginationMiddleware(), getCountries);
router.get("/:id", getSingleCountry);
router.post("/create", upload.single("iconFlag"), createCountry);
router.delete("/:id", deleteCountry);
router.patch("/:id", upload.single("iconFlag"), editCountry);
export default router;
