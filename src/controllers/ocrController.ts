import { Request, Response } from "express";
import { extractMeasurementsFromImage } from "../services/ocrService.js";
import path from "path";
import fs from "fs";

export async function extractMeasurements(req: Request, res: Response) {
  const file = (req as any).file as Express.Multer.File | undefined;

  if (!file) {
    return res.status(400).json({ message: "No image file uploaded." });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/bmp", "image/tiff", "image/gif"];
  if (!allowedTypes.includes(file.mimetype)) {
    fs.unlinkSync(file.path);
    return res.status(400).json({ message: "Invalid file type. Only JPG, PNG, BMP, TIFF and GIF are allowed." });
  }

  if (file.size > 5 * 1024 * 1024) {
    fs.unlinkSync(file.path);
    return res.status(400).json({ message: "File size exceeds 5 MB limit." });
  }

  try {
    const measurements = await extractMeasurementsFromImage(file.path);
    return res.json({ measurements });
  } catch (error) {
    console.error("OCR error:", error);
    return res.status(500).json({ message: "Failed to extract measurements from image." });
  } finally {
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
  }
}
