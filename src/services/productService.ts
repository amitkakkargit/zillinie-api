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
