import express from "express";
import * as productsController from "../controllers/productsController.js";

const router = express.Router();

router.get("/", productsController.getProducts);
router.post("/", productsController.saveProduct);
router.get("/:id/stock", productsController.getStock);
router.post("/:id/stock", productsController.updateStock);

export default router;
