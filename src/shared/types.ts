import mongoose from "mongoose";

export interface IModelData {
  _id: mongoose.Types.ObjectId;
  name: string;
}

export interface IBrandType {
  _id: string;
  name: string;
  models: IModelData;
}

export interface IModelType {
  _id: string;
  name: string;
  brandId: mongoose.Types.ObjectId;
  brandName: string;
}

export type YachtType = {
  _id: string;
  yachtName: string;
  yachtBrandId?: mongoose.Types.ObjectId;
  yachtBrandName: string;
  yachtModelId?: mongoose.Types.ObjectId;
  yachtModelName: string;
  yachtBase?: mongoose.Types.ObjectId;
  cabins: Number;
  berths: Number;
  toilet: Number;
  boatType: string;
  productionYear: string;
  beam?: string;
  length: string;
  draft?: string;
  engine?: string;
  fuelTank?: string;
  waterTank?: string;
  description?: string;
  tag?: string;
  equipment: [];
  mainImage: string;
  exteriorImage: string;
  interiorImage: string;
  additionalImages: Array<string>;
};
