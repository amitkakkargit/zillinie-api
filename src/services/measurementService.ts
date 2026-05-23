import * as measurementRepo from "../repositories/measurementRepository.js";
import type { MeasurementData } from "../repositories/measurementRepository.js";

export async function saveMeasurement(data: MeasurementData) {
  return measurementRepo.saveMeasurement(data);
}

export async function getMeasurementDetails(orderNumber: string) {
  return measurementRepo.fetchMeasurementDetails(orderNumber);
}

export async function getMeasurementList() {
  return measurementRepo.fetchMeasurementList();
}
