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
const Auth_1 = require("../model/entity/Auth");
const bcrypt_1 = __importDefault(require("bcrypt"));
const apiErrors_1 = require("../utils/error/apiErrors");
const router = (0, express_1.Router)();
router.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const admin = yield Auth_1.Admin.findOne({ where: { email } });
        if (!admin) {
            return res.json({ message: "Invalid email address" });
        }
        const isValidPassword = yield bcrypt_1.default.compare(password, admin.password);
        if (!isValidPassword) {
            return res.json({ message: "passwords do not match" });
        }
        req.session.admin = admin;
        return res.json({ message: "Login Successful!" });
    }
    catch (error) {
        return next(new apiErrors_1.Api500Error(error.message));
    }
}));
router.post("/logout", (req, res) => {
    req.session.destroy(() => { });
    return res.json({ message: "logged out" });
});
exports.default = router;
