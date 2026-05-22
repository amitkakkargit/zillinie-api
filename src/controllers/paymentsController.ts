import { Request, Response } from "express";
import * as paymentService from "../services/paymentService.js";

export async function getPayments(req: Request, res: Response) {
  const orderId = Number(req.query.orderId ?? 0);
  const payments = await paymentService.getPayments(orderId);
  res.json(payments);
}

export async function savePayment(req: Request, res: Response) {
  const saved = await paymentService.savePayment(req.body);
  res.json(saved);
}
