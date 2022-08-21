"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const ormconfig_1 = __importDefault(require("./ormconfig"));
const metadata_1 = __importDefault(require("./routes/metadata"));
const certificate_1 = __importDefault(require("./routes/certificate"));
const auth_1 = __importDefault(require("./routes/auth"));
const typeorm_1 = require("typeorm");
const env_1 = __importDefault(require("./env"));
const errorHandler_1 = require("./utils/error/errorHandler");
const connect_mongo_1 = __importDefault(require("connect-mongo"));
(0, dotenv_1.config)();
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)({
        credentials: true,
        origin: [env_1.default.clientUrl]
    }));
    const connection = new typeorm_1.DataSource(Object.assign({}, ormconfig_1.default));
    connection.initialize().then(() => {
        console.log(`Connected to mongodb`);
    }).catch(err => console.log(err));
    app.use((0, express_session_1.default)({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: connect_mongo_1.default.create({
            mongoUrl: env_1.default.dbHost,
        }),
        // cookie: { secure: false },
    }));
    app.use("/metadata", metadata_1.default);
    app.use("/certificate", certificate_1.default);
    app.use("/auth", auth_1.default);
    app.use((err, _req, res, _next) => {
        res.status(err.statusCode ? err.statusCode : 500).json({ status: false, message: err.name ? err.name : "Something went wrong!" });
    });
    app.listen(env_1.default.port, () => console.log(`Listening on port ${env_1.default.port}`));
    process.on('unhandledRejection', error => {
        throw error;
    });
    process.on('uncaughtException', (error) => {
        (0, errorHandler_1.logError)(error);
        if (!(0, errorHandler_1.isOperationalError)(error)) {
            process.exit(1);
        }
    });
}))();
