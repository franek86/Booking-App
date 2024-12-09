import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserModel from "../models/User";
import { errorHandler } from "../shared/error";
import { AuthRequest } from "../middleware/auth";

function verifyRefreshToken(token: string): JwtPayload | string | null {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN as string);
  } catch (error) {
    return null;
  }
}

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    user = new UserModel(req.body);
    await user.save();

    /* const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_EXPIRES_IN as string, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3 * 60 * 1000,
    }); */
    return res.status(200).send({ message: "User succesfully register" });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Something went wrong"));
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN as string, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 5 * 60 * 1000,
    });

    const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN as string, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 60 * 1000,
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    next(errorHandler(500, "Something went wrong"));
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: "Unauthorize" });

  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded || typeof decoded === "string") {
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }

  const { userId } = decoded as JwtPayload;

  const newAccessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN as string, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });
  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 5 * 60 * 1000,
  });

  return res.json({ message: "Access token refreshed", newAccessToken });
};

export const userProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user;

    if (!userId) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ id: userId });
  } catch (error) {
    console.log(error);
  }
};

export const getSession = async (req: AuthRequest, res: Response) => {
  try {
    const user = await UserModel.findById(req.user).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) return res.sendStatus(204);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });

  res.status(200).json({ message: "Logout successful" });
};
