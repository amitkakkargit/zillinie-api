import * as productRepo from "../repositories/productRepository.js";

export async function listProducts() {
  return productRepo.getProducts();
}

export async function createProduct(data: any) {
  return productRepo.saveProduct(data);
}

export async function getProductStock(productId: number) {
  return productRepo.getStockDetails(productId);
}

export async function useProductStock(data: any) {
  return productRepo.deductStock(data);
}

export async function fetchProductHistory(productId: string) {
  return productRepo.getProductHistory(productId);
}

export async function fetchProductsByOrderNumber(orderNumber: string) {
  return productRepo.getProductListByOrderNumber(orderNumber);
}

export async function fetchProductByQRCode(qrCode: string) {
  return productRepo.getProductByQRCode(qrCode);
}

export async function adjustStockQuantity(data: {
  ProductId: number;
  Quantity: number;
  TransactionType: string;
  Remarks: string;
  CreatedBy: string;
}) {
  return productRepo.updateStockQuantity(data);
}
