import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
dotenv.config();

export const userMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers["authorization"];
    const decode = jwt.verify(
      header as string,
      process.env.JWT_SECRET as string
    );

    if (decode) {
      req.body.userID = (decode as JwtPayload).id;
      next();
    } else {
      res.json({ msg: "Access Denied" });
    }
  } catch (error) {
    res.json("something went wrong" + error);
  }
};
