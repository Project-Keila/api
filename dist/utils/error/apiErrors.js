"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api403Error = exports.Api400Error = exports.Api500Error = exports.Api404Error = void 0;
const baseError_1 = require("./baseError");
const httpStatusCodes_1 = __importDefault(require("./httpStatusCodes"));
class Api404Error extends baseError_1.BaseError {
    constructor(name, statusCode = httpStatusCodes_1.default.NOT_FOUND, description = 'Not found.', isOperational = true) {
        super(name, statusCode, isOperational, description);
    }
}
exports.Api404Error = Api404Error;
class Api500Error extends baseError_1.BaseError {
    constructor(name, statusCode = httpStatusCodes_1.default.INTERNAL_SERVER, description = 'Internal Server Error.', isOperational = true) {
        super(name, statusCode, isOperational, description);
    }
}
exports.Api500Error = Api500Error;
class Api400Error extends baseError_1.BaseError {
    constructor(name, statusCode = httpStatusCodes_1.default.UNAUTHORIZED, description = 'Bad Request', isOperational = true) {
        super(name, statusCode, isOperational, description);
    }
}
exports.Api400Error = Api400Error;
class Api403Error extends baseError_1.BaseError {
    constructor(name, statusCode = httpStatusCodes_1.default.UNAUTHORIZED, description = 'Unauthorized', isOperational = true) {
        super(name, statusCode, isOperational, description);
    }
}
exports.Api403Error = Api403Error;
