"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOperationalError = exports.returnError = exports.logErrorMiddleware = exports.logError = void 0;
const baseError_1 = require("./baseError");
function logError(err) {
    console.error(err);
}
exports.logError = logError;
function logErrorMiddleware(err, _req, _res, next) {
    logError(err);
    next(err);
}
exports.logErrorMiddleware = logErrorMiddleware;
function returnError(err, _req, res, _next) {
    res.status(err.statusCode || 500).send(err.message);
}
exports.returnError = returnError;
function isOperationalError(error) {
    if (error instanceof baseError_1.BaseError) {
        return error.isOperational;
    }
    return false;
}
exports.isOperationalError = isOperationalError;
