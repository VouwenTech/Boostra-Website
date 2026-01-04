#!/usr/bin/env node

/**
 * Enriches benchmark JSON files with SEO, content, and structured data
 */

const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(__dirname, '..', 'data', 'benchmarks', 'pages');
const MANIFEST_PATH = path.join(__dirname, '..', 'data', 'benchmarks', 'manifest.json');

// Niche-specific context for more tailored content
const NICHE_CONTEXT = {
  fashion: { industry: "fashion and apparel", typical_products: "clothing, accessories, and footwear", audience: "fashion-conscious shoppers" },
  electronics: { industry: "consumer electronics", typical_products: "gadgets, devices, and tech accessories", audience: "tech-savvy consumers" },
  automotive: { industry: "automotive parts and accessories", typical_products: "auto parts, tools, and car accessories", audience: "car enthusiasts and mechanics" },
  art: { industry: "art and collectibles", typical_products: "artwork, prints, and collectibles", audience: "art collectors and enthusiasts" },
  jewelry: { industry: "jewelry and accessories", typical_products: "rings, necklaces, and fine jewelry", audience: "luxury shoppers and gift-buyers" },
  luxury: { industry: "luxury goods", typical_products: "premium products and designer items", audience: "affluent consumers" },
  pet: { industry: "pet supplies", typical_products: "pet food, toys, and accessories", audience: "pet owners" },
  food: { industry: "food and beverages", typical_products: "gourmet foods and specialty items", audience: "food enthusiasts" },
  skincare: { industry: "skincare and beauty", typical_products: "skincare products and treatments", audience: "beauty-conscious consumers" },
  fitness: { industry: "fitness and sports", typical_products: "workout equipment and athletic gear", audience: "fitness enthusiasts" },
  kids: { industry: "kids and baby products", typical_products: "toys, clothing, and children's items", audience: "parents and gift-givers" },
  gadgets: { industry: "tech gadgets", typical_products: "innovative devices and accessories", audience: "early adopters" },
  shoes: { industry: "footwear", typical_products: "shoes, sneakers, and boots", audience: "footwear shoppers" },
  beauty: { industry: "beauty and cosmetics", typical_products: "makeup, fragrances, and beauty tools", audience: "beauty enthusiasts" },
  supplements: { industry: "health supplements", typical_products: "vitamins, supplements, and wellness products", audience: "health-conscious consumers" },
  sustainable: { industry: "sustainable products", typical_products: "eco-friendly and sustainable goods", audience: "environmentally conscious shoppers" },
  kitchen: { industry: "kitchen and home", typical_products: "cookware, appliances, and kitchen tools", audience: "home cooks and chefs" },
  home_decor: { industry: "home decor", typical_products: "furniture, decor, and home accessories", audience: "homeowners and decorators" },
  sports: { industry: "sports equipment", typical_products: "sports gear and athletic equipment", audience: "athletes and sports fans" },
  office: { industry: "office supplies", typical_products: "office furniture and work accessories", audience: "professionals and businesses" },
  furniture: { industry: "furniture", typical_products: "home and office furniture", audience: "homeowners and decorators" },
  baby: { industry: "baby products", typical_products: "baby gear, clothing, and essentials", audience: "new parents" },
  tea: { industry: "tea and beverages", typical_products: "specialty teas and brewing accessories", audience: "tea enthusiasts" },
  haircare: { industry: "haircare", typical_products: "shampoos, styling products, and hair tools", audience: "beauty-conscious consumers" },
  crafts: { industry: "arts and crafts", typical_products: "craft supplies and DIY materials", audience: "crafters and hobbyists" },
  watches: { industry: "watches and timepieces", typical_products: "watches and accessories", audience: "watch enthusiasts and collectors" },
};

