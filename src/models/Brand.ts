import mongoose, { Schema } from "mongoose";
import { IBrandType } from "../shared/types";

const brandSchema = new mongoose.Schema<IBrandType>(
  {
    name: { type: String },
    models: [
      {
        type: Schema.Types.ObjectId,
        ref: "Model",
      },
    ],
  },
  { timestamps: true }
);

const Brand = mongoose.model<IBrandType>("Brand", brandSchema);
export default Brand;
