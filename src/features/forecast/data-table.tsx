"use client";

import { motion } from "framer-motion";
import { fadeUpChild } from "@/lib/motion";
import type { ForecastDataPoint } from "./types";

/* ============================================================
   DataTable — minimalist tabular view of forecast data
   ============================================================
   Renders historical + predicted data in a clean table format.
   Predicted rows are visually distinguished with a subtle badge.
   ============================================================ */

interface DataTableProps {
  data: ForecastDataPoint[];
}

export function DataTable({ data }: DataTableProps) {
  const sorted = [...data].sort((a, b) => a.tahun - b.tahun);

  return (
    <motion.div
      variants={fadeUpChild}
      className="rounded-xl border border-border/40 bg-card shadow-sm"
    >
      {/* Table header info */}
      <div className="border-b border-border/40 px-6 py-4">
        <h2 className="text-sm font-semibold tracking-tight">
          Data Records
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          {sorted.length} entries — historical and predicted values
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/40 text-left">
              <th className="px-6 py-3 text-xs font-medium tracking-wide text-muted-foreground/70 uppercase">
                Year
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wide text-muted-foreground/70 uppercase">
                Production (TWh)
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wide text-muted-foreground/70 uppercase">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <tr
                key={row.tahun}
                className={`
                  border-b border-border/20 transition-colors hover:bg-muted/30
                  ${i === sorted.length - 1 ? "border-b-0" : ""}
                `}
              >
                <td className="px-6 py-3 font-medium tabular-nums">
                  {row.tahun}
                </td>
                <td className="px-6 py-3 tabular-nums text-muted-foreground">
                  {row.produksi_twh.toFixed(2)}
                </td>
                <td className="px-6 py-3">
                  {row.isPrediction ? (
                    <span className="inline-flex items-center rounded-full bg-foreground/[0.06] px-2 py-0.5 text-xs font-medium text-foreground/80 dark:bg-foreground/[0.1]">
                      Predicted
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground/60">
                      Historical
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
