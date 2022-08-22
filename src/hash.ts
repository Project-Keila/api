import Jimp from "jimp";
import { sign } from "jsonwebtoken";
//import env from "./env";

async function writeToCertificate() {
  const image = await Jimp.read('./utils/images/certificate.png');
  const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
  const fontSmall = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
  image.print(font, 115, 400, 'Jivin Vaidya');
  image.print(fontSmall, 147, 507, '10');
  image.print(fontSmall, 350, 507, 'Kashmir, India');
  image.print(fontSmall, 250, 530, '140kgs');
  await image.writeAsync('./utils/images/certificate-1.png');
}
writeToCertificate();

console.log(sign({
  name: "John Doe",
  type: "apple-tree",
  quantity: 10
}, "b90d04d4-dc62-47ee-bf05-98796ebbcd23"))

