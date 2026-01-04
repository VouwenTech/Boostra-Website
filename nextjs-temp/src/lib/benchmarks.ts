import fs from "fs";
import path from "path";

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
    methodology: string;
  };
  related_benchmarks: Array<{ slug: string; title: string }>;
  jsonld?: object;
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

const BENCHMARKS_DIR = path.join(process.cwd(), "data", "benchmarks", "pages");
const MANIFEST_PATH = path.join(process.cwd(), "data", "benchmarks", "manifest.json");

export async function getAllBenchmarkSlugs(): Promise<string[]> {
  try {
    if (!fs.existsSync(MANIFEST_PATH)) {
      return [];
    }
    const manifest: BenchmarkManifest = JSON.parse(
      fs.readFileSync(MANIFEST_PATH, "utf-8")
    );
    return manifest.pages.map((p) => p.slug);
  } catch {
    return [];
  }
}

export async function getBenchmarkData(
  slug: string
): Promise<BenchmarkPageData | null> {
  const filePath = path.join(BENCHMARKS_DIR, `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return null;
  }
}

export async function getAllBenchmarks(): Promise<BenchmarkPageData[]> {
  try {
    if (!fs.existsSync(BENCHMARKS_DIR)) {
      return [];
    }
    const files = fs.readdirSync(BENCHMARKS_DIR).filter((f) => f.endsWith(".json"));
    const benchmarks: BenchmarkPageData[] = [];

    for (const file of files) {
      try {
        const data = JSON.parse(
          fs.readFileSync(path.join(BENCHMARKS_DIR, file), "utf-8")
        );
        benchmarks.push(data);
      } catch {
        // Skip invalid files
      }
    }

    return benchmarks;
  } catch {
    return [];
  }
}

export async function getManifest(): Promise<BenchmarkManifest | null> {
  try {
    if (!fs.existsSync(MANIFEST_PATH)) {
      return null;
    }
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
  } catch {
    return null;
  }
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

// Helper to determine if a value is good/bad
export function getPerformanceLevel(
  value: number,
  thresholds: { good?: number | null; bad?: number | null },
  higherIsBetter: boolean = true
): "good" | "average" | "bad" {
  if (thresholds.good == null && thresholds.bad == null) {
    return "average";
  }

  if (higherIsBetter) {
    if (thresholds.good != null && value >= thresholds.good) return "good";
    if (thresholds.bad != null && value < thresholds.bad) return "bad";
  } else {
    if (thresholds.good != null && value <= thresholds.good) return "good";
    if (thresholds.bad != null && value > thresholds.bad) return "bad";
  }

  return "average";
}
