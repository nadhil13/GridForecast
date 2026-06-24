import { siteConfig } from "@/config/site";

/* ============================================================
   API Types — mirrors the FastAPI backend schemas
   ============================================================ */

/** Request payload for electricity demand prediction */
export interface PredictionRequest {
  tahun: number;
}

/** Response from the prediction endpoint */
export interface PredictionResponse {
  tahun: number;
  estimasi_produksi_twh: number;
}

/** Generic API error shape */
export interface ApiError {
  detail: string;
}

/* ============================================================
   Fetcher utilities
   ============================================================ */

const BASE_URL = siteConfig.api.baseUrl;

/**
 * Type-safe POST request to the prediction endpoint.
 * (Now mathematically computed locally to run 100% free without a backend server).
 */
export async function fetchPrediction(
  data: PredictionRequest
): Promise<PredictionResponse> {
  // Simulasikan delay network agar UI loading state tetap terasa natural
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Menghitung prediksi secara lokal menggunakan rumus regresi linear dari model_forecasting_listrik.pkl
  // Coef: 8.89565585112206
  // Intercept: -17692.938055580187
  const calculated_prediction = (data.tahun * 8.89565585112206) - 17692.938055580187;

  return {
    tahun: data.tahun,
    estimasi_produksi_twh: Number(calculated_prediction.toFixed(2)),
  };
}

/**
 * Health-check — verifies the API is reachable.
 * (Always true since we are serverless now).
 */
export async function checkApiHealth(): Promise<boolean> {
  return true;
}
