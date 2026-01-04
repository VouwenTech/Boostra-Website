import { HeroStat } from "@/lib/types";

interface BenchmarkHeroProps {
  nicheLabel: string;
  metricLabel: string;
  heroStat?: HeroStat;
  sampleSize: number;
  dataDate: string;
}

export function BenchmarkHero({
  nicheLabel,
  metricLabel,
  heroStat,
  sampleSize,
  dataDate,
}: BenchmarkHeroProps) {
  return (
    <section className="bg-gradient-to-br from-boostra-blue/10 to-boostra-blue/5 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="badge mb-4">Benchmark Data</span>
          <h1 className="text-4xl md:text-5xl font-bold text-boostra-dark mb-4">
            {metricLabel} Benchmarks for{" "}
            <span className="gradient-text">{nicheLabel}</span> Stores
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Based on analysis of {sampleSize.toLocaleString()} Shopify stores •
            Updated {new Date(dataDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          {heroStat && (
            <div className="bg-white rounded-2xl shadow-lg p-8 inline-block">
              <div className="text-6xl font-bold text-boostra-blue mb-2">
                {heroStat.value}
              </div>
              <div className="text-xl font-medium text-boostra-dark">
                {heroStat.label}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {heroStat.context}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
