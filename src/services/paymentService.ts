import * as paymentRepo from "../repositories/paymentRepository.js";

export async function getPayments(orderId: number) {
  return paymentRepo.getPaymentsByOrder(orderId);
}

export async function savePayment(data: {
  orderId: number;
  amountPaid: number;
}) {
  return paymentRepo.savePayment(data.orderId, data.amountPaid);
}
