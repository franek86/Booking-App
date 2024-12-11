import { z } from "zod";

export const registerUserSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const sailingAreaSchema = z.object({
  area: z.string().min(1, "Area is required"),
  countryIds: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format")),
});

export const countrySchema = z.object({
  name: z.string().min(1, "Country name is required"),
  shortCountryCode: z.string().min(1, "Short code is required").max(2, "Max 2 charaters e.g. EN"),
  longCountryCode: z.string().min(1, "Long code is required").max(3, "Max 3 charaters e.g. ENG"),
});
