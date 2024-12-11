import { Response, Request, NextFunction } from "express";
import { errorHandler } from "../shared/error";
import SailingArea from "../models/SailingArea";
import { IPaginationType } from "../middleware/paginations";

/*
 * Method: POST
 * Route: /create
 * Protected: Admin
 */

export const createSailingArea = async (req: Request, res: Response, next: NextFunction) => {
  const { area, countryIds } = req.body;
  try {
    const existingSailingArea = await SailingArea.findOne({ area });
    if (existingSailingArea) return res.status(400).json({ message: "Area already exists." });

    const sailingArea = new SailingArea({ area, countryIds });
    await sailingArea.save();

    res.status(200).json({ sailingArea, message: "Sailing area created" });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Something went wrong on create sailing area"));
  }
};

/*
 * Method: GET
 * Route: /sailing-area
 * Protected: Public
 */

export const getSailingArea = async (req: IPaginationType, res: Response, next: NextFunction) => {
  try {
    const { page, perPage, skip } = req.pagination!;
    const total = await SailingArea.countDocuments();
    const totalPages = Math.ceil(total / perPage);
    const sailingArea = await SailingArea.find().populate("countryIds", "name").skip(skip).limit(perPage);

    const data = sailingArea.map((area) => ({
      ...area.toObject(),
      countryCount: area.countryIds.length,
    }));

    res.status(200).json({ data, pagination: { page, total, totalPages, perPage }, message: "Successfully get all sailing area" });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Fetch sailing area error"));
  }
};
