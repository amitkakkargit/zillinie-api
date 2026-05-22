import { Request, Response } from "express";
import * as staffService from "../services/staffService.js";

export async function getStaff(_req: Request, res: Response) {
  const staff = await staffService.listStaff();
  res.json(staff);
}

export async function saveStaff(req: Request, res: Response) {
  const saved = await staffService.saveStaff(req.body);
  res.json(saved);
}
