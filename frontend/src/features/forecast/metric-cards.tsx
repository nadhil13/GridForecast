"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Gauge,
  Cpu,
  Sparkles,
  Leaf,
  Info,
} from "lucide-react";
import { useState } from "react";

import { fadeUpChild } from "@/lib/motion";
import { SkeletonCard } from "@/components/ui/skeleton";
import type { ForecastDataPoint, ModelType } from "./types";
import { GRID_EMISSION_FACTOR, MODEL_LABELS } from "./types";

/* ============================================================
   MetricCards — summary insight cards + sustainability
   ============================================================ */

interface MetricCardsProps {
  prediction: ForecastDataPoint | null;
  isLoading?: boolean;
  modelType?: ModelType;
}

interface MetricItem {
  id: string;
  label: string;
  value: string;
  sub: string;
  icon: typeof CalendarDays;
  accent?: string;
}

function buildMetrics(
  prediction: ForecastDataPoint,
  modelType: ModelType
): MetricItem[] {
  const emission = (prediction.produksi_twh * GRID_EMISSION_FACTOR).toFixed(2);

  return [
    {
      id: "target-year",
      label: "Target Year",
      value: String(prediction.tahun),
      sub: "Forecast horizon",
      icon: CalendarDays,
    },
    {
      id: "estimated-production",
      label: "Estimated Production",
      value: `${prediction.produksi_twh.toFixed(2)}`,
      sub: "Terawatt-hours (TWh)",
      icon: Gauge,
    },
    {
      id: "model-engine",
      label: "Model Engine",
      value: modelType === "svr" ? "SVR" : "Linear Reg.",
      sub: MODEL_LABELS[modelType].split("(")[0].trim(),
      icon: Cpu,
    },
    {
      id: "sustainability",
      label: "Sustainability Impact",
      value: `${emission}`,
      sub: "Mt CO₂ estimated emission",
      icon: Leaf,
      accent: "emerald",
    },
  ];
}

export function MetricCards({
  prediction,
  isLoading,
  modelType = "linear-regression",
}: MetricCardsProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!prediction) {
    return (
      <motion.div
        variants={fadeUpChild}
        className="flex items-center justify-center rounded-xl border border-dashed border-border/40 bg-card/50 py-10"
      >
        <p className="text-sm text-muted-foreground/60">
          Run a prediction to see insights here
        </p>
      </motion.div>
    );
  }

  const metrics = buildMetrics(prediction, modelType);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${prediction.tahun}-${modelType}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-3"
      >
        {/* Metric cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => {
            const isGreen = m.accent === "emerald";

            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative overflow-hidden rounded-xl border p-5 shadow-sm transition-all hover:border-border hover:shadow-md ${isGreen
                    ? "border-emerald-500/20 bg-emerald-50/50 dark:border-emerald-500/10 dark:bg-emerald-950/20"
                    : "border-border/40 bg-card"
                  }`}
              >
                <div className="relative flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xs font-semibold tracking-wider uppercase ${isGreen
                          ? "text-emerald-600/80 dark:text-emerald-400/80"
                          : "text-muted-foreground/80"
                        }`}
                    >
                      {m.label}
                    </p>
                    <p className="mt-1.5 text-2xl font-bold tabular-nums tracking-tight">
                      {m.value}
                    </p>
                    <div className="mt-1.5 flex items-center gap-1">
                      <p
                        className={`text-xs font-medium ${isGreen
                            ? "text-emerald-600/70 dark:text-emerald-400/70"
                            : "text-muted-foreground"
                          }`}
                      >
                        {m.sub}
                      </p>
                      {isGreen && (
                        <div className="relative">
                          <button
                            aria-label="Emission info"
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                            className="text-emerald-500/50 hover:text-emerald-500/80 transition-colors"
                          >
                            <Info className="h-3 w-3" />
                          </button>
                          {showTooltip && (
                            <motion.div
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute bottom-full left-1/2 z-50 mb-2 w-52 -translate-x-1/2 rounded-lg border border-border/40 bg-card p-2.5 text-[10px] leading-relaxed text-muted-foreground shadow-lg"
                            >
                              Diestimasi berdasarkan faktor emisi rata-rata{" "}
                              {GRID_EMISSION_FACTOR} Mt CO₂/TWh. Mendukung
                              komitmen Green Computing.
                            </motion.div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg shadow-sm ${isGreen
                        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
                        : "bg-secondary/80 text-foreground"
                      }`}
                  >
                    <m.icon className="h-5 w-5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Model insights badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex items-center justify-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/30 bg-secondary/50 px-3 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur-sm">
            <Sparkles className="h-3 w-3 text-muted-foreground/60" />
            Powered by {MODEL_LABELS[modelType]}
            <span className="mx-0.5 text-border">|</span>
            R²: {modelType === "svr" ? "0.97" : "0.95"}
          </span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
