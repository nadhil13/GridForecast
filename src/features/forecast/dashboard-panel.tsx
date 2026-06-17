"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { Download, BarChart3, Table2 } from "lucide-react";
import { toast } from "sonner";

import { fadeUpChild } from "@/lib/motion";
import { exportForecastCsv } from "@/lib/export-csv";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SkeletonChart } from "@/components/ui/skeleton";
import { ForecastChart } from "./forecast-chart";
import { DataTable } from "./data-table";
import type { ForecastDataPoint } from "./types";

/* ============================================================
   DashboardPanel — Tabs (Chart / Table) + Export button
   ============================================================
   Wraps the visualization and data-table views in a tabbed
   interface with a CSV export action in the header.
   ============================================================ */

interface DashboardPanelProps {
  data: ForecastDataPoint[];
  isLoading?: boolean;
}

export function DashboardPanel({ data, isLoading }: DashboardPanelProps) {
  const handleExport = useCallback(() => {
    if (data.length === 0) {
      toast.error("No data available to export.");
      return;
    }
    exportForecastCsv(data);
    toast.success("CSV exported successfully.", {
      description: `${data.length} records downloaded.`,
    });
  }, [data]);

  // Skeleton loading state
  if (isLoading) {
    return <SkeletonChart className="h-full" />;
  }

  return (
    <motion.div variants={fadeUpChild}>
      <Tabs defaultValue="visualization">
        {/* Tab bar + Export button */}
        <div className="flex items-center justify-between gap-3">
          <TabsList variant="line">
            <TabsTrigger value="visualization" className="gap-1.5">
              <BarChart3 className="h-3.5 w-3.5" />
              Visualization
            </TabsTrigger>
            <TabsTrigger value="data-table" className="gap-1.5">
              <Table2 className="h-3.5 w-3.5" />
              Data Table
            </TabsTrigger>
          </TabsList>

          <button
            id="export-csv-btn"
            onClick={handleExport}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border/40 bg-card px-3 text-xs font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground active:scale-[0.97]"
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </button>
        </div>

        {/* Chart view */}
        <TabsContent value="visualization" className="mt-4">
          <ForecastChart data={data} />
        </TabsContent>

        {/* Table view */}
        <TabsContent value="data-table" className="mt-4">
          <DataTable data={data} />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
