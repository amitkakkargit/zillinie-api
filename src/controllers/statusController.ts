import { Request, Response } from "express";
import * as statusService from "../services/statusService.js";

export async function getStatus(req: Request, res: Response) {
  const orderNumber = String(req.query.orderNumber || "");
  const status = await statusService.getStatus(orderNumber);
  res.json(status);
}

export async function saveStatus(req: Request, res: Response) {
  const updated = await statusService.updateStatus(req.body);
  res.json(updated);
}
