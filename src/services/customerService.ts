import { fetchCustomerList } from "../repositories/customerRepository.js";

export async function getCustomerList() {
  return fetchCustomerList();
}