// Metric-specific content templates
const METRIC_CONTENT = {
  lcp_ms: {
    metricExplainer: "Largest Contentful Paint (LCP) measures how long it takes for the largest visible element to load on your page. Google considers LCP a Core Web Vital, directly impacting your SEO rankings.",
    goodDirection: "lower",
    unit: "ms",
    thresholdContext: "Google recommends LCP under 2.5 seconds for a 'good' user experience, with anything over 4 seconds considered poor.",
    improvementTips: [
      "Optimize and compress hero images using modern formats like WebP or AVIF",
      "Implement lazy loading for below-the-fold images and defer non-critical JavaScript",
      "Use a Content Delivery Network (CDN) to serve assets from edge locations closer to users",
      "Preload critical resources and fonts to reduce render-blocking time",
      "Minimize server response time by optimizing your hosting infrastructure",
      "Remove or defer third-party scripts that block page rendering",
      "Consider using a headless commerce approach for faster page loads"
    ],
    keyFindingTemplates: [
      (data) => `The median ${data.niche_label} store has an LCP of ${formatMs(data.percentiles.p50)}, ${data.percentiles.p50 > 2500 ? 'which exceeds Google\'s recommended 2.5s threshold' : 'meeting Google\'s recommended threshold'}`,
      (data) => `Top-performing stores (P10) achieve LCP of ${formatMs(data.percentiles.p10)} - ${Math.round((1 - data.percentiles.p10 / data.percentiles.p50) * 100)}% faster than the median`,
      (data) => `A ${Math.round(data.percentiles.p90 / data.percentiles.p10)}x performance gap exists between the fastest and slowest stores in this niche`,
      (data) => data.percentiles.p10 <= 2500 ? `Only stores in the top 10% meet Google's "good" LCP threshold of 2.5 seconds or less` : `Even the fastest stores in this niche exceed Google's 2.5s "good" threshold`,
      (data) => data.percentiles.p25 > 4000 ? `Over 75% of stores in this niche have "poor" LCP scores by Google's standards` : `Most stores in this niche have room to improve their loading speed`
    ]
  },
  pagespeed_score: {
    metricExplainer: "PageSpeed Score is Google's comprehensive performance metric (0-100) that evaluates your site's speed and user experience. Higher scores correlate with better SEO rankings and conversion rates.",
    goodDirection: "higher",
    unit: "points",
    thresholdContext: "Scores of 90+ are considered 'good', 50-89 'needs improvement', and below 50 'poor'.",
    improvementTips: [
      "Audit and remove unused CSS and JavaScript to reduce page weight",
      "Implement efficient caching strategies for static assets",
      "Optimize your Shopify theme by removing unnecessary apps and code",
      "Use optimized, properly-sized images throughout your store",
      "Minimize main-thread work by deferring non-critical JavaScript",
      "Reduce the impact of third-party scripts like analytics and chat widgets",
      "Consider a performance-focused Shopify theme if your current theme is bloated"
    ],
    keyFindingTemplates: [
      (data) => `The average ${data.niche_label} store scores ${Math.round(data.percentiles.mean)} on PageSpeed, ${data.percentiles.mean < 50 ? 'falling into Google\'s "poor" category' : data.percentiles.mean < 90 ? 'in the "needs improvement" range' : 'achieving "good" status'}`,
      (data) => `Top 10% of stores achieve scores of ${Math.round(data.percentiles.p90)}+, giving them a significant competitive advantage`,
      (data) => `There's a ${Math.round(data.percentiles.p90 - data.percentiles.p10)} point gap between top and bottom performers in this niche`,
      (data) => `${data.percentiles.p50 < 50 ? 'More than half of stores' : data.percentiles.p75 < 50 ? 'Over 25% of stores' : 'Some stores'} in this niche fall below Google's minimum acceptable threshold`,
      (data) => `Improving from median (${Math.round(data.percentiles.p50)}) to top 25% (${Math.round(data.percentiles.p75)}) could significantly impact your search rankings`
    ]
  },
  trust_gap_score: {
    metricExplainer: "Trust Gap Score measures the difference between what shoppers expect and what your store delivers in terms of trust signals. Lower scores indicate better alignment with customer expectations.",
    goodDirection: "lower",
    unit: "points",
    thresholdContext: "A score of 0 means perfect trust alignment, while higher scores indicate gaps that may hurt conversion rates.",
    improvementTips: [
      "Add authentic customer reviews and ratings prominently on product pages",
      "Display trust badges, security seals, and payment icons clearly",
      "Include detailed shipping and return policy information",
      "Show real-time inventory and social proof (e.g., 'X people viewing')",
      "Add founder story or 'About Us' content to build brand authenticity",
      "Implement live chat or clear contact options for customer questions",
      "Display any press mentions, certifications, or industry awards"
    ],
    keyFindingTemplates: [
      (data) => `The median ${data.niche_label} store has a trust gap of ${Math.round(data.percentiles.p50)}, indicating ${data.percentiles.p50 > 50 ? 'significant room for improvement' : 'moderate trust signal implementation'}`,
      (data) => `Best-in-class stores (P10) achieve trust gap scores of just ${Math.round(data.percentiles.p10)}, showing strong trust signal optimization`,
      (data) => `The ${Math.round(data.percentiles.p90 - data.percentiles.p10)} point spread between top and bottom performers shows trust optimization is a key differentiator`,
      (data) => `${data.niche_label} shoppers have specific trust expectations that ${data.percentiles.p50 > 40 ? 'many stores are failing to meet' : 'most stores partially address'}`,
      (data) => `Reducing your trust gap from median to top 25% could meaningfully improve your conversion rate`
    ]
  }
};

