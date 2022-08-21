"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const options = {
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
    },
    logsene: {
        token: process.env.LOGS_TOKEN,
        level: 'debug',
        type: 'app_logs',
        url: 'https://logsene-receiver.sematext.com/_bulk'
    }
};
exports.logger = winston_1.default.createLogger({
    levels: winston_1.default.config.npm.levels,
    transports: [
        new winston_1.default.transports.Console(options.console),
    ],
    exitOnError: false
});
