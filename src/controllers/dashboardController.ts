import { Request, Response } from "express";
import { getDashboardStatusWise } from "../services/dashboardService.js";

export async function dashboardSummary(req: Request, res: Response) {
  try {
    const user = req.query.user as string | undefined;
    const payload = await getDashboardStatusWise(user);
    return res.json(payload);
  } catch (error) {
    console.error("Dashboard error:", error);
    return res.status(500).json({ message: "Unable to load dashboard data." });
  }
}
