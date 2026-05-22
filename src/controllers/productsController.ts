import { Request, Response } from "express";
import * as productService from "../services/productService.js";

export async function getProducts(_req: Request, res: Response) {
  const products = await productService.listProducts();
  res.json(products);
}

export async function saveProduct(req: Request, res: Response) {
  const saved = await productService.createProduct(req.body);
  res.json(saved);
}

export async function getStock(req: Request, res: Response) {
  const productId = Number(req.params.id);
  const stock = await productService.getProductStock(productId);
  res.json(stock);
}

export async function updateStock(req: Request, res: Response) {
  const result = await productService.useProductStock(req.body);
  res.json(result);
}
