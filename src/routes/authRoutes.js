import {
  Router
} from "express";
import * as authController from "../controllers/authController";
import { verifySignup } from "../middlewares";

const router = Router();

router.post("/login", authController.login);
router.post("/signup", [
  verifySignup.checkDuplicatedUser,
  verifySignup.checkRolesExists
], authController.signup);

export default router;