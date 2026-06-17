import type { ForecastDataPoint } from "@/features/forecast/types";

/* ============================================================
   CSV Export Utility
   ============================================================
   Generates a CSV string from forecast data and triggers a
   browser download. No external dependencies needed.
   ============================================================ */

function toCsvRow(cells: (string | number)[]): string {
  return cells
    .map((c) => {
      const s = String(c);
      // Escape cells containing commas or quotes
      return s.includes(",") || s.includes('"')
        ? `"${s.replace(/"/g, '""')}"`
        : s;
    })
    .join(",");
}

export function exportForecastCsv(data: ForecastDataPoint[]) {
  const headers = ["Year", "Production (TWh)", "Type"];
  const rows = data.map((d) =>
    toCsvRow([
      d.tahun,
      d.produksi_twh.toFixed(2),
      d.isPrediction ? "Predicted" : "Historical",
    ])
  );

  const csv = [toCsvRow(headers), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `electricity-forecast-${Date.now()}.csv`;
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
