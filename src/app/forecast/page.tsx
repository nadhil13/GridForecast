"use client";

import { useCallback, useState, useMemo } from "react";
import { motion } from "framer-motion";

import { PageWrapper } from "@/components/layout/page-wrapper";
import { fadeUpChild } from "@/lib/motion";
import { TiltSpotlightCard } from "@/components/ui/tilt-spotlight-card";
import dynamic from "next/dynamic";
import {
  PredictionForm,
  ResultCard,
  HISTORICAL_DATA,
  CONFIDENCE_MARGIN,
  type ForecastDataPoint,
  type PredictionStatus,
  type ModelType,
} from "@/features/forecast";

const DashboardPanel = dynamic(() => import("@/features/forecast/dashboard-panel").then((mod) => mod.DashboardPanel), {
  loading: () => <div className="flex h-full min-h-[400px] w-full items-center justify-center text-sm text-muted-foreground animate-pulse">Loading dashboard...</div>,
  ssr: false,
});

const MetricCards = dynamic(() => import("@/features/forecast/metric-cards").then((mod) => mod.MetricCards), {
  loading: () => <div className="h-[200px] w-full animate-pulse rounded-[2.5rem] bg-muted/20" />,
});

/* ============================================================
   /forecast — Interactive Prediction Engine
   ============================================================
   State flow:
   1. User selects model (LR / SVR) and enters year
   2. PredictionForm calls API, applies SVR multiplier if needed
   3. chartData is enriched with confidence intervals
   4. MetricCards shows all metrics including CO₂ emission
   ============================================================ */

export default function ForecastPage() {
  const [rawChartData, setRawChartData] =
    useState<ForecastDataPoint[]>(HISTORICAL_DATA);
  const [lastPrediction, setLastPrediction] =
    useState<ForecastDataPoint | null>(null);
  const [predictionStatus, setPredictionStatus] =
    useState<PredictionStatus>("idle");
  const [modelType, setModelType] = useState<ModelType>("linear-regression");

  const handlePrediction = useCallback(
    (point: ForecastDataPoint) => {
      setLastPrediction(point);

      setRawChartData((prev) => {
        const filtered = prev.filter((d) => d.tahun !== point.tahun);
        const merged = [...filtered, point].sort(
          (a, b) => a.tahun - b.tahun
        );
        return merged;
      });
    },
    []
  );

  // Enrich data with confidence intervals for predicted points
  const chartData = useMemo(() => {
    return rawChartData.map((d) => {
      if (!d.isPrediction) return d;
      return {
        ...d,
        lowerBound: d.produksi_twh * (1 - CONFIDENCE_MARGIN),
        upperBound: d.produksi_twh * (1 + CONFIDENCE_MARGIN),
      };
    });
  }, [rawChartData]);

  const isLoading = predictionStatus === "loading";

  return (
    <PageWrapper>
      {/* ── Modern CSS Dynamic Backgrounds (Particle Ring & Speckles) ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-speckled mix-blend-multiply dark:mix-blend-screen" />
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ring-particles opacity-30" />

      {/* ── Optimized Grid Background ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.10]" />
        <div className="pointer-events-none absolute inset-0 z-0 gradient-glow opacity-60 mix-blend-screen dark:opacity-20" />
      </div>

      {/* ── Page header ── */}
      <section className="relative z-20 pb-12 pt-8">
        <motion.div variants={fadeUpChild} className="flex flex-col items-center text-center">
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight">
            Forecast Engine
          </h1>
          <p className="mt-4 max-w-2xl text-[clamp(1rem,1.5vw,1.125rem)] leading-relaxed text-muted-foreground">
            Select a model, enter a target year, and generate AI-powered
            electricity demand predictions with confidence intervals.
          </p>
        </motion.div>
      </section>

      {/* ── Dashboard ── */}
      <section className="relative z-20 pb-16 lg:pb-24">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="grid gap-6 lg:grid-cols-12"
        >
          {/* Left panel — Form + Result */}
          <div className="flex flex-col gap-6 lg:col-span-4 sda-card">
            <TiltSpotlightCard className="rounded-[2.5rem] border border-border/40 bg-background/60 p-8 shadow-sm backdrop-blur-xl transition-all hover:border-border hover:shadow-2xl hover:shadow-primary/10">
              <PredictionForm
                onPrediction={handlePrediction}
                onStatusChange={setPredictionStatus}
                modelType={modelType}
                onModelChange={setModelType}
              />
            </TiltSpotlightCard>
            <TiltSpotlightCard className="rounded-[2.5rem] border border-border/40 bg-background/60 p-8 shadow-sm backdrop-blur-xl transition-all hover:border-border hover:shadow-2xl hover:shadow-primary/10">
              <ResultCard prediction={lastPrediction} />
            </TiltSpotlightCard>
          </div>

          {/* Right panel — Tabs (Chart / Table) + Export */}
          <div className="lg:col-span-8 sda-card" style={{ animationDelay: "0.2s" }}>
            <TiltSpotlightCard className="h-full rounded-[2.5rem] border border-border/40 bg-background/60 p-8 shadow-sm backdrop-blur-xl transition-all hover:border-border hover:shadow-2xl hover:shadow-primary/10">
              <DashboardPanel data={chartData} isLoading={isLoading} />
            </TiltSpotlightCard>
          </div>
        </motion.div>

        {/* Metric insight cards */}
        <motion.div variants={fadeUpChild} className="mt-8 sda-card" style={{ animationDelay: "0.4s" }}>
          <TiltSpotlightCard className="rounded-[2.5rem] border border-border/40 bg-background/60 p-8 shadow-sm backdrop-blur-xl transition-all hover:border-border hover:shadow-2xl hover:shadow-primary/10">
            <MetricCards
              prediction={lastPrediction}
              isLoading={isLoading}
              modelType={modelType}
            />
          </TiltSpotlightCard>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
