import express from "express";
import * as paymentsController from "../controllers/paymentsController.js";

const router = express.Router();

router.get("/", paymentsController.getPayments);
router.post("/", paymentsController.savePayment);

export default router;
