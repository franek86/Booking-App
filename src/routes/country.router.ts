import express from "express";
import { createCountry, deleteCountry, editCountry, getCountries, getSingleCountry } from "../controllers/countires.controller";
import { paginationMiddleware } from "../middleware/paginations";
import upload from "../middleware/multer";
import validate from "../middleware/validations";
import { countrySchema } from "../shared/validationSchema";

const router = express.Router();

router.get("/", paginationMiddleware(), getCountries);
router.get("/:id", getSingleCountry);
router.post("/create", upload.single("iconFlag"), validate(countrySchema), createCountry);
router.delete("/:id", deleteCountry);
router.patch("/:id", upload.single("iconFlag"), editCountry);
export default router;
