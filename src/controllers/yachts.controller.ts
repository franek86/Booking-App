import { NextFunction, Request, Response } from "express";
import Yachts from "../models/Yachts";
import { errorHandler } from "../shared/error";

export const yachSearch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const yachts = await Yachts.find();
    res.status(200).json({ data: yachts });
  } catch (error) {
    next(errorHandler(500, "Something went wrong"));
  }
};

export const createYacht = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newYacht = req.body;
    const yacht = new Yachts(newYacht);
    await yacht.save();
    res.status(200).send(yacht);
  } catch (error) {
    next(errorHandler(500, "Can not create yacht. Something went wrong"));
  }
};
