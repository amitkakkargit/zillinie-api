import { createWorker } from "tesseract.js";

const MEASUREMENT_KEYS = ["Shoulders", "Chest", "Waist", "Hips", "Calf"];

function parseMeasurements(text: string): Record<string, string> {
  const measurements: Record<string, string> = {};
  const lines = text.split(/[\n\r]+/).filter(Boolean);

  for (const line of lines) {
    for (const key of MEASUREMENT_KEYS) {
      if (line.toLowerCase().includes(key.toLowerCase())) {
        const parts = line.split(":");
        if (parts.length > 1) {
          measurements[key] = parts[1].trim();
        }
      }
    }
  }

  return measurements;
}

export async function extractMeasurementsFromImage(imagePath: string): Promise<Record<string, string>> {
  const worker = await createWorker("eng");
  try {
    const { data } = await worker.recognize(imagePath);
    return parseMeasurements(data.text);
  } finally {
    await worker.terminate();
  }
}
