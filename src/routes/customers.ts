import { Router } from "express";
import { getCustomerList } from "../controllers/customersController.js";

const router = Router();
router.get("/", getCustomerList);

export default router;
