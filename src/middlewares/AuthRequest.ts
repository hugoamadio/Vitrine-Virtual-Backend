import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

async function AuthRequest(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1] as string;

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (err) {
    res.status(401).json({ success: false, msg: "User not logged" });
    return;
  }

  next();
}

export default AuthRequest;
