import { Request, Response } from "express";
import {
  getLookupData,
  getSubcategoriesByCategory,
} from "../services/lookupService.js";

export async function getLookups(_req: Request, res: Response) {
  try {
    const lookupData = await getLookupData();
    return res.json(lookupData);
  } catch (error) {
    console.error("Lookup error:", error);
    return res.status(500).json({ message: "Unable to load lookup data." });
  }
}

export async function getSubcategories(req: Request, res: Response) {
  try {
    const categoryId = Number(req.query.categoryId ?? 0);
    const subcategories = await getSubcategoriesByCategory(categoryId);
    return res.json(subcategories);
  } catch (error) {
    console.error("Lookup error:", error);
    return res.status(500).json({ message: "Unable to load subcategories." });
  }
}
