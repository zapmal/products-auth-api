import {
  Router
} from "express";
import * as productsController from "../controllers/productsController";
import { authJwt } from "../middlewares/index";

const router = Router();

router.post("/", [authJwt.verifyToken, authJwt.isAdmin], productsController.createProduct);

router.get("/", productsController.getProducts);

router.get("/:id", productsController.getProduct);

router.put("/:id", [authJwt.verifyToken, authJwt.isModerator], productsController.updateProduct);

router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], productsController.deleteProduct);

export default router;