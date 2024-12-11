import mongoose from "mongoose";

export interface ICountryType extends mongoose.Document {
  name: string;
  shortCountryCode: string;
  longCountryCode: string;
  iconFlag?: string;
}

const countrySchema = new mongoose.Schema<ICountryType>(
  {
    name: { type: String, required: true },
    shortCountryCode: { type: String, required: true },
    longCountryCode: { type: String, required: true },
    iconFlag: { type: String, required: false },
  },
  { timestamps: true }
);

const Country = mongoose.model<ICountryType>("Country", countrySchema);
export default Country;
