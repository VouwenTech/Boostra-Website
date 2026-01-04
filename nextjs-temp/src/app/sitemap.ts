import { MetadataRoute } from "next";
import { getAllBenchmarks } from "@/lib/benchmarks";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const benchmarks = await getAllBenchmarks();

  const benchmarkUrls = benchmarks.map((b) => ({
    url: `https://boostra.io/benchmarks/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://boostra.io",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://boostra.io/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://boostra.io/services",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://boostra.io/pricing",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://boostra.io/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://boostra.io/case-studies",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://boostra.io/benchmarks",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...benchmarkUrls,
  ];
}
