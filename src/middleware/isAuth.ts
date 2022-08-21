import { NextFunction, Request, Response } from "express";
import { Api403Error, Api500Error } from "../utils/error/apiErrors";

const isAuth = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    if (!req.session.admin) {
      throw new Api403Error("Not authorised");
    }
    return next();
  } catch (error: any) {
    throw new Api500Error(error.message);
  }
}

export default isAuth;
