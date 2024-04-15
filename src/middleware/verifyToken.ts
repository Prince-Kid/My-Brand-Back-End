import Jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { NextFunction } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import { JsonWebTokenError } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
interface tokenRequest extends Request {
  token: any;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenRequest = req as tokenRequest;

  const BearerToken: any = req.header("authorization");
  if (typeof BearerToken !== "undefined") {
    const token = BearerToken.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Ooops No Token Found" });
    }
    const secret: any = process.env.secretKey;
    Jwt.verify(token, secret, (err: any, decoded: any) => {
      if (err instanceof TokenExpiredError) {
        return res.json({ message: "Ooops Token Expired" });
      } else if (err instanceof JsonWebTokenError) {
        return res.json({ message: "oooops Invalid Token" });
      } else {
        tokenRequest.token = decoded;
        next();
      }
    });
  } else {
    res.status(403).json({ message: "No BearerToken Found" });
  }
};
