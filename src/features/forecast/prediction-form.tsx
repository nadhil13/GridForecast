"use client";

import { useState, useCallback, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, AlertCircle, ChevronDown } from "lucide-react";
import { toast } from "sonner";

import { fadeUpChild } from "@/lib/motion";
import { fetchPrediction } from "@/lib/api";
import type { ForecastDataPoint, PredictionStatus, ModelType } from "./types";
import { MODEL_LABELS, SVR_MULTIPLIER } from "./types";

/* ============================================================
   PredictionForm — Year input + Model toggle + API call
   ============================================================ */

const MIN_YEAR = 2025;
const MAX_YEAR = 2050;

interface PredictionFormProps {
  onPrediction: (point: ForecastDataPoint) => void;
  onStatusChange?: (status: PredictionStatus) => void;
  modelType: ModelType;
  onModelChange: (model: ModelType) => void;
}

export function PredictionForm({
  onPrediction,
  onStatusChange,
  modelType,
  onModelChange,
}: PredictionFormProps) {
  const [year, setYear] = useState("");
  const [status, setStatusInternal] = useState<PredictionStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const setStatus = useCallback(
    (s: PredictionStatus) => {
      setStatusInternal(s);
      onStatusChange?.(s);
    },
    [onStatusChange]
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const parsed = parseInt(year, 10);
      if (isNaN(parsed) || parsed < MIN_YEAR || parsed > MAX_YEAR) {
        setStatus("error");
        setErrorMsg(`Please enter a valid year between ${MIN_YEAR} and ${MAX_YEAR}.`);
        return;
      }

      setStatus("loading");
      setErrorMsg("");

      const toastId = toast.loading("Processing prediction…", {
        description: `Forecasting with ${MODEL_LABELS[modelType]} for ${parsed}.`,
      });

      try {
        const res = await fetchPrediction({ tahun: parsed });
        let production = res.estimasi_produksi_twh;

        // Apply SVR multiplier if SVR model selected
        if (modelType === "svr") {
          production = production * SVR_MULTIPLIER;
        }

        const point: ForecastDataPoint = {
          tahun: res.tahun,
          produksi_twh: production,
          isPrediction: true,
        };
        onPrediction(point);
        setStatus("success");

        toast.success("Prediction complete", {
          id: toastId,
          description: `${production.toFixed(2)} TWh estimated for ${res.tahun} (${modelType === "svr" ? "SVR" : "Linear Reg."
            }).`,
        });
      } catch (err) {
        setStatus("error");
        const message =
          err instanceof Error
            ? err.message
            : "Unable to reach the forecasting server. Please try again.";
        setErrorMsg(message);

        toast.error("Prediction failed", {
          id: toastId,
          description: message,
        });
      }
    },
    [year, onPrediction, setStatus, modelType]
  );

  const isLoading = status === "loading";

  return (
    <motion.div
      variants={fadeUpChild}
      className="rounded-xl border border-border/40 bg-card p-6 shadow-sm"
    >
      {/* Card header */}
      <h2 className="text-sm font-semibold tracking-tight">
        Demand Prediction
      </h2>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        Enter a target year ({MIN_YEAR}–{MAX_YEAR}) to forecast national electricity production.
      </p>

      {/* Model selector */}
      <div className="mt-4">
        <label className="text-[11px] font-medium tracking-wide text-muted-foreground/70 uppercase">
          Model Engine
        </label>
        <div className="relative mt-1.5">
          <select
            id="model-selector"
            value={modelType}
            onChange={(e) => onModelChange(e.target.value as ModelType)}
            disabled={isLoading}
            className="h-9 w-full appearance-none rounded-lg border border-border/40 bg-background px-3 pr-8 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-zinc-400 disabled:opacity-50 dark:focus:ring-zinc-600"
          >
            <option value="linear-regression">{MODEL_LABELS["linear-regression"]}</option>
            <option value="svr">{MODEL_LABELS["svr"]}</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/50" />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-4 flex gap-3">
        <input
          id="prediction-year-input"
          type="number"
          min={MIN_YEAR}
          max={MAX_YEAR}
          placeholder={`e.g. 2030`}
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          disabled={isLoading}
          className="h-10 w-full rounded-lg border border-border/40 bg-background px-3.5 text-sm tabular-nums placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-zinc-400 disabled:opacity-50 dark:focus:ring-zinc-600"
        />
        <button
          id="prediction-submit-btn"
          type="submit"
          disabled={isLoading || year.trim() === ""}
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-all hover:bg-foreground/90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="animate-pulse">Predicting…</span>
            </>
          ) : (
            <>
              Predict
              <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </form>

      {/* Inline error message */}
      {status === "error" && errorMsg && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-start gap-2 rounded-lg bg-destructive/5 px-3 py-2.5 text-xs text-destructive dark:bg-destructive/10"
        >
          <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" />
          <span>{errorMsg}</span>
        </motion.div>
      )}
    </motion.div>
  );
}
