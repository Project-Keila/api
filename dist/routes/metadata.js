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
const express_1 = require("express");
const jsonwebtoken_1 = require("jsonwebtoken");
const env_1 = __importDefault(require("../env"));
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const AppleTree_1 = require("../model/entity/AppleTree");
const ConiferTree_1 = require("../model/entity/ConiferTree");
const PoplarTree_1 = require("../model/entity/PoplarTree");
const apiErrors_1 = require("../utils/error/apiErrors");
const uploadMetadata_1 = __importDefault(require("../utils/uploadMetadata"));
const router = (0, express_1.Router)();
router.post("/certificate", isAuth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        const data = (0, jsonwebtoken_1.verify)(token, env_1.default.jwtSecret);
        let type, quantity;
        let trees;
        let treeCount = 0;
        if (typeof data === "object") {
            type = data.type;
            quantity = data.quantity;
        }
        switch (type) {
            case "apple-tree":
                trees = yield AppleTree_1.AppleTree.find({ where: { sold: false } });
                treeCount = trees === null || trees === void 0 ? void 0 : trees.length;
                break;
            case "conifer-tree":
                trees = yield ConiferTree_1.ConiferTree.find({ where: { sold: false } });
                treeCount = trees === null || trees === void 0 ? void 0 : trees.length;
                break;
            case "poplar-tree":
                trees = yield PoplarTree_1.PoplarTree.find({ where: { sold: false } });
                treeCount = trees === null || trees === void 0 ? void 0 : trees.length;
                break;
            default:
                break;
        }
        if (treeCount < quantity) {
            return res.json({ message: "Trees out of stock!" });
        }
        trees = trees === null || trees === void 0 ? void 0 : trees.slice(0, parseInt(quantity));
        if (typeof trees === "object") {
            const metadata = yield (0, uploadMetadata_1.default)(type, trees);
            return res.json({ metadata });
        }
        return res.status(200).json({ trees, treeCount });
    }
    catch (error) {
        return next(new apiErrors_1.Api500Error(error.message));
    }
}));
router.post("/create-trees", isAuth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { count, latitude, longitude, country, state, type, lifeSpan, offsetCapacity } = req.body;
        for (let i = 1; i <= count; i++) {
            const data = {
                country,
                state,
                latitude,
                longitude,
                lifeSpan,
                offsetCapacity,
                sold: false,
                serialNumber: i,
            };
            switch (type) {
                case "apple-tree":
                    yield AppleTree_1.AppleTree.create(Object.assign({}, data)).save();
                    break;
                case "conifer-tree":
                    yield ConiferTree_1.ConiferTree.create(Object.assign({}, data)).save();
                    break;
                case "poplar-tree":
                    yield PoplarTree_1.PoplarTree.create(Object.assign({}, data)).save();
                    break;
                default:
                    break;
            }
        }
        return res.json({ message: "success" });
    }
    catch (error) {
        return next(new apiErrors_1.Api500Error(error.message));
    }
}));
//router.get("/:type", async (req, res, next) => {
//try {
//let trees;
//const { type } = req.params;
//switch (type) {
//case "apple-tree":
//trees = await AppleTree.find();
//break;
//case "conifer-tree":
//trees = await ConiferTree.find();
//break;
//case "poplar-tree":
//trees = await PoplarTree.find();
//break;
//default:
//break;
//}
//return res.json({ trees });
//} catch (error: any) {
//return next(new Api500Error(error.message))
//}
//})
router.get("/:type", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let trees;
        const { type } = req.params;
        const { count, treesSold } = req.query;
        const whereCondition = { sold: treesSold === "true" };
        switch (type) {
            case "apple-tree":
                trees = yield AppleTree_1.AppleTree.find({ where: whereCondition });
                break;
            case "conifer-tree":
                trees = yield ConiferTree_1.ConiferTree.find({ where: whereCondition });
                break;
            case "poplar-tree":
                trees = yield PoplarTree_1.PoplarTree.find({ where: whereCondition });
                break;
            default:
                break;
        }
        return res.json({ trees: count ? trees === null || trees === void 0 ? void 0 : trees.slice(0, parseInt(count.toString())) : trees });
    }
    catch (error) {
        return next(new apiErrors_1.Api500Error(error.message));
    }
}));
//router.put("/", async (req, res, next) => {
//try {
//const { token } = req.body;
//const data = verify(token, env.jwtSecret!)
//if (typeof data === "object") {
//const { id, type, minted, tokenId } = data;
//switch (type) {
//case "apple-tree":
//await AppleTree.update(id, { minted });
//break;
//case "conifer-tree":
//await ConiferTree.update(id, { minted });
//break;
//case "poplar-tree":
//await PoplarTree.update(id, { minted });
//break;
//default:
//break;
//}
//}
//return res.json({ message: "updated successfully" })
//} catch (error: any) {
//return next(new Api500Error(error.message))
//}
//})
router.delete("/", isAuth_1.default, (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield AppleTree_1.AppleTree.delete({});
        res.json({ msg: "success" });
    }
    catch (error) {
        return next(new apiErrors_1.Api500Error(error.message));
    }
}));
exports.default = router;
