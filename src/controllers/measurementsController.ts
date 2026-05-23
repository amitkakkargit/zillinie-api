import { Request, Response } from "express";
import * as measurementService from "../services/measurementService.js";

export async function saveMeasurement(req: Request, res: Response) {
  try {
    const saved = await measurementService.saveMeasurement(req.body);
    res.json(saved);
  } catch (error) {
    console.error("Failed to save measurement", error);
    res.status(500).json({ error: "Failed to save measurement data." });
  }
}

export async function getMeasurementDetails(req: Request, res: Response) {
  try {
    const orderNumber = String(req.params.orderNumber || "");
    const details = await measurementService.getMeasurementDetails(orderNumber);
    res.json(details);
  } catch (error) {
    console.error("Failed to fetch measurement details", error);
    res.status(500).json({ error: "Failed to fetch measurement details." });
  }
}

export async function getMeasurementList(_req: Request, res: Response) {
  try {
    const list = await measurementService.getMeasurementList();
    res.json(list);
  } catch (error) {
    console.error("Failed to fetch measurement list", error);
    res.status(500).json({ error: "Failed to fetch measurement list." });
  }
}
