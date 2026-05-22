import express from "express";
import * as ordersController from "../controllers/ordersController.js";

const router = express.Router();

router.get("/", ordersController.getOrders);
router.get("/:orderNumber", ordersController.getOrder);

export default router;
