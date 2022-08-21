"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const env = {
    dbHost: process.env.DB_HOST,
    nftApiKey: process.env.NFT_STORAGE_API_KEY,
    port: process.env.PORT,
    dbDatabase: process.env.DB_DATABASE,
    jwtSecret: process.env.JWT_SECRET,
    clientUrl: process.env.CLIENT_URL,
};
exports.default = env;
