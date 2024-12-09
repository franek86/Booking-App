import mongoose from "mongoose";
import { CountryType } from "../shared/types";

const countrySchema = new mongoose.Schema<CountryType>(
  {
    name: { type: String },
    shortCountryCode: { type: String },
    longCountryCode: { type: String },
    iconFlag: { type: String, required: false },
  },
  { timestamps: true }
);

const Country = mongoose.model<CountryType>("Country", countrySchema);
export default Country;
