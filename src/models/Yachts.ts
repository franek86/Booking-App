import mongoose, { Schema } from "mongoose";
import { YachtType } from "../shared/types";

const yachtEquipment = new mongoose.Schema({
  name: { type: String },
  icon: { type: String },
});

const yachtSchema = new mongoose.Schema<YachtType>(
  {
    yachtName: { type: String },
    yachtBrandId: [{ type: Schema.Types.ObjectId, ref: "Brand" }],
    yachtBrandName: { type: String }, // Abacus, Bavaria etc
    yachtModelId: [{ type: Schema.Types.ObjectId, ref: "Model" }],
    yachtModelName: { type: String }, // Abacus, Bavaria etc//Abacus 60, Bavaria 32
    yachtBase: { type: Schema.Types.ObjectId, ref: "Bases" },
    cabins: { type: Number },
    berths: { type: Number },
    toilet: { type: Number },
    boatType: { type: String }, // Sailboat, Gulet etc
    productionYear: { type: String },
    beam: { type: String },
    length: { type: String },
    draft: { type: String },
    engine: { type: String },
    fuelTank: { type: String },
    waterTank: { type: String },
    description: { type: String },
    tag: { type: String },
    equipment: [yachtEquipment],
    mainImage: { type: String },
    exteriorImage: { type: String },
    interiorImage: { type: String },
    additionalImages: [{ type: String }],
  },
  { timestamps: true }
);

const Yachts = mongoose.model("Yachts", yachtSchema);
export default Yachts;
