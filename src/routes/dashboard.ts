import { Router } from "express";
import { dashboardSummary } from "../controllers/dashboardController.js";

const router = Router();
router.get("/summary", dashboardSummary);

export default router;
