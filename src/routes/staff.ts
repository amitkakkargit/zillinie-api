import express from "express";
import * as staffController from "../controllers/staffController.js";

const router = express.Router();

router.get("/", staffController.getStaff);
router.post("/", staffController.saveStaff);

export default router;
