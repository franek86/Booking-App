import { Response, Request, NextFunction } from "express";
import Country, { ICountryType } from "../models/Countries";
import { errorHandler } from "../shared/error";
import { IPaginationType } from "../middleware/paginations";

import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

/*
 * Method: POST
 * Route: /countires/create
 * Protected: Admin
 */
export const createCountry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newCountry = req.body as ICountryType;
    const existingCountry = await Country.findOne({ name: newCountry.name });
    if (existingCountry) return res.status(400).json({ message: "Country already exists." });

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required." });
    }
    const imageFile = req.file as Express.Multer.File;

    const imageResult = await cloudinary.uploader.upload(imageFile.path);

    const country = new Country({ ...newCountry, iconFlag: imageResult.secure_url });
    await country.save();
    res.status(200).json({ country, message: "Country created" });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Something went wrong on create country"));
  }
};

/*
 * Method: Get
 * Route: /countires
 * Protected: Public
 * Query: ?sort=newest, oldest, name asceding, name descending
 */
export const getCountries = async (req: IPaginationType, res: Response, next: NextFunction) => {
  try {
    const { page, perPage, skip } = req.pagination!;
    const total = await Country.countDocuments();
    const totalPages = Math.ceil(total / perPage);

    const query = {};
    const sortQuery = req.query.sort as string;

    let sortObject = {};
    if (sortQuery) {
      switch (sortQuery) {
        case "newest":
          sortObject = { createdAt: -1 };
          break;

        case "oldest":
          sortObject = { createdAt: 1 };
          break;

        case "name-asc":
          sortObject = { name: 1 };
          break;

        case "name-desc":
          sortObject = { name: -1 };
          break;

        default:
          break;
      }
    }

    const countries = await Country.find(query).sort(sortObject).skip(skip).limit(perPage);
    res.status(200).json({ countries, page, total, totalPages, perPage, message: "Successfully get all countries" });
  } catch (error) {
    next(errorHandler(500, "Get countries error"));
  }
};

/*
 * Method: PATCH
 * Route: /:id
 * Protected: Admin
 * Required: country id
 */
export const editCountry = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const imageFile = req.file as Express.Multer.File;

    if (imageFile) {
      const imageResult = await cloudinary.uploader.upload(imageFile.path);
      const updateCountryFile = await Country.findByIdAndUpdate(
        id,
        { iconFlag: imageResult.secure_url },
        { new: true, runValidators: true }
      );
      if (!updateCountryFile) return res.status(404).json({ message: "Country icon not found" });
      return res.status(200).json({ message: "Country icon successfully updated" });
    }
    const updateCountry = await Country.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!updateCountry) return res.status(404).json({ message: "Country not found" });

    return res.status(200).json({ updateCountry, message: "Country successfully updated" });
  } catch (error) {
    next(errorHandler(500, "Edit country error"));
  }
};

/*
 * Method: DELETE
 * Route: /create
 * Protected: Admin
 * Required: country id
 */
export const deleteCountry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Invalid country id" });

    const deletedCountry = await Country.findByIdAndDelete(id);
    if (!deletedCountry) return res.status(404).json({ message: `Country with id:${id} not found` });

    res.status(200).json({ message: `Country with id:${id} successfully deleted`, data: deletedCountry });
  } catch (error) {
    next(errorHandler(500, "Delete country error"));
  }
};

/*
 * Method: GET
 * Route: /:id
 * Protected: Admin
 * Required: country id
 */

export const getSingleCountry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: "Country id not found" });

    const response = await Country.findById(id);
    res.status(200).json({ data: response, message: `Successfully get country by id - ${id}` });
  } catch (error) {
    next(errorHandler(500, "Get single country error"));
  }
};
