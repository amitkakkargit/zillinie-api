import * as orderRepo from "../repositories/orderRepository.js";

export async function listOrders(searchTerm = "") {
  return orderRepo.getOrderList(searchTerm);
}

export async function getOrder(orderNumber: string) {
  return orderRepo.getOrderByNumber(orderNumber);
}
