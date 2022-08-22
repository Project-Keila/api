import { Router } from "express";
import { verify } from "jsonwebtoken";
import env from "../env";
import isAuth from "../middleware/isAuth";
import { AppleTree } from "../model/entity/AppleTree";
import { ConiferTree } from "../model/entity/ConiferTree";
import { PoplarTree } from "../model/entity/PoplarTree";
import { Api500Error } from "../utils/error/apiErrors";
import uploadMetadata from "../utils/uploadMetadata";

const router = Router();

router.post("/certificate", async (req, res, next) => {
  try {
    const { token } = req.body;
    const data = verify(token, env.jwtSecret!);
    let name, type, quantity;
    let trees;
    let treeCount = 0;
    if (typeof data === "object") {
      console.log(data)
      name = data.name;
      type = data.type;
      quantity = data.quantity;
    }

    switch (type) {
      case "apple-tree":
        trees = await AppleTree.find({ where: { sold: false } });
        treeCount = trees?.length;
        break;
      case "conifer-tree":
        trees = await ConiferTree.find({ where: { sold: false } });
        treeCount = trees?.length;
        break;
      case "poplar-tree":
        trees = await PoplarTree.find({ where: { sold: false } });
        treeCount = trees?.length;
        break;
      default:
        break;
    }

    if (treeCount < quantity) {
      return res.json({ message: "Trees out of stock!" })
    }
    trees = trees?.slice(0, parseInt(quantity));

    if (typeof trees === "object") {
      const metadata = await uploadMetadata(name, type, trees);
      return res.json({ metadata })
    }
    return res.status(200).json({ trees, treeCount });
  } catch (error: any) {
    return next(new Api500Error(error.message))
  }
})

router.post("/create-trees", isAuth, async (req, res, next) => {
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
      }
      switch (type) {
        case "apple-tree":
          await AppleTree.create({
            ...data,
          }).save();
          break;

        case "conifer-tree":
          await ConiferTree.create({
            ...data,
          }).save();
          break;

        case "poplar-tree":
          await PoplarTree.create({
            ...data,
          }).save();
          break;
        default:
          break;
      }
    }

    return res.json({ message: "success" })

  } catch (error: any) {
    return next(new Api500Error(error.message))

  }
})

router.get("/:type", async (req, res, next) => {
  try {
    let trees;
    const { type } = req.params;
    const { count, treesSold } = req.query;

    const whereCondition = { sold: treesSold === "true" }

    switch (type) {
      case "apple-tree":
        trees = await AppleTree.find({ where: whereCondition })
        break;
      case "conifer-tree":
        trees = await ConiferTree.find({ where: whereCondition });
        break;
      case "poplar-tree":
        trees = await PoplarTree.find({ where: whereCondition });
        break;
      default:
        break;
    }
    return res.json({ trees: count ? trees?.slice(0, parseInt(count.toString())) : trees });

  } catch (error: any) {
    return next(new Api500Error(error.message))
  }
})

router.delete("/", isAuth, async (_req, res, next) => {
  try {
    await AppleTree.delete({});
    res.json({ msg: "success" })
  } catch (error: any) {
    return next(new Api500Error(error.message))
  }
})

export default router;
