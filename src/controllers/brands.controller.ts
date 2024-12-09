import { Request, Response, NextFunction } from "express";
import Brand from "../models/Brand";
import { errorHandler } from "../shared/error";
import YachtModel from "../models/Models";
import { IBrandType, IModelType } from "../shared/types";

export const createBrand = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newYachtBrand = req.body as IBrandType;
    const existingYachtBrand = await Brand.findOne({ name: newYachtBrand.name });

    if (existingYachtBrand) {
      return res.status(400).json({ message: "Brand already exists" });
    }

    const yachtBrand = new Brand(newYachtBrand);
    await yachtBrand.save();

    res.status(200).json({ yachtBrand, message: "New yacht brand created succesfully" });
  } catch (error) {
    next(errorHandler(500, "Something went wrong"));
  }
};

/* Brand Model */
export const createBrandModel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newYachtBrandModel = req.body as IModelType;
    const existingYachtBrandModel = await YachtModel.findOne({ name: newYachtBrandModel.name });

    if (existingYachtBrandModel) {
      return res.status(400).json({ message: "Model already exists" });
    }

    const yachtBrandModel = new YachtModel(newYachtBrandModel);
    await yachtBrandModel.save();
    res.status(200).json({ yachtBrandModel, message: "New yacht brand model created succesfully" });
  } catch (error) {
    next(errorHandler(500, "Something went wrong"));
  }
};
