"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Target, TrendingDown, BarChart3, Sparkles } from "lucide-react";

import { PageWrapper } from "@/components/layout/page-wrapper";
import { fadeUpChild } from "@/lib/motion";
import { useTheme } from "@/components/providers/theme-provider";
import { TiltSpotlightCard } from "@/components/ui/tilt-spotlight-card";

const AnalyticsChart = dynamic(() => import("./analytics-chart"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full animate-pulse rounded-[2.5rem] bg-muted/20" />
  ),
});

/* ============================================================
   /analytics — EDA & Model Evaluation
   ============================================================
   Read-only page showcasing historical trends and ML model
   performance metrics. Does NOT call the prediction API.
   ============================================================ */

/* ---------- Model evaluation metrics ---------- */

const MODEL_METRICS = [
  {
    id: "r2-score",
    label: "R² Score",
    value: "0.9575",
    description: "Excellent fit — model explains 95.75% of variance",
    icon: Target,
  },
  {
    id: "rmse",
    label: "RMSE",
    value: "12.4 TWh",
    description: "Root Mean Square Error",
    icon: TrendingDown,
  },
  {
    id: "mae",
    label: "MAE",
    value: "8.9 TWh",
    description: "Mean Absolute Error",
    icon: BarChart3,
  },
] as const;

/* ---------- Page Component ---------- */

export default function AnalyticsPage() {
  const { resolved } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const isDark = mounted ? resolved === "dark" : false;

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
            Analytics
          </h1>
          <p className="mt-4 max-w-2xl text-[clamp(1rem,1.5vw,1.125rem)] leading-relaxed text-muted-foreground">
            Exploratory data analysis of historical electricity demand and
            machine learning model performance evaluation.
          </p>
        </motion.div>
      </section>

      {/* ── EDA Section ── */}
      <section className="relative z-20 pb-16 lg:pb-24">
        <AnalyticsChart isDark={isDark} />
      </section>

      {/* ── Model Evaluation Section ── */}
      <section className="relative z-20 pb-20">
        <div className="mb-10 text-center">
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-extrabold tracking-tight">
            Model Evaluation
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Performance metrics for the Linear Regression forecasting model
          </p>
        </div>

        {/* Metric cards using Marquee Animation */}
        <div className="group flex overflow-hidden p-2 [--gap:1.5rem] gap-[var(--gap)]">
          <div className="flex shrink-0 animate-marquee flex-row justify-around gap-[var(--gap)] group-hover:[animation-play-state:paused]">
            {[...MODEL_METRICS, ...MODEL_METRICS].map((m, idx) => (
              <div key={`${m.id}-${idx}`} className="w-[300px] shrink-0">
                <TiltSpotlightCard className="group/card h-full relative overflow-hidden rounded-[2rem] border border-border/40 bg-background/60 p-8 shadow-sm backdrop-blur-xl transition-all hover:border-border hover:shadow-2xl hover:shadow-primary/10">
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/80 text-foreground shadow-sm transition-transform duration-500 group-hover/card:scale-110">
                      <m.icon className="h-8 w-8 text-muted-foreground transition-colors group-hover/card:text-foreground" />
                    </div>
                    <div className="min-w-0 w-full">
                      <p className="text-xs font-bold tracking-wider text-muted-foreground/80 uppercase">
                        {m.label}
                      </p>
                      <p className="mt-3 text-[clamp(2rem,3vw,2.5rem)] font-bold tabular-nums tracking-tight text-foreground">
                        {m.value}
                      </p>
                      <p className="mt-3 text-sm font-medium text-muted-foreground leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  </div>
                </TiltSpotlightCard>
              </div>
            ))}
          </div>
          {/* Duplicate for seamless infinite loop */}
          <div aria-hidden="true" className="flex shrink-0 animate-marquee flex-row justify-around gap-[var(--gap)] group-hover:[animation-play-state:paused]">
            {[...MODEL_METRICS, ...MODEL_METRICS].map((m, idx) => (
              <div key={`${m.id}-dup-${idx}`} className="w-[300px] shrink-0">
                <TiltSpotlightCard className="group/card h-full relative overflow-hidden rounded-[2rem] border border-border/40 bg-background/60 p-8 shadow-sm backdrop-blur-xl transition-all hover:border-border hover:shadow-2xl hover:shadow-primary/10">
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/80 text-foreground shadow-sm transition-transform duration-500 group-hover/card:scale-110">
                      <m.icon className="h-8 w-8 text-muted-foreground transition-colors group-hover/card:text-foreground" />
                    </div>
                    <div className="min-w-0 w-full">
                      <p className="text-xs font-bold tracking-wider text-muted-foreground/80 uppercase">
                        {m.label}
                      </p>
                      <p className="mt-3 text-[clamp(2rem,3vw,2.5rem)] font-bold tabular-nums tracking-tight text-foreground">
                        {m.value}
                      </p>
                      <p className="mt-3 text-sm font-medium text-muted-foreground leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  </div>
                </TiltSpotlightCard>
              </div>
            ))}
          </div>
        </div>

        {/* Model badge */}
        <div className="mt-12 flex items-center justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/80 px-4 py-2 text-xs font-semibold text-muted-foreground backdrop-blur-md shadow-sm transition-colors hover:text-foreground hover:bg-secondary">
            <Sparkles className="h-4 w-4 text-primary" />
            scikit-learn LinearRegression — trained on 1990–2024 dataset
          </span>
        </div>
      </section>
    </PageWrapper>
  );
}
