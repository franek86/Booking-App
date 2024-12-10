import mongoose, { Schema } from "mongoose";

const sailingAreaSchema = new mongoose.Schema(
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

const SailingArea = mongoose.model("SailingArea", sailingAreaSchema);
export default SailingArea;
