import * as staffRepo from "../repositories/staffRepository.js";

export async function listStaff() {
  return staffRepo.getStaffList();
}

export async function saveStaff(data: any) {
  return staffRepo.saveStaffDetails(data);
}
