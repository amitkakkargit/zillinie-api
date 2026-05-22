import express from "express";
import * as statusController from "../controllers/statusController.js";

const router = express.Router();

router.get("/", statusController.getStatus);
router.post("/", statusController.saveStatus);

export default router;
