import { Router } from "express";
import * as measurementController from "../controllers/measurementsController.js";

const router = Router();

router.post("/", measurementController.saveMeasurement);
router.get("/:orderNumber", measurementController.getMeasurementDetails);
router.get("/list", measurementController.getMeasurementList);

export default router;
