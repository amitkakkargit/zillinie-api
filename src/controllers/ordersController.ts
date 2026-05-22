import { Request, Response } from "express";
import * as orderService from "../services/orderService.js";

export async function getOrders(req: Request, res: Response) {
  const searchTerm = String(req.query.search || "");
  const orders = await orderService.listOrders(searchTerm);
  res.json(orders);
}

export async function getOrder(req: Request, res: Response) {
  const orderNumber = String(req.params.orderNumber);
  const order = await orderService.getOrder(orderNumber);
  res.json(order);
}
