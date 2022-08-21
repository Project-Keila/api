import { Router } from "express";
import { verify } from "jsonwebtoken";
import env from "../env";
import { Certificate } from "../model/entity/Certificate";
import { Api500Error } from "../utils/error/apiErrors";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {

    const certificates = await Certificate.find();

    return res.json({ certificates });

  } catch (error: any) {
    return next(new Api500Error(error.message));
  }
})

router.get("/:tokenId", async (req, res, next) => {
  try {
    let tokenId;
    tokenId = req.params.tokenId;
    tokenId = parseInt(tokenId);

    const certificate = await Certificate.findOneBy({ tokenId });

    return res.json({ tokenId: certificate?.tokenId, offsetCapacity: certificate?.totalOffsetCapacity });

  } catch (error: any) {
    return next(new Api500Error(error.message));
  }
})

router.put("/", async (req, res, next) => {
  try {

    const { token } = req.body;
    const data = verify(token, env.jwtSecret!)

    if (typeof data === "object") {
      const { tokenId, id } = data;
      await Certificate.update(id, { tokenId: parseInt(tokenId) })
    }

    return res.json({ message: "Success" });

  } catch (error: any) {
    return next(new Api500Error(error.message));
  }

})

export default router;
