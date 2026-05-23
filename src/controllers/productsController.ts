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

export async function getProductHistory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const history = await productService.fetchProductHistory(id);
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch product history." });
  }
}

export async function getProductsByOrderNumber(req: Request, res: Response) {
  try {
    const { orderNumber } = req.params;
    const products = await productService.fetchProductsByOrderNumber(orderNumber);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch products for order." });
  }
}

export async function getProductByQR(req: Request, res: Response) {
  try {
    const { code } = req.params;
    const product = await productService.fetchProductByQRCode(code);
    if (!product) return res.status(404).json({ message: "Product not found." });
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: "Unable to fetch product by QR code." });
  }
}

export async function updateStockQuantity(req: Request, res: Response) {
  try {
    const productId = Number(req.params.id);
    const { Quantity, TransactionType, Remarks, CreatedBy } = req.body;
    await productService.adjustStockQuantity({ ProductId: productId, Quantity, TransactionType, Remarks, CreatedBy });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Unable to update stock quantity." });
  }
}
