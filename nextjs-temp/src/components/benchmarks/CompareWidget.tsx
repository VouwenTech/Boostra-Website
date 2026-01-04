"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PercentileStats, formatMetricValue } from "@/lib/types";

interface CompareWidgetProps {
  metric: string;
  metricLabel: string;
  percentiles: PercentileStats;
}

export function CompareWidget({
  metric,
  metricLabel,
  percentiles,
}: CompareWidgetProps) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<{
    percentile: string;
    message: string;
    color: string;
  } | null>(null);

  const handleCompare = () => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

    // Determine which percentile the user falls into
    let percentile: string;
    let message: string;
    let color: string;

    // For metrics where lower is better (like LCP)
    const lowerIsBetter = metric.includes("_ms") || metric.includes("gap") || metric.includes("cls");

    if (lowerIsBetter) {
      if (numValue <= percentiles.p10) {
        percentile = "Top 10%";
        message = "Excellent! You're outperforming most stores.";
        color = "text-green-600";
      } else if (numValue <= percentiles.p25) {
        percentile = "Top 25%";
        message = "Great! You're ahead of most stores.";
        color = "text-green-500";
      } else if (numValue <= percentiles.p50) {
        percentile = "Top 50%";
        message = "You're doing better than average.";
        color = "text-yellow-600";
      } else if (numValue <= percentiles.p75) {
        percentile = "Bottom 50%";
        message = "There's room for improvement.";
        color = "text-orange-500";
      } else {
        percentile = "Bottom 25%";
        message = "This needs attention. Consider a CRO audit.";
        color = "text-red-500";
      }
    } else {
      if (numValue >= percentiles.p90) {
        percentile = "Top 10%";
        message = "Excellent! You're outperforming most stores.";
        color = "text-green-600";
      } else if (numValue >= percentiles.p75) {
        percentile = "Top 25%";
        message = "Great! You're ahead of most stores.";
        color = "text-green-500";
      } else if (numValue >= percentiles.p50) {
        percentile = "Top 50%";
        message = "You're doing better than average.";
        color = "text-yellow-600";
      } else if (numValue >= percentiles.p25) {
        percentile = "Bottom 50%";
        message = "There's room for improvement.";
        color = "text-orange-500";
      } else {
        percentile = "Bottom 25%";
        message = "This needs attention. Consider a CRO audit.";
        color = "text-red-500";
      }
    }

    setResult({ percentile, message, color });
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg">Compare Your Store</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Enter your {metricLabel.toLowerCase()} to see how you compare to other{" "}
          stores in this niche.
        </p>
        <div className="space-y-4">
          <Input
            type="number"
            placeholder={`Enter your ${metricLabel.toLowerCase()}`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCompare()}
          />
          <Button
            onClick={handleCompare}
            className="w-full bg-boostra-blue hover:bg-boostra-blue/90"
          >
            Compare Now
          </Button>
          {result && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className={`font-semibold ${result.color}`}>
                You&apos;re in the {result.percentile}!
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {result.message}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 pt-6 border-t">
          <p className="text-sm font-medium mb-2">Quick reference:</p>
          <div className="text-sm space-y-1 text-muted-foreground">
            <p>Median: {formatMetricValue(percentiles.p50, metric)}</p>
            <p>Top 25%: {formatMetricValue(percentiles.p75, metric)}</p>
            <p>Top 10%: {formatMetricValue(percentiles.p90, metric)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
