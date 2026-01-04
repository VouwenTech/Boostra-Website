import { Metadata } from "next";
import Link from "next/link";
import { getAllBenchmarks, getManifest } from "@/lib/benchmarks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shopify Benchmarks - CRO Data by Industry",
  description:
    "Compare your Shopify store against thousands of others. Industry benchmarks for PageSpeed, LCP, trust signals, and more.",
};

// Metric sections with explanations
const METRICS = [
  {
    key: "pagespeed_score",
    name: "PageSpeed Score",
    shortDesc: "Overall performance rating from Google",
    description: "Google's comprehensive performance metric (0-100) that evaluates your site's speed and user experience. Higher scores correlate with better SEO rankings and conversion rates.",
    goodThreshold: "90+",
    badThreshold: "<50",
    formatValue: (v: number) => Math.round(v).toString(),
    lowerIsBetter: false,
  },
  {
    key: "lcp_ms",
    name: "Largest Contentful Paint (LCP)",
    shortDesc: "How fast your main content loads",
    description: "LCP measures how long it takes for the largest visible element to load. It's a Core Web Vital that directly impacts SEO rankings. Faster is better.",
    goodThreshold: "<2.5s",
    badThreshold: ">4s",
    formatValue: (v: number) => v >= 1000 ? `${(v / 1000).toFixed(1)}s` : `${Math.round(v)}ms`,
    lowerIsBetter: true,
  },
  {
    key: "trust_gap_score",
    name: "Trust Gap Score",
    shortDesc: "How well you meet shopper trust expectations",
    description: "Measures the gap between what shoppers expect in trust signals (reviews, badges, policies) and what your store delivers. Lower scores mean better trust optimization.",
    goodThreshold: "<20",
    badThreshold: ">50",
    formatValue: (v: number) => Math.round(v).toString(),
    lowerIsBetter: true,
  },
];

export default async function BenchmarksIndexPage() {
  const benchmarks = await getAllBenchmarks();
  const manifest = await getManifest();

  // Group benchmarks by metric
  const byMetric = benchmarks.reduce(
    (acc, b) => {
      if (!acc[b.metric]) {
        acc[b.metric] = [];
      }
      acc[b.metric].push(b);
      return acc;
    },
    {} as Record<string, typeof benchmarks>
  );

  // Sort each metric's benchmarks by sample size (largest first)
  Object.keys(byMetric).forEach((metric) => {
    byMetric[metric].sort((a, b) => (b.sample_size || 0) - (a.sample_size || 0));
  });

  const totalNiches = new Set(benchmarks.map((b) => b.niche)).size;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <section className="bg-gradient-to-br from-boostra-blue/10 to-boostra-blue/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <span className="badge mb-4">Benchmark Data</span>
              <h1 className="text-4xl md:text-5xl font-bold text-boostra-dark mb-4">
                Shopify Store <span className="gradient-text">Benchmarks</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Compare your store against{" "}
                {manifest?.total_stores_analyzed?.toLocaleString() || "2,500+"} Shopify
                stores across {totalNiches} industries.
              </p>
            </div>
          </div>
        </section>

        {/* Metric Sections */}
        {METRICS.map((metric) => {
          const metricBenchmarks = byMetric[metric.key] || [];

          return (
            <section
              key={metric.key}
              id={metric.key.replace(/_/g, "-")}
              className="container mx-auto px-4 py-12 border-b last:border-b-0"
            >
              <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-boostra-dark mb-2">
                    {metric.name} Benchmarks
                  </h2>
                  <p className="text-boostra-blue font-medium mb-3">
                    {metric.shortDesc}
                  </p>
                  <p className="text-muted-foreground max-w-3xl">
                    {metric.description}
                  </p>
                  <div className="flex gap-4 mt-3 text-sm">
                    <span>
                      <span className="text-green-600 font-medium">Good:</span> {metric.goodThreshold}
                    </span>
                    <span>
                      <span className="text-red-500 font-medium">Poor:</span> {metric.badThreshold}
                    </span>
                  </div>
                </div>

                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-semibold">Industry</TableHead>
                        <TableHead className="text-right font-semibold">Stores</TableHead>
                        <TableHead className="text-right font-semibold">Median</TableHead>
                        <TableHead className="text-right font-semibold">Top 10%</TableHead>
                        <TableHead className="text-right font-semibold">Bottom 10%</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {metricBenchmarks.map((b) => {
                        const nicheLabel = b.niche_label || b.niche;
                        const p50 = b.percentiles?.p50;
                        const p10 = b.percentiles?.p10;
                        const p90 = b.percentiles?.p90;
                        const topValue = metric.lowerIsBetter ? p10 : p90;
                        const bottomValue = metric.lowerIsBetter ? p90 : p10;

                        return (
                          <TableRow key={b.slug} className="hover:bg-muted/30">
                            <TableCell>
                              <Link
                                href={`/benchmarks/${b.slug}`}
                                className="text-boostra-blue hover:underline font-medium"
                              >
                                {nicheLabel}
                              </Link>
                            </TableCell>
                            <TableCell className="text-right text-muted-foreground">
                              {b.sample_size?.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {p50 !== undefined ? metric.formatValue(p50) : "—"}
                            </TableCell>
                            <TableCell className="text-right text-green-600">
                              {topValue !== undefined ? metric.formatValue(topValue) : "—"}
                            </TableCell>
                            <TableCell className="text-right text-red-500">
                              {bottomValue !== undefined ? metric.formatValue(bottomValue) : "—"}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </section>
          );
        })}

        {benchmarks.length === 0 && (
          <section className="container mx-auto px-4 py-12">
            <div className="text-center">
              <p className="text-muted-foreground">
                No benchmarks available yet. Check back soon!
              </p>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
