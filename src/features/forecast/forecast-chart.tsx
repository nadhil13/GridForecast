"use client";

import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import { motion } from "framer-motion";

import { fadeUpChild } from "@/lib/motion";
import { useTheme } from "@/components/providers/theme-provider";
import { SkeletonChart } from "@/components/ui/skeleton";
import type { ForecastDataPoint } from "./types";

/* ============================================================
   ForecastChart — ComposedChart with confidence intervals
   ============================================================
   • Line for the main production trend
   • Shaded Area for ±5% confidence band on predicted points
   • ReferenceDot highlight on latest prediction
   ============================================================ */

interface ForecastChartProps {
  data: ForecastDataPoint[];
  isLoading?: boolean;
}

export function ForecastChart({ data, isLoading }: ForecastChartProps) {
  if (isLoading) return <SkeletonChart className="h-full" />;

  const { resolved } = useTheme();
  const isDark = resolved === "dark";

  // Color tokens — monochromatic
  const strokeColor = isDark ? "#d4d4d8" : "#3f3f46";
  const gridColor = isDark ? "rgba(255,255,255,0.06)" : "#e5e5e5";
  const axisColor = isDark ? "#71717a" : "#a1a1aa";
  const dotFill = isDark ? "#fafafa" : "#18181b";
  const bandFill = isDark ? "rgba(161,161,170,0.12)" : "rgba(63,63,70,0.08)";
  const gradientFrom = isDark ? "rgba(212,212,216,0.20)" : "rgba(63,63,70,0.10)";

  // Find the last prediction point
  const lastPrediction = [...data].reverse().find((d) => d.isPrediction);

  return (
    <motion.div
      variants={fadeUpChild}
      className="rounded-xl border border-border/40 bg-card p-6 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-sm font-semibold tracking-tight">
            Production Trend
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Historical data with AI-predicted values (TWh)
          </p>
        </div>
        {lastPrediction && (
          <span className="inline-flex items-center gap-1 rounded-full border border-border/30 bg-secondary/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
            ±5% confidence band
          </span>
        )}
      </div>

      <div className="mt-5 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 8, right: 8, bottom: 0, left: -12 }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={gradientFrom} />
                <stop offset="95%" stopColor="transparent" />
              </linearGradient>
            </defs>

            <CartesianGrid
              horizontal
              vertical={false}
              stroke={gridColor}
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="tahun"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: axisColor }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: axisColor }}
              dx={-4}
              domain={["auto", "auto"]}
              tickFormatter={(v: number) => `${v}`}
            />

            <Tooltip content={<ChartTooltip isDark={isDark} />} />

            {/* Confidence band — only visible on predicted points */}
            <Area
              type="monotone"
              dataKey="upperBound"
              stroke="none"
              fill={bandFill}
              fillOpacity={1}
              animationDuration={1400}
              animationEasing="ease-out"
              isAnimationActive={true}
            />
            <Area
              type="monotone"
              dataKey="lowerBound"
              stroke="none"
              fill={isDark ? "#09090b" : "#ffffff"}
              fillOpacity={1}
              animationDuration={1400}
              animationEasing="ease-out"
              isAnimationActive={true}
            />

            {/* Main production line */}
            <Line
              type="monotone"
              dataKey="produksi_twh"
              stroke={strokeColor}
              strokeWidth={2}
              dot={(props) => {
                const point = data[props.index];
                if (!point?.isPrediction) return <></>;
                return (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={4}
                    fill={dotFill}
                    stroke={strokeColor}
                    strokeWidth={2}
                  />
                );
              }}
              activeDot={{ r: 5, fill: dotFill, stroke: strokeColor, strokeWidth: 2 }}
              animationDuration={1200}
              animationEasing="ease-out"
            />

            {lastPrediction && (
              <ReferenceDot
                x={lastPrediction.tahun}
                y={lastPrediction.produksi_twh}
                r={6}
                fill={dotFill}
                stroke={strokeColor}
                strokeWidth={2}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

/* ============================================================
   ChartTooltip — custom minimal tooltip
   ============================================================ */

interface TooltipPayloadEntry {
  dataKey: string;
  value: number;
  payload: ForecastDataPoint;
}

interface ChartTooltipProps {
  isDark: boolean;
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string | number;
}

function ChartTooltip({ isDark, active, payload }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  // Find the main production entry
  const mainEntry = payload.find((p) => p.dataKey === "produksi_twh");
  if (!mainEntry) return null;

  const point = mainEntry.payload;
  const hasCI = point.lowerBound !== undefined && point.upperBound !== undefined;

  return (
    <div
      className={`
        rounded-lg border px-3.5 py-2.5 text-xs shadow-md
        ${isDark
          ? "border-white/10 bg-zinc-900 text-zinc-100"
          : "border-zinc-200 bg-white text-zinc-800"
        }
      `}
    >
      <p className="font-semibold tabular-nums">
        {point.tahun}
        {point.isPrediction && (
          <span className="ml-1.5 font-normal text-muted-foreground">
            (predicted)
          </span>
        )}
      </p>
      <p className="mt-0.5 tabular-nums text-muted-foreground">
        {mainEntry.value.toFixed(2)} TWh
      </p>
      {hasCI && (
        <p className="mt-0.5 tabular-nums text-muted-foreground/70">
          CI: {point.lowerBound!.toFixed(1)} – {point.upperBound!.toFixed(1)} TWh
        </p>
      )}
    </div>
  );
}
