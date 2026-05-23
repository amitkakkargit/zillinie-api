import { Router } from "express";
import multer from "multer";
import path from "path";
import { extractMeasurements } from "../controllers/ocrController.js";

const upload = multer({ dest: path.join(process.cwd(), "uploads") });

const router = Router();
router.post("/extract-measurements", upload.single("image"), extractMeasurements);

export default router;
