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
const Certificate_1 = require("../model/entity/Certificate");
const apiErrors_1 = require("../utils/error/apiErrors");
const router = (0, express_1.Router)();
router.get("/", (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const certificates = yield Certificate_1.Certificate.find();
        return res.json({ certificates });
    }
    catch (error) {
        return next(new apiErrors_1.Api500Error(error.message));
    }
}));
router.get("/:tokenId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tokenId;
        tokenId = req.params.tokenId;
        tokenId = parseInt(tokenId);
        const certificate = yield Certificate_1.Certificate.findOneBy({ tokenId });
        return res.json({ tokenId: certificate === null || certificate === void 0 ? void 0 : certificate.tokenId, offsetCapacity: certificate === null || certificate === void 0 ? void 0 : certificate.totalOffsetCapacity });
    }
    catch (error) {
        return next(new apiErrors_1.Api500Error(error.message));
    }
}));
router.put("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        const data = (0, jsonwebtoken_1.verify)(token, env_1.default.jwtSecret);
        if (typeof data === "object") {
            const { tokenId, id } = data;
            yield Certificate_1.Certificate.update(id, { tokenId: parseInt(tokenId) });
        }
        return res.json({ message: "Success" });
    }
    catch (error) {
        return next(new apiErrors_1.Api500Error(error.message));
    }
}));
exports.default = router;
