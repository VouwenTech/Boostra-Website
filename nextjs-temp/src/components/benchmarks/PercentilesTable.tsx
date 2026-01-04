"use client";

import { PercentileStats } from "@/lib/types";

// Helper to format metric values for display
function formatMetricValue(value: number, metric: string): string {
  if (metric.includes("_ms") || metric === "lcp_ms" || metric === "ttfb_ms") {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}s`;
    }
    return `${Math.round(value)}ms`;
  }
  if (metric === "median_price_cents") {
    return `$${(value / 100).toFixed(2)}`;
  }
  if (metric === "sku_count") {
    return value.toLocaleString();
  }
  if (metric === "cls_score") {
    return value.toFixed(2);
  }
  return String(Math.round(value));
}
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PercentilesTableProps {
  percentiles: PercentileStats;
  metric: string;
  thresholds?: { good?: number | null; bad?: number | null };
}

export function PercentilesTable({
  percentiles,
  metric,
  thresholds,
}: PercentilesTableProps) {
  const rows = [
    { label: "Top 10% (Excellent)", value: percentiles.p90, tier: "top" },
    { label: "Top 25% (Good)", value: percentiles.p75, tier: "good" },
    { label: "Median (Average)", value: percentiles.p50, tier: "average" },
    { label: "Bottom 25% (Needs Work)", value: percentiles.p25, tier: "below" },
    { label: "Bottom 10% (Critical)", value: percentiles.p10, tier: "critical" },
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "top":
        return "text-green-600 font-semibold";
      case "good":
        return "text-green-500";
      case "average":
        return "text-yellow-600";
      case "below":
        return "text-orange-500";
      case "critical":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Performance Distribution</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Percentile</TableHead>
            <TableHead className="text-right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.label}>
              <TableCell className="font-medium">{row.label}</TableCell>
              <TableCell className={`text-right ${getTierColor(row.tier)}`}>
                {formatMetricValue(row.value, metric)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {thresholds && (thresholds.good || thresholds.bad) && (
        <p className="text-sm text-muted-foreground mt-2">
          Industry thresholds: Good ≤ {thresholds.good}, Needs improvement &gt;{" "}
          {thresholds.bad}
        </p>
      )}
    </div>
  );
}
