import * as statusRepo from "../repositories/statusRepository.js";

export async function getStatus(orderNumber = "") {
  return statusRepo.getProductStatus(orderNumber);
}

export async function updateStatus(data: any) {
  return statusRepo.updateProductStatus(data);
}
