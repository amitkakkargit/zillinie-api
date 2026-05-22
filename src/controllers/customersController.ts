import { Request, Response } from "express";
import { getCustomerList as fetchCustomerList } from "../services/customerService.js";

export async function getCustomerList(_req: Request, res: Response) {
  try {
    const customers = await fetchCustomerList();
    return res.json(customers);
  } catch (error) {
    console.error("Customer list error:", error);
    return res
      .status(500)
      .json({ message: "Could not load customers.", error: String(error) });
  }
}
