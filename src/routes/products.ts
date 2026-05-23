import express from "express";
import * as productsController from "../controllers/productsController.js";

const router = express.Router();

router.get("/", productsController.getProducts);
router.post("/", productsController.saveProduct);
router.get("/qr/:code", productsController.getProductByQR);
router.get("/by-order/:orderNumber", productsController.getProductsByOrderNumber);
router.get("/:id/stock", productsController.getStock);
router.post("/:id/stock", productsController.updateStock);
router.put("/:id/stock-quantity", productsController.updateStockQuantity);
router.get("/:id/history", productsController.getProductHistory);

export default router;
