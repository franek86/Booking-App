import mongoose from "mongoose";

const basesSchema = new mongoose.Schema(
  {
    name: { type: String },
    country: { type: String },
    city: { type: String },
    address: { type: String },
    latitude: { type: String },
    longitude: { type: String },
  },
  { timestamps: true }
);

const Bases = mongoose.model("Bases", basesSchema);
export default Bases;
