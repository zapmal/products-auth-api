import {
  Router
} from "express";
import { verify } from "jsonwebtoken";
import * as userController from "../controllers/userController";
import { authJwt, verifySignup } from "../middlewares";

const router = Router();

router.post("/", [
  authJwt.verifyToken, 
  authJwt.isAdmin,
  verifySignup.checkRolesExists
], userController.createUser);

export default router;