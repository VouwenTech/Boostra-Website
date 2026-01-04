import { Metadata } from "next";
import Link from "next/link";
import { getAllBenchmarks, getManifest } from "@/lib/benchmarks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Shopify Benchmarks - CRO Data by Industry",
  description:
    "Compare your Shopify store against thousands of others. Industry benchmarks for PageSpeed, LCP, trust signals, and more.",
};

export default async function BenchmarksIndexPage() {
  const benchmarks = await getAllBenchmarks();
  const manifest = await getManifest();

  // Group benchmarks by niche
  const byNiche = benchmarks.reduce(
    (acc, b) => {
      if (!acc[b.niche]) {
        acc[b.niche] = [];
      }
      acc[b.niche].push(b);
      return acc;
    },
    {} as Record<string, typeof benchmarks>
  );

  const niches = Object.keys(byNiche).sort();

  return (
    <div className="min-h-screen bg-white">
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
              stores across {niches.length} industries.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {niches.map((niche) => {
            const nicheBenchmarks = byNiche[niche];
            const nicheLabel =
              nicheBenchmarks[0]?.title?.split(" Benchmarks for ")?.[1] || niche;

            return (
              <div key={niche} className="mb-12">
                <h2 className="text-2xl font-bold mb-4 capitalize">
                  {nicheLabel}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {nicheBenchmarks[0]?.sample_size?.toLocaleString() || "N/A"} stores
                  analyzed
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {nicheBenchmarks.map((b) => (
                    <Link key={b.slug} href={`/benchmarks/${b.slug}`}>
                      <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">
                            {b.title.split(" Benchmarks for ")[0]}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            View {b.metric.replace(/_/g, " ")} benchmarks
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {niches.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No benchmarks available yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
