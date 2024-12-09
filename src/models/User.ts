import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { UserTypes } from "../shared/types";

const userSchema = new mongoose.Schema({
  firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

userSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const UserModel = mongoose.model<UserTypes>("User", userSchema);
export default UserModel;
