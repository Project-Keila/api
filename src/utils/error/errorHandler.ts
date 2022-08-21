import { NextFunction, Request, Response } from "express"
import { BaseError } from "./baseError"

export function logError(err: BaseError) {
  console.error(err)
}

export function logErrorMiddleware(err: BaseError, _req: Request, _res: Response, next: NextFunction) {
  logError(err)
  next(err)
}

export function returnError(err: BaseError, _req: Request, res: Response, _next: NextFunction) {
  res.status(err.statusCode || 500).send(err.message)
}

export function isOperationalError(error: BaseError) {
  if (error instanceof BaseError) {
    return error.isOperational
  }
  return false
}
