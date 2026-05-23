import { Router } from "express";
import * as measurementController from "../controllers/measurementsController.js";

const router = Router();

router.post("/", measurementController.saveMeasurement);
router.get("/list", measurementController.getMeasurementList);
router.get("/:orderNumber", measurementController.getMeasurementDetails);

export default router;
