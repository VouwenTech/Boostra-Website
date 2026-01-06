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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Metric explanations for the "What is X?" section
const METRIC_INFO: Record<string, {
  whatIs: string;
  whyMatters: string;
  howMeasured: string;
}> = {
  lcp_ms: {
    whatIs: "Largest Contentful Paint (LCP) measures the time it takes for the largest visible content element—typically a hero image, video, or large text block—to fully render on the screen.",
    whyMatters: "LCP is one of Google's three Core Web Vitals, directly impacting your search rankings. Studies show that pages with LCP under 2.5 seconds have 24% lower bounce rates. For ecommerce, every second of delay can reduce conversions by up to 7%.",
    howMeasured: "We use Google Lighthouse to test each store's homepage under simulated mobile conditions (4G network, mid-tier device). The LCP value represents the time from page request to when the largest element becomes visible.",
  },
  pagespeed_score: {
    whatIs: "PageSpeed Score is Google's comprehensive performance metric, rating your site from 0-100 based on multiple factors including loading speed, interactivity, and visual stability.",
    whyMatters: "Higher PageSpeed scores correlate strongly with better SEO rankings, lower bounce rates, and higher conversion rates. Google has confirmed page experience is a ranking factor, and scores below 50 are flagged as 'poor' in Search Console.",
    howMeasured: "We run each store through Google's PageSpeed Insights API, which combines lab data from Lighthouse with real-world Chrome User Experience data. The score weights metrics like LCP, FID, CLS, and Time to Interactive.",
  },
  trust_gap_score: {
    whatIs: "Trust Gap Score measures how well your store meets shopper expectations for trust signals—the elements that convince visitors your store is legitimate, secure, and reliable.",
    whyMatters: "Online shoppers are increasingly cautious. 81% of consumers need to trust a brand before buying. Trust signals like reviews, security badges, clear policies, and social proof directly impact whether visitors convert or abandon their carts.",
    howMeasured: "We analyze each store for the presence and quality of key trust elements: customer reviews, security badges, payment icons, shipping/return policies, contact information, social proof, and brand authenticity signals. Lower scores indicate better trust optimization.",
  },
};

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
      url: `https://boostra.agency/benchmarks/${slug}`,
      publishedTime: data.data_date,
      modifiedTime: data.last_updated,
      section: "Benchmarks",
      tags: [data.niche_label, data.metric_label, "Shopify", "Ecommerce", "Performance"],
    },
    twitter: {
      card: "summary_large_image",
      title: data.seo?.title,
      description: data.seo?.meta_description,
    },
    alternates: {
      canonical: `https://boostra.agency/benchmarks/${slug}`,
    },
  };
}

export default async function BenchmarkPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getBenchmarkData(slug);

  if (!data) {
    notFound();
  }

  const metricInfo = METRIC_INFO[data.metric];

  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD Structured Data - Dataset Schema */}
      {data.jsonld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data.jsonld) }}
        />
      )}
      {/* JSON-LD Structured Data - FAQ Schema */}
      {data.faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data.faqSchema) }}
        />
      )}
      {/* JSON-LD Structured Data - Breadcrumb Schema */}
      {data.breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data.breadcrumbSchema) }}
        />
      )}

      <Navbar />
      <main>
        {/* Visible Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="bg-muted/30 border-b">
          <div className="container mx-auto px-4 py-3">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-boostra-blue transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/benchmarks" className="hover:text-boostra-blue transition-colors">
                  Benchmarks
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-boostra-dark font-medium truncate">
                {data.metric_label} - {data.niche_label}
              </li>
            </ol>
          </div>
        </nav>

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

            {/* What is this metric? */}
            {metricInfo && (
              <div id="what-is" className="my-10 p-6 bg-gradient-to-br from-boostra-blue/5 to-boostra-blue/10 rounded-xl scroll-mt-20">
                <h2 className="text-2xl font-bold mb-6">
                  What is {data.metric_label}?
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-boostra-dark mb-1">Definition</h3>
                    <p className="text-muted-foreground">{metricInfo.whatIs}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-boostra-dark mb-1">Why It Matters</h3>
                    <p className="text-muted-foreground">{metricInfo.whyMatters}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-boostra-dark mb-1">How We Measure It</h3>
                    <p className="text-muted-foreground">{metricInfo.howMeasured}</p>
                  </div>
                </div>
              </div>
            )}

            {data.content?.key_findings && data.content.key_findings.length > 0 && (
              <div id="key-findings" className="my-8 scroll-mt-20">
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

            {/* Inline CTA - CRO Audit */}
            <div className="my-10 bg-gradient-to-r from-boostra-blue/10 to-boostra-blue/5 rounded-xl p-8 border border-boostra-blue/20">
              <h3 className="text-xl font-bold mb-3 text-boostra-dark">
                Want to Know Exactly Where Your Store Stands?
              </h3>
              <p className="text-muted-foreground mb-4">
                Our benchmarks show the industry landscape. A personalized CRO audit reveals the
                specific opportunities to outperform your competition in the {data.niche_label.toLowerCase()} space.
              </p>
              <ul className="text-sm text-muted-foreground mb-6 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-boostra-blue">✓</span>
                  Full performance analysis across all metrics
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-boostra-blue">✓</span>
                  Prioritized recommendations for {data.niche_label.toLowerCase()} stores
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-boostra-blue">✓</span>
                  Competitor comparison and gap analysis
                </li>
              </ul>
              <Button asChild className="bg-boostra-blue hover:bg-boostra-blue/90">
                <a href={`mailto:byron@boostra.agency?subject=CRO Audit Request - ${data.niche_label} Store`}>
                  Request a Free CRO Audit
                </a>
              </Button>
            </div>

            {data.content?.how_to_improve && data.content.how_to_improve.length > 0 && (
              <div id="how-to-improve" className="my-8 scroll-mt-20">
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
                <ul className="space-y-3">
                  {data.related_benchmarks.map((related) => (
                    <li key={related.slug}>
                      <Link
                        href={`/benchmarks/${related.slug}`}
                        className="text-boostra-blue hover:underline text-sm block"
                        title={related.title}
                      >
                        {related.anchorText || related.title}
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
      </main>
      <Footer />
    </div>
  );
}
