import Jimp from "jimp";
import { sign } from "jsonwebtoken";
import env from "./env";

async function writeToCertificate() {
  const image = await Jimp.read('./utils/images/certificate.png');
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
  image.print(font, 150, 430, 'Jivin Vaidya');
  await image.writeAsync('./utils/images/certificate-1.png');
}

console.log(sign({
  tokenId: "1",
  id: "630234d9151190b5d1277cea"
}, "b90d04d4-dc62-47ee-bf05-98796ebbcd23"))

