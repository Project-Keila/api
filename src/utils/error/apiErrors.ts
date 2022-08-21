import { BaseError } from "./baseError";
import httpStatusCodes from "./httpStatusCodes";

export class Api404Error extends BaseError {

  constructor(
    name: string,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = 'Not found.',
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description)
  }
}

export class Api500Error extends BaseError {

  constructor(
    name: string,
    statusCode = httpStatusCodes.INTERNAL_SERVER,
    description = 'Internal Server Error.',
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description)
  }
}

export class Api400Error extends BaseError {

  constructor(
    name: string,
    statusCode = httpStatusCodes.UNAUTHORIZED,
    description = 'Bad Request',
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description)
  }
}

export class Api403Error extends BaseError {

  constructor(
    name: string,
    statusCode = httpStatusCodes.UNAUTHORIZED,
    description = 'Unauthorized',
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description)
  }
}
