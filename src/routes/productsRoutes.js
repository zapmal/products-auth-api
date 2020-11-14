import {
  Router
} from "express";
import * as productsController from "../controllers/productsController";

const router = Router();

router.post("/", productsController.createProduct);
router.get("/", productsController.getProducts);
router.get("/:id", productsController.getProduct);
router.put("/:id", productsController.updateProduct);
router.delete("/:id", productsController.deleteProduct);

export default router;