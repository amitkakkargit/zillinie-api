import { Router } from "express";
import {
  getLookups,
  getSubcategories,
} from "../controllers/lookupController.js";

const router = Router();
router.get("/", getLookups);
router.get("/subcategories", getSubcategories);

export default router;
