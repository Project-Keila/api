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
const fs_1 = __importDefault(require("fs"));
const nft_storage_1 = require("nft.storage");
const path_1 = __importDefault(require("path"));
const mime_1 = __importDefault(require("mime"));
const env_1 = __importDefault(require("../env"));
const AppleTree_1 = require("../model/entity/AppleTree");
const ConiferTree_1 = require("../model/entity/ConiferTree");
const PoplarTree_1 = require("../model/entity/PoplarTree");
const jimp_1 = __importDefault(require("jimp"));
const Certificate_1 = require("../model/entity/Certificate");
const API_KEY = env_1.default.nftApiKey;
function writeToCertificate() {
    return __awaiter(this, void 0, void 0, function* () {
        const image = yield jimp_1.default.read(`${__dirname}/images/certificate.png`);
        const font = yield jimp_1.default.loadFont(jimp_1.default.FONT_SANS_32_BLACK);
        image.print(font, 10, 350, 'Jivin Vaidya');
        yield image.writeAsync('./images/certificate-1.png');
    });
}
function fileFromPath(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = yield fs_1.default.promises.readFile(`${__dirname}/images/certificate.png`);
        const type = mime_1.default.getType(filePath);
        return new nft_storage_1.File([content], path_1.default.basename(filePath), { type: type });
    });
}
//const formatFilePath = (filePath: string) => {
//return filePath.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
//}
function uploadMetadata(filePath, trees) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield writeToCertificate();
            const image = yield fileFromPath(filePath);
            //const name = formatFilePath(filePath);
            const nft = {
                image,
                name: `Project Keila Carbon Offset Certificate`,
                description: "The first living NFT that's a digital twin to a real life tree!",
                external_url: "https://projectkeila.com",
                attributes: [
                    {
                        "trait_type": "number_of_trees",
                        "value": `${trees.length}`
                    },
                    {
                        "trait_type": "starting_tree_number",
                        "value": `${trees[0].serialNumber}`
                    },
                    {
                        "trait_type": "ending_tree_number",
                        "value": `${trees[trees.length - 1].serialNumber}`,
                    },
                    {
                        "trait_type": "latitude",
                        "value": trees[0].latitude
                    },
                    {
                        "trait_type": "longitude",
                        "value": trees[0].longitude
                    },
                    {
                        "trait_type": "life_span",
                        "value": trees[0].lifeSpan,
                    },
                    {
                        "trait_type": "initial_offset_capacity",
                        "value": `${trees[0].offsetCapacity * trees.length} kgs carbon per year`,
                    },
                ],
            };
            const client = new nft_storage_1.NFTStorage({ token: API_KEY });
            const metadata = yield client.store(nft);
            yield Certificate_1.Certificate.create({
                country: trees[0].country,
                state: trees[0].state,
                numTrees: trees.length,
                latitude: trees[0].latitude,
                longitude: trees[0].longitude,
                treeStart: trees[0].serialNumber,
                treeEnd: trees[trees.length - 1].serialNumber,
                createdAt: Math.floor(new Date().getTime() / 1000),
                metadata: metadata.url,
                totalOffsetCapacity: trees[0].offsetCapacity * trees.length,
            }).save();
            yield Promise.all(trees.map((tree) => __awaiter(this, void 0, void 0, function* () {
                switch (filePath) {
                    case "apple-tree":
                        yield AppleTree_1.AppleTree.update(tree.id, { sold: true });
                        break;
                    case "conifer-tree":
                        yield ConiferTree_1.ConiferTree.update(tree.id, { sold: true });
                        break;
                    case "poplar-tree":
                        yield PoplarTree_1.PoplarTree.update(tree.id, { sold: true });
                        break;
                    default:
                        break;
                }
            })));
            return metadata.url;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
//async function uploadMetadata(filePath: string, tree: AppleTree | ConiferTree | PoplarTree, idx: number) {
//try {
//const image = await fileFromPath(filePath)
//const name = formatFilePath(filePath);
//const nft = {
//image, // use image Blob as `image` field
//name: `${name} #${idx}`,
//description: "The first living NFT that's a digital twin to a real life tree!",
//external_url: "https://projectkeila.com",
//attributes: [
//{
//"trait_type": "row",
//"value": tree.row,
//},
//{
//"trait_type": "column",
//"value": tree.column,
//},
//{
//"trait_type": "latitude",
//"value": tree.latitude
//},
//{
//"trait_type": "longitude",
//"value": tree.longitude
//},
//{
//"trait_type": "life span",
//"value": tree.lifeSpan,
//},
//{
//"trait_type": "offset capacity",
//"value": tree.offsetCapacity,
//},
//],
//}
//const client = new NFTStorage({ token: API_KEY! })
//const metadata = await client.store(nft)
//console.log('NFT data stored!', metadata)
//return metadata.url;
//} catch (error: any) {
//throw new Error(error)
//}
//}
exports.default = uploadMetadata;
