import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  userId?: string;
}

export interface AuthRequest extends Request {
  user?: CustomJwtPayload | string;
}

const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(403).json({ message: "Unauthorized user!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN as string) as CustomJwtPayload;
    req.user = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default authenticateToken;