// Helper functions
function formatMs(ms) {
  if (ms >= 1000) return `${(ms / 1000).toFixed(1)}s`;
  return `${Math.round(ms)}ms`;
}

function formatMetricValue(value, metric) {
  if (metric.includes('_ms')) return formatMs(value);
  if (metric === 'pagespeed_score') return Math.round(value).toString();
  return Math.round(value).toString();
}

function generateHeroStat(data, metricConfig) {
  const p50 = data.percentiles.p50;
  const p10 = data.percentiles.p10;
  const p90 = data.percentiles.p90;

  if (data.metric === 'lcp_ms') {
    return {
      value: formatMs(p50),
      label: "Median LCP",
      context: `Top 10% achieve ${formatMs(p10)} or faster`
    };
  } else if (data.metric === 'pagespeed_score') {
    return {
      value: Math.round(p50).toString(),
      label: "Median PageSpeed",
      context: `Top 10% score ${Math.round(p90)}+ points`
    };
  } else if (data.metric === 'trust_gap_score') {
    return {
      value: Math.round(p50).toString(),
      label: "Median Trust Gap",
      context: `Best stores achieve ${Math.round(p10)} or lower`
    };
  }

  return {
    value: formatMetricValue(p50, data.metric),
    label: `Median ${data.metric_label}`,
    context: `Based on ${data.sample_size} stores analyzed`
  };
}

function generateKeyFindings(data, metricConfig) {
  const templates = metricConfig.keyFindingTemplates;
  // Pick 3-4 relevant findings
  return templates
    .slice(0, 4)
    .map(template => template(data))
    .filter(Boolean);
}

function generateSEO(data, metricConfig, nicheContext) {
  const title = `${data.metric_label} Benchmarks for Shopify ${data.niche_label} Stores (2026)`;

  // For "lower is better" metrics, show p10 as top performers; for "higher is better", show p90
  const topPerformerValue = metricConfig.goodDirection === 'lower'
    ? formatMetricValue(data.percentiles.p10, data.metric)
    : formatMetricValue(data.percentiles.p90, data.metric);

  const metaDescription = `How does your ${nicheContext.industry} store compare? See ${data.metric_label.toLowerCase()} benchmarks from ${data.sample_size} Shopify ${data.niche_label.toLowerCase()} stores. Median: ${formatMetricValue(data.percentiles.p50, data.metric)}, Top 10%: ${topPerformerValue}.`;

  const keywords = [
    `shopify ${data.niche.toLowerCase()} benchmark`,
    `${data.metric_label.toLowerCase()} shopify`,
    `${data.niche_label.toLowerCase()} store performance`,
    `ecommerce ${data.metric.replace(/_/g, ' ')} benchmark`,
    `shopify speed benchmarks`,
    `${data.niche_label.toLowerCase()} ecommerce statistics`,
    `shopify store analytics`
  ];

  return { title, meta_description: metaDescription, keywords };
}

