

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { Request, Response, NextFunction } from "express";

dotenv.config();

type UserPayload = {
  id: string;
    username: string;
    email: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // Attach user info to request
    }
  }
}
export const verifyJwt = (req: Request, res: Response, next: NextFunction) : void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    res.status(500).json({ message: "JWT secret not configured" });
    return;
  }

  jwt.verify(token , jwtSecret, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
      return;
    }
    req.user = decoded as UserPayload; // Attach user info to request
    next();
  });
};

