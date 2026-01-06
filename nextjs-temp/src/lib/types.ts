// Types shared between server and client components

export interface PercentileStats {
  p10: number;
  p25: number;
  p50: number;
  p75: number;
  p90: number;
  mean: number;
  std_dev?: number;
  min_value?: number;
  max_value?: number;
}

export interface HeroStat {
  value: string;
  label: string;
  context: string;
}

export interface BenchmarkPageData {
  slug: string;
  niche: string;
  niche_label: string;
  metric: string;
  metric_label: string;
  sample_size: number;
  data_date: string;
  content_generated_at?: string;
  last_updated: string;
  version: number;
  percentiles: PercentileStats;
  thresholds: {
    good?: number | null;
    bad?: number | null;
  };
  seo: {
    title: string;
    meta_description: string;
    keywords: string[];
  };
  content?: {
    hero_stat: HeroStat;
    key_findings: string[];
    how_to_improve: string[];
  };
  related_benchmarks: Array<{ slug: string; title: string; anchorText?: string }>;
  jsonld?: object;
  faqSchema?: object;
  breadcrumbSchema?: object;
}

export interface BenchmarkManifest {
  generated_at: string;
  total_stores_analyzed: number;
  valid_niches: string[];
  available_metrics: string[];
  pages: Array<{
    slug: string;
    title: string;
    niche: string;
    metric: string;
    sample_size: number;
  }>;
}

// Helper to format metric values for display
export function formatMetricValue(value: number, metric: string): string {
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
