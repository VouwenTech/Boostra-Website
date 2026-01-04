import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllBenchmarkSlugs,
  getBenchmarkData,
} from "@/lib/benchmarks";
import { BenchmarkHero } from "@/components/benchmarks/BenchmarkHero";
import { PercentilesTable } from "@/components/benchmarks/PercentilesTable";
import { CompareWidget } from "@/components/benchmarks/CompareWidget";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static pages at build time
export async function generateStaticParams() {
  const slugs = await getAllBenchmarkSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getBenchmarkData(slug);

  if (!data) {
    return {
      title: "Benchmark Not Found",
    };
  }

  return {
    title: data.seo?.title || `${data.metric_label} Benchmarks for ${data.niche_label}`,
    description:
      data.seo?.meta_description ||
      `Compare your Shopify store's ${data.metric_label.toLowerCase()} against ${data.sample_size} stores in the ${data.niche_label} industry.`,
    keywords: data.seo?.keywords,
    openGraph: {
      title: data.seo?.title,
      description: data.seo?.meta_description,
      type: "article",
    },
    alternates: {
      canonical: `https://boostra.io/benchmarks/${slug}`,
    },
  };
}

export default async function BenchmarkPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getBenchmarkData(slug);

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD Structured Data */}
      {data.jsonld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data.jsonld) }}
        />
      )}

      <BenchmarkHero
        nicheLabel={data.niche_label}
        metricLabel={data.metric_label}
        heroStat={data.content?.hero_stat}
        sampleSize={data.sample_size}
        dataDate={data.data_date}
      />

      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <PercentilesTable
              percentiles={data.percentiles}
              metric={data.metric}
              thresholds={data.thresholds}
            />

            {data.content?.key_findings && data.content.key_findings.length > 0 && (
              <div className="my-8">
                <h2 className="text-2xl font-bold mb-4">Key Findings</h2>
                <ul className="space-y-3">
                  {data.content.key_findings.map((finding, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-boostra-blue mt-1">•</span>
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {data.content?.how_to_improve && data.content.how_to_improve.length > 0 && (
              <div className="my-8">
                <h2 className="text-2xl font-bold mb-4">
                  How to Improve Your {data.metric_label}
                </h2>
                <ol className="space-y-3 list-decimal list-inside">
                  {data.content.how_to_improve.map((tip, i) => (
                    <li key={i} className="pl-2">
                      {tip}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {data.content?.methodology && (
              <div className="my-8 p-6 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-2">Methodology</h3>
                <p className="text-sm text-muted-foreground">
                  {data.content.methodology}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <CompareWidget
              metric={data.metric}
              metricLabel={data.metric_label}
              percentiles={data.percentiles}
            />

            {data.related_benchmarks && data.related_benchmarks.length > 0 && (
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-semibold mb-4">Related Benchmarks</h3>
                <ul className="space-y-2">
                  {data.related_benchmarks.map((related) => (
                    <li key={related.slug}>
                      <Link
                        href={`/benchmarks/${related.slug}`}
                        className="text-boostra-blue hover:underline text-sm"
                      >
                        {related.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-boostra-blue/10 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Get a Full CRO Audit</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Want to know how your store compares across all metrics? Get a
                personalized CRO audit.
              </p>
              <Button asChild className="w-full bg-boostra-blue hover:bg-boostra-blue/90">
                <a href="mailto:byron@boostra.agency">Request Audit</a>
              </Button>
            </div>
          </aside>
        </div>
      </section>

      {/* Back to benchmarks */}
      <section className="container mx-auto px-4 py-8 border-t">
        <Link
          href="/benchmarks"
          className="text-boostra-blue hover:underline inline-flex items-center gap-2"
        >
          ← View All Benchmarks
        </Link>
      </section>
    </div>
  );
}
