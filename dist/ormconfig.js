"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("./env"));
const AppleTree_1 = require("./model/entity/AppleTree");
const Auth_1 = require("./model/entity/Auth");
const Certificate_1 = require("./model/entity/Certificate");
const ConiferTree_1 = require("./model/entity/ConiferTree");
const PoplarTree_1 = require("./model/entity/PoplarTree");
const Tree_1 = require("./model/entity/Tree");
const ormconfig = {
    type: 'mongodb',
    url: env_1.default.dbHost,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    database: env_1.default.dbDatabase,
    entities: [
        Certificate_1.Certificate,
        Tree_1.Tree,
        AppleTree_1.AppleTree,
        ConiferTree_1.ConiferTree,
        PoplarTree_1.PoplarTree,
        Auth_1.Admin,
    ],
    migrations: [],
    synchronize: true,
    logging: true
};
exports.default = ormconfig;
