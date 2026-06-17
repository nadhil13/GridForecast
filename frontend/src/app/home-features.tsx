"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap,
  BarChart3,
  TrendingUp,
  ArrowRight,
  Activity,
  Target,
  Database,
} from "lucide-react";

import { TiltSpotlightCard } from "@/components/ui/tilt-spotlight-card";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { fadeUpChild } from "@/lib/motion";

const quickStats = [
  {
    label: "Historical Records",
    value: 35,
    decimals: 0,
    prefix: "",
    suffix: "+",
    sub: "Years of grid data (1990–2024)",
    icon: Database,
  },
  {
    label: "Model Accuracy",
    value: 0.96,
    decimals: 2,
    prefix: "R² ",
    suffix: "",
    sub: "Linear Regression fit score",
    icon: Target,
  },
  {
    label: "Prediction Range",
    value: 2050,
    decimals: 0,
    prefix: "2025–",
    suffix: "",
    sub: "Supported forecast horizon",
    icon: Activity,
  },
] as const;

const features = [
  {
    icon: Zap,
    title: "Forecast Engine",
    description:
      "Run AI-powered demand predictions for any target year. Get instant results with interactive charts and exportable data.",
    href: "/forecast",
    cta: "Open Forecast",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Explore 35 years of historical electricity data. Review model evaluation metrics including R², RMSE, and MAE.",
    href: "/analytics",
    cta: "View Analytics",
  },
  {
    icon: TrendingUp,
    title: "Data Export",
    description:
      "Download historical and predicted data as CSV. Share insights with stakeholders in a format they can work with.",
    href: "/forecast",
    cta: "Export Data",
  },
] as const;

export default function HomeFeatures() {
  return (
    <div className="relative z-30 flex flex-col gap-32 pb-40 px-6 max-w-7xl mx-auto safe-center overflow-clip">
      {/* Quick Stats Grid */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="grid gap-6 sm:grid-cols-3 dynamic-space-eval"
      >
        {quickStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={fadeUpChild}
            style={{ "--sibling-index": i } as React.CSSProperties}
          >
            <TiltSpotlightCard className="group relative overflow-hidden rounded-[2rem] border border-border/20 bg-background/40 p-8 shadow-sm backdrop-blur-xl transition-all hover:border-border/50 hover:bg-background/60">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/50 text-foreground">
                    <stat.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-widest text-muted-foreground/70 uppercase mb-3">
                    {stat.label}
                  </p>
                  <p className="text-4xl font-bold tabular-nums tracking-tight text-foreground">
                    <AnimatedNumber
                      value={stat.value}
                      decimals={stat.decimals}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground/80 font-medium">
                    {stat.sub}
                  </p>
                </div>
              </div>
            </TiltSpotlightCard>
          </motion.div>
        ))}
      </motion.section>

      {/* Features Grid */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="grid gap-6 w-full features-grid-responsive"
      >
        {features.map((item) => (
          <motion.div key={item.title} variants={fadeUpChild} className="h-full">
            <TiltSpotlightCard className="group h-full relative flex flex-col overflow-hidden rounded-[2rem] border border-border/20 bg-background/40 p-10 shadow-sm backdrop-blur-xl transition-all hover:border-border/50 hover:bg-background/60">
              <div className="relative mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/50 text-foreground transition-transform duration-500 group-hover:-translate-y-1">
                <item.icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-foreground" />
              </div>
              <h3 className="relative text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                {item.title}
              </h3>
              <p className="relative mt-4 flex-1 text-sm leading-relaxed text-muted-foreground/90">
                {item.description}
              </p>

              <Link
                href={item.href}
                className="relative mt-8 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-all hover:text-primary"
              >
                {item.cta}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </TiltSpotlightCard>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
}
