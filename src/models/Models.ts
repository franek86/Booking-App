import mongoose, { Schema } from "mongoose";
import { IModelType } from "../shared/types";

const modelSchema = new mongoose.Schema<IModelType>(
  {
    name: { type: String },
    brandId: { type: Schema.Types.ObjectId, ref: "Brand" },
    brandName: { type: String },
  },
  { timestamps: true }
);

const YachtModel = mongoose.model<IModelType>("YachtModel", modelSchema);
export default YachtModel;
