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
 * Throws on non-OK responses with a descriptive message.
 */
export async function fetchPrediction(
  data: PredictionRequest
): Promise<PredictionResponse> {
  const res = await fetch(
    `${BASE_URL}${siteConfig.api.endpoints.predict}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    const error: ApiError = await res.json().catch(() => ({
      detail: "An unexpected error occurred.",
    }));
    throw new Error(error.detail);
  }

  return res.json() as Promise<PredictionResponse>;
}

/**
 * Health-check — verifies the API is reachable.
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const res = await fetch(BASE_URL, { method: "GET" });
    return res.ok;
  } catch {
    return false;
  }
}
