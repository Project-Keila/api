import fs from 'fs';
import { NFTStorage, File } from 'nft.storage'
import path from 'path'
import mime from 'mime';
import env from '../env';
import { AppleTree } from '../model/entity/AppleTree';
import { ConiferTree } from '../model/entity/ConiferTree';
import { PoplarTree } from '../model/entity/PoplarTree';
import Jimp from 'jimp';
import { Certificate } from '../model/entity/Certificate';
import { off } from 'process';

const API_KEY = env.nftApiKey;

async function writeToCertificate(name: string, number: number, location: string, offsetCapacity: number) {
  const image = await Jimp.read(`${__dirname}/images/certificate.png`);
  const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
  const fontSmall = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
  image.print(font, 115, 400, name);
  image.print(fontSmall, 147, 507, number);
  image.print(fontSmall, 350, 507, location);
  image.print(fontSmall, 250, 530, `${offsetCapacity}kgs`);
  await image.writeAsync(`${__dirname}/images/certificate-1.png`);
}

async function fileFromPath(filePath: string) {
  const content = await fs.promises.readFile(`${__dirname}/images/certificate-1.png`)
  const type = mime.getType(filePath)
  return new File([content], path.basename("keila-certificate"), { type: type! })
}


async function uploadMetadata(name: string, filePath: string, trees: AppleTree[] | ConiferTree[] | PoplarTree[]) {
  try {
    const offsetCapacity = trees[0].offsetCapacity * trees.length;
    await writeToCertificate(name, trees.length, "Kashmir, India", offsetCapacity)

    const image = await fileFromPath(filePath)

    const nft = {
      image, // use image Blob as `image` field
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
          "value": `${offsetCapacity} kgs carbon per year`,
        },
      ],
    }

    const client = new NFTStorage({ token: API_KEY! })
    const metadata = await client.store(nft)

    await Certificate.create({
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
    }).save()

    await Promise.all(trees.map(async (tree) => {
      switch (filePath) {
        case "apple-tree":
          await AppleTree.update(tree.id, { sold: true });
          break;
        case "conifer-tree":
          await ConiferTree.update(tree.id, { sold: true });
          break;
        case "poplar-tree":
          await PoplarTree.update(tree.id, { sold: true });
          break;
        default:
          break;
      }
    }));
    return metadata.url;
  } catch (error: any) {
    throw new Error(error)

  }
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

export default uploadMetadata;