function generateRelatedBenchmarks(data, allSlugs) {
  const related = [];
  const currentMetric = data.metric;
  const currentNiche = data.niche;

  // Add other metrics for same niche
  const sameNicheOtherMetrics = allSlugs
    .filter(s => s.includes(currentNiche) && !s.includes(currentMetric.replace('_score', '').replace('_ms', '')))
    .slice(0, 2);

  // Add same metric for related niches
  const RELATED_NICHES = {
    fashion: ['shoes', 'jewelry', 'luxury'],
    electronics: ['gadgets', 'office'],
    beauty: ['skincare', 'haircare'],
    fitness: ['sports', 'supplements'],
    kids: ['baby', 'toys'],
    food: ['tea', 'supplements'],
    home_decor: ['furniture', 'kitchen'],
  };

  const relatedNiches = RELATED_NICHES[currentNiche] || [];
  const sameMetricRelatedNiches = allSlugs
    .filter(s => {
      const slugMetric = currentMetric.replace('_score', '').replace('_ms', '');
      return s.includes(slugMetric) && relatedNiches.some(n => s.includes(n));
    })
    .slice(0, 2);

  return [...sameNicheOtherMetrics, ...sameMetricRelatedNiches].map(slug => {
    const parts = slug.replace('shopify-', '').split('-');
    const metric = parts[0];
    // Handle multi-word slugs like "trust-gaps-fashion" -> niche is "fashion"
    let niche;
    if (metric === 'trust') {
      niche = parts.slice(2).join('-'); // skip "trust" and "gaps"
    } else {
      niche = parts.slice(1).join('-');
    }
    const metricLabel = metric === 'lcp' ? 'LCP' : metric === 'pagespeed' ? 'PageSpeed' : 'Trust Gap';
    const nicheLabel = niche.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return {
      slug,
      title: `${metricLabel} - ${nicheLabel}`
    };
  });
}

function generateJsonLd(data, nicheContext) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": `${data.metric_label} Benchmarks for Shopify ${data.niche_label} Stores`,
    "description": `Performance benchmark data for ${data.sample_size} Shopify stores in the ${nicheContext.industry} industry, measuring ${data.metric_label.toLowerCase()}.`,
    "url": `https://boostra.io/benchmarks/${data.slug}`,
    "dateModified": data.data_date,
    "creator": {
      "@type": "Organization",
      "name": "Boostra",
      "url": "https://boostra.io"
    },
    "distribution": {
      "@type": "DataDownload",
      "contentUrl": `https://boostra.io/benchmarks/${data.slug}`,
      "encodingFormat": "text/html"
    },
    "variableMeasured": {
      "@type": "PropertyValue",
      "name": data.metric_label,
      "value": data.percentiles.p50,
      "description": `Median ${data.metric_label.toLowerCase()} across ${data.sample_size} stores`
    }
  };
}

// Main enrichment function
function enrichBenchmark(filePath, allSlugs) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const metricConfig = METRIC_CONTENT[data.metric];
  const nicheContext = NICHE_CONTEXT[data.niche] || {
    industry: data.niche_label.toLowerCase(),
    typical_products: "products",
    audience: "shoppers"
  };

  if (!metricConfig) {
    console.warn(`No metric config for: ${data.metric}`);
    return data;
  }

  // Enrich the data
  const enriched = {
    ...data,
    content_generated_at: new Date().toISOString(),
    last_updated: new Date().toISOString(),
    version: 1,
    seo: generateSEO(data, metricConfig, nicheContext),
    content: {
      hero_stat: generateHeroStat(data, metricConfig),
      key_findings: generateKeyFindings(data, metricConfig),
      how_to_improve: metricConfig.improvementTips,
    },
    related_benchmarks: generateRelatedBenchmarks(data, allSlugs),
    jsonld: generateJsonLd(data, nicheContext)
  };

  return enriched;
}

// Run the enrichment
function main() {
  console.log('Enriching benchmark files...\n');

  const files = fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.json'));
  const allSlugs = files.map(f => f.replace('.json', ''));

  let enrichedCount = 0;

  for (const file of files) {
    const filePath = path.join(PAGES_DIR, file);
    try {
      const enriched = enrichBenchmark(filePath, allSlugs);
      fs.writeFileSync(filePath, JSON.stringify(enriched, null, 2));
      console.log(`✓ Enriched: ${file}`);
      enrichedCount++;
    } catch (error) {
      console.error(`✗ Error enriching ${file}:`, error.message);
    }
  }

  console.log(`\nEnriched ${enrichedCount} of ${files.length} benchmark files.`);
}

main();
