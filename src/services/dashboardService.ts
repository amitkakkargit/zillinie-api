import { getDashboardStatusWise as fetchDashboardStatusWise } from "../repositories/dashboardRepository.js";

export async function getDashboardStatusWise(createdBy?: string) {
  return fetchDashboardStatusWise(createdBy);
}
