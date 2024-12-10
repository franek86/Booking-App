import { Response, Request, NextFunction } from "express";
import { errorHandler } from "../shared/error";
import SailingArea from "../models/SailingArea";
import Country from "../models/Countries";

/*
 * Method: POST
 * Route: /sailing-area/create
 * Protecded: Admin
 */

export const createSailingArea = async (req: Request, res: Response, next: NextFunction) => {
  const { area, countryIds } = req.body;
  try {
    const existingSailingArea = await SailingArea.findOne({ area });
    if (existingSailingArea) return res.status(400).json({ message: "Area already exists." });

    const sailingArea = new SailingArea({ area, countryIds });
    await sailingArea.save();

    /*   await Country.updateMany({ _id: { $in: countryIds } }, { $set: { sailingArea: sailingArea._id } });
     */
    res.status(200).json({ sailingArea, message: "Sailing area created" });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Something went wrong on create sailing area"));
  }
};
