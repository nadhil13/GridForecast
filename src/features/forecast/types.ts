/* ============================================================
   Forecast Feature — Shared Types
   ============================================================ */

/** A single data point for the electricity production chart */
export interface ForecastDataPoint {
  tahun: number;
  produksi_twh: number;
  /** Whether this data point is a predicted (future) value */
  isPrediction?: boolean;
  /** Confidence interval lower bound (predicted points only) */
  lowerBound?: number;
  /** Confidence interval upper bound (predicted points only) */
  upperBound?: number;
}

/** Status of the prediction fetch operation */
export type PredictionStatus = "idle" | "loading" | "success" | "error";

/** Available ML model engines */
export type ModelType = "linear-regression" | "svr";

export const MODEL_LABELS: Record<ModelType, string> = {
  "linear-regression": "Linear Regression (Baseline)",
  "svr": "Support Vector Regression (Optimized)",
} as const;


/** Grid emission factor — Mt CO₂ per TWh (Indonesian average) */
export const GRID_EMISSION_FACTOR = 0.75;

/** Confidence interval margin (±5%) */
export const CONFIDENCE_MARGIN = 0.05;

/** Historical electricity production records (mock baseline) */
export const HISTORICAL_DATA: ForecastDataPoint[] = [
  { tahun: 2020, produksi_twh: 275 },
  { tahun: 2021, produksi_twh: 285 },
  { tahun: 2022, produksi_twh: 300 },
  { tahun: 2023, produksi_twh: 315 },
  { tahun: 2024, produksi_twh: 330 },
];
