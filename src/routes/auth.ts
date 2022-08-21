import { Router } from "express";
import { Admin } from "../model/entity/Auth"
import bcrypt from "bcrypt";
import { Api500Error } from "../utils/error/apiErrors";

const router = Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.json({ message: "Invalid email address" });
    }
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.json({ message: "passwords do not match" })
    }

    req.session.admin = admin;

    return res.json({ message: "Login Successful!" })

  } catch (error: any) {
    return next(new Api500Error(error.message))
  }
})

router.post("/logout", (req, res) => {
  req.session.destroy(() => { });
  return res.json({ message: "logged out" })
})

export default router;
