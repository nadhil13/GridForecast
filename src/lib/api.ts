import { siteConfig } from "@/config/site";

/* ============================================================
   API Types — mirrors the FastAPI backend schemas
   ============================================================ */

/** Request payload for electricity demand prediction */
export interface PredictionRequest {
  tahun: number;
  modelType?: "linear-regression" | "svr";
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

  let calculated_prediction = 0;

  if (data.modelType === "svr") {
    // SVR (Linear Kernel) - Concrete logic derived from train_model.py
    // Coef: 8.815752006834373
    // Intercept: -17534.440823004843
    calculated_prediction = (data.tahun * 8.815752006834373) - 17534.440823004843;
  } else {
    // Linear Regression (Baseline) - Dari model_forecasting_listrik.pkl terbaru
    // Coef: 8.82577033503853
    // Intercept: -17553.34103887838
    calculated_prediction = (data.tahun * 8.82577033503853) - 17553.34103887838;
  }

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
