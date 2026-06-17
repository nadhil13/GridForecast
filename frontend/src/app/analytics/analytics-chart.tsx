"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";
import { TiltSpotlightCard } from "@/components/ui/tilt-spotlight-card";

/* ---------- Mock historical data ---------- */
const HISTORICAL_EDA = [
  { tahun: 1990, produksi_twh: 33 },
  { tahun: 1993, produksi_twh: 45 },
  { tahun: 1996, produksi_twh: 65 },
  { tahun: 1999, produksi_twh: 82 },
  { tahun: 2002, produksi_twh: 97 },
  { tahun: 2005, produksi_twh: 120 },
  { tahun: 2008, produksi_twh: 142 },
  { tahun: 2010, produksi_twh: 170 },
  { tahun: 2012, produksi_twh: 198 },
  { tahun: 2014, produksi_twh: 220 },
  { tahun: 2016, produksi_twh: 240 },
  { tahun: 2018, produksi_twh: 260 },
  { tahun: 2020, produksi_twh: 275 },
  { tahun: 2022, produksi_twh: 300 },
  { tahun: 2024, produksi_twh: 330 },
];

interface AnalyticsChartProps {
  isDark: boolean;
}

export default function AnalyticsChart({ isDark }: AnalyticsChartProps) {
  const [data, setData] = useState(HISTORICAL_EDA);
  const [left, setLeft] = useState<string | number>("dataMin");
  const [right, setRight] = useState<string | number>("dataMax");
  const [refAreaLeft, setRefAreaLeft] = useState("");
  const [refAreaRight, setRefAreaRight] = useState("");
  const [top, setTop] = useState<string | number>("dataMax+50");
  const [bottom, setBottom] = useState<string | number>("dataMin-50");

  const getAxisYDomain = (from: string, to: string, refData: typeof HISTORICAL_EDA, offset: number) => {
    const refDataSubset = refData.filter((d) => d.tahun >= parseInt(from) && d.tahun <= parseInt(to));
    if (refDataSubset.length === 0) return [0, 0];
    let [min, max] = [refDataSubset[0].produksi_twh, refDataSubset[0].produksi_twh];
    refDataSubset.forEach((d) => {
      if (d.produksi_twh > max) max = d.produksi_twh;
      if (d.produksi_twh < min) min = d.produksi_twh;
    });
    return [(min - offset) | 0, (max + offset) | 0];
  };

  const zoom = () => {
    let _refAreaLeft = refAreaLeft;
    let _refAreaRight = refAreaRight;

    if (_refAreaLeft === _refAreaRight || _refAreaRight === "") {
      setRefAreaLeft("");
      setRefAreaRight("");
      return;
    }

    if (parseInt(_refAreaLeft) > parseInt(_refAreaRight)) {
      [ _refAreaLeft, _refAreaRight ] = [ _refAreaRight, _refAreaLeft ];
    }

    const refDataSubset = data.filter((d) => d.tahun >= parseInt(_refAreaLeft) && d.tahun <= parseInt(_refAreaRight));
    if (refDataSubset.length === 0) {
      setRefAreaLeft("");
      setRefAreaRight("");
      return;
    }

    const [bottom, top] = getAxisYDomain(_refAreaLeft, _refAreaRight, data, 50);

    setRefAreaLeft("");
    setRefAreaRight("");
    setData(data.slice());
    setLeft(_refAreaLeft);
    setRight(_refAreaRight);
    setBottom(bottom);
    setTop(top);
  };

  const zoomOut = () => {
    setData(HISTORICAL_EDA.slice());
    setRefAreaLeft("");
    setRefAreaRight("");
    setLeft("dataMin");
    setRight("dataMax");
    setTop("dataMax+50");
    setBottom("dataMin-50");
  };

  const strokeColor = isDark ? "#d4d4d8" : "#3f3f46";
  const gradientFrom = isDark ? "rgba(212,212,216,0.25)" : "rgba(63,63,70,0.15)";
  const gridColor = isDark ? "rgba(255,255,255,0.06)" : "#e5e5e5";
  const axisColor = isDark ? "#71717a" : "#a1a1aa";

  return (
    <TiltSpotlightCard className="sda-card rounded-[2.5rem] border border-border/40 bg-background/60 p-8 shadow-sm backdrop-blur-xl transition-all hover:border-border hover:shadow-2xl hover:shadow-primary/10">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Historical Electricity Demand Growth
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Drag to zoom in. Click Zoom Out to reset.
          </p>
        </div>
        {left !== "dataMin" && (
          <button
            className="rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background"
            onClick={zoomOut}
          >
            Zoom Out
          </button>
        )}
      </div>

      <div className="h-[400px] w-full cursor-crosshair relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 8, bottom: 0, left: -12 }}
            onMouseDown={(e) => e && setRefAreaLeft(e.activeLabel?.toString() || "")}
            onMouseMove={(e) => refAreaLeft && e && setRefAreaRight(e.activeLabel?.toString() || "")}
            onMouseUp={zoom}
          >
            <defs>
              <linearGradient id="edaGradient" x1="0" y1="0" x2="0" y2="1">
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
              allowDataOverflow
              dataKey="tahun"
              domain={[left, right]}
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: axisColor, fontWeight: 500 }}
              dy={12}
            />
            <YAxis
              allowDataOverflow
              domain={[bottom, top]}
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: axisColor, fontWeight: 500 }}
              dx={-8}
              tickFormatter={(v: number) => `${v}`}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "1rem",
                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #e4e4e7",
                background: isDark ? "rgba(24, 24, 27, 0.8)" : "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(12px)",
                color: isDark ? "#fafafa" : "#18181b",
                fontSize: "13px",
                fontWeight: 600,
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                padding: "12px 16px",
              }}
              formatter={(value) => [`${value} TWh`, "Production"]}
              labelFormatter={(label) => `Year ${label}`}
            />

            <Area
              type="monotone"
              dataKey="produksi_twh"
              stroke={strokeColor}
              strokeWidth={3}
              fill="url(#edaGradient)"
              animationDuration={1500}
              animationEasing="ease-out"
            />

            {refAreaLeft && refAreaRight ? (
              <ReferenceArea
                x1={refAreaLeft}
                x2={refAreaRight}
                strokeOpacity={0.3}
                fill={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
              />
            ) : null}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </TiltSpotlightCard>
  );
}
