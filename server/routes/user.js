import express from "express";
const router = express.Router();

import {
  editAccount,
  getAccountDetails,
  signin,
  signup,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/editAccount", auth, editAccount);
router.get("/account/:email", getAccountDetails)

export default router;
