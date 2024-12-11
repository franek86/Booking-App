import mongoose, { Schema } from "mongoose";

export interface ISailingArea extends mongoose.Document {
  area: string;
  countryIds: mongoose.Types.ObjectId[];
}

const sailingAreaSchema = new mongoose.Schema<ISailingArea>(
  {
    area: { type: String, require: true },
    countryIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Country",
      },
    ],
  },
  { timestamps: true }
);

const SailingArea = mongoose.model<ISailingArea>("SailingArea", sailingAreaSchema);
export default SailingArea;
