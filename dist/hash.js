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
const jimp_1 = __importDefault(require("jimp"));
const jsonwebtoken_1 = require("jsonwebtoken");
function writeToCertificate() {
    return __awaiter(this, void 0, void 0, function* () {
        const image = yield jimp_1.default.read('./utils/images/certificate.png');
        const font = yield jimp_1.default.loadFont(jimp_1.default.FONT_SANS_32_BLACK);
        image.print(font, 150, 430, 'Jivin Vaidya');
        yield image.writeAsync('./utils/images/certificate-1.png');
    });
}
console.log((0, jsonwebtoken_1.sign)({
    tokenId: "1",
    id: "630234d9151190b5d1277cea"
}, "b90d04d4-dc62-47ee-bf05-98796ebbcd23"));
