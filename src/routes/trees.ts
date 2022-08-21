import { Router } from "express";
import { AppleTree } from "../model/entity/AppleTree";

const router = Router()

router.get("/:tokenId", async (req, res, next) => {
  try {
    const { tokenId } = req.params
    const { type } = req.query;
    let data;
    switch (type) {
      case "apple-tree":
        data = AppleTree.findOne({ where: { tokenId: parseInt(tokenId) }, select: { alive: true } });
        break;
      case "conifer-tree":
        data = AppleTree.findOneBy({ tokenId: parseInt(tokenId) });
        break;
      case "poplar-tree":
        data = AppleTree.findOneBy({ tokenId: parseInt(tokenId) });
        break;
      default:
        break;
    }

  } catch {

  }
})

export default router;
