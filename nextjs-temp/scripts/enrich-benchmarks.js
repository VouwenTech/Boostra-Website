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

// Niche-specific FAQ content for unique questions per industry
const NICHE_FAQ_CONTEXT = {
  fashion: {
    lcp_ms: "Fashion shoppers are highly visual and expect to see product images quickly. A slow-loading hero image or lookbook can cause immediate abandonment, especially on mobile where most fashion browsing occurs.",
    pagespeed_score: "Fashion ecommerce is intensely competitive, with shoppers comparing multiple stores before purchasing. A faster store creates a perception of professionalism and reliability that fashion-conscious buyers value.",
    trust_gap_score: "Fashion shoppers are particularly concerned about fit, quality, and authenticity. They need strong size guides, customer photos, and return policies to feel confident purchasing clothing they can't try on."
  },
  electronics: {
    lcp_ms: "Tech-savvy electronics shoppers have high expectations for website performance. They often compare specs across multiple sites, and a slow store signals outdated technology - the opposite of what they're looking to buy.",
    pagespeed_score: "Electronics buyers research extensively before purchasing. A high-performing store suggests technical competence and attention to detail - qualities that translate to better customer support and reliable products.",
    trust_gap_score: "Electronics purchases involve significant investment and technical risk. Shoppers need detailed specs, warranty information, authentic reviews, and proof of authorized dealer status to feel secure."
  },
  beauty: {
    lcp_ms: "Beauty shoppers browse visually, expecting high-quality product images to load instantly. Slow-loading swatches or before/after photos disrupt the discovery experience that drives beauty purchases.",
    pagespeed_score: "Beauty ecommerce relies heavily on visual storytelling. A fast, responsive store lets shoppers explore products naturally, increasing time on site and likelihood of purchase.",
    trust_gap_score: "Beauty products are personal and often expensive. Shoppers need ingredient lists, authentic reviews with photos, dermatologist endorsements, and clear return policies for products that may not work for their skin or preferences."
  },
  pet: {
    lcp_ms: "Pet owners shop with urgency - when their pet needs something, they need it fast. A slow-loading store can send them directly to a competitor or major retailer.",
    pagespeed_score: "Pet owners are loyal customers who make repeat purchases. A smooth, fast shopping experience builds the trust needed for them to return rather than defaulting to big-box alternatives.",
    trust_gap_score: "Pet owners treat their animals like family and scrutinize what they buy. They need ingredient sourcing information, safety certifications, and reviews from other pet owners to trust a new brand."
  },
  food: {
    lcp_ms: "Food shoppers often browse on mobile while in their kitchen or making shopping lists. Slow-loading product images interrupt their flow and send them to faster alternatives.",
    pagespeed_score: "Food ecommerce competes with the instant gratification of local stores. A fast, efficient online experience helps justify the wait time for delivery.",
    trust_gap_score: "Food purchases involve health and safety concerns. Shoppers need clear allergen information, sourcing details, freshness guarantees, and reviews about taste and quality."
  },
  jewelry: {
    lcp_ms: "Jewelry shoppers expect a premium experience that matches the products they're considering. Slow-loading high-resolution images undermine the luxury positioning of the brand.",
    pagespeed_score: "Jewelry is often purchased for special occasions with emotional weight. A smooth, elegant shopping experience reinforces the specialness of the purchase.",
    trust_gap_score: "Jewelry involves significant financial investment and concerns about authenticity. Shoppers need certifications, detailed metal and stone specifications, insurance options, and generous return policies."
  },
  fitness: {
    lcp_ms: "Fitness enthusiasts value efficiency and results. A slow website experience contradicts the performance mindset they bring to their workouts and purchasing decisions.",
    pagespeed_score: "Fitness shoppers are often motivated by goals and timelines. A fast store respects their time and signals a brand that understands their results-oriented mindset.",
    trust_gap_score: "Fitness products make performance claims that shoppers want verified. They need before/after results, athlete endorsements, ingredient transparency for supplements, and warranty information for equipment."
  },
  baby: {
    lcp_ms: "New parents are often sleep-deprived and shopping during stolen moments. A slow-loading store wastes their precious time and loses them to faster alternatives.",
    pagespeed_score: "Parents prioritize convenience and reliability when shopping for their children. A fast, easy-to-use store becomes a trusted go-to for repeat baby supply purchases.",
    trust_gap_score: "Parents are extremely protective and cautious about products for their babies. They need safety certifications, age appropriateness details, chemical-free claims verification, and reviews from other parents."
  },
  sustainable: {
    lcp_ms: "Eco-conscious shoppers often research multiple aspects of products. A slow site increases their overall time investment and may push them toward established sustainable marketplaces.",
    pagespeed_score: "Sustainable shoppers value efficiency and thoughtful design. A lean, fast website also suggests the brand practices efficiency in other areas of their business.",
    trust_gap_score: "Sustainable shoppers are skeptical of greenwashing. They need third-party certifications, detailed sourcing information, carbon footprint data, and transparent supply chain details."
  },
  luxury: {
    lcp_ms: "Luxury shoppers expect flawless experiences that match the premium positioning of the products. Any friction, including slow loading, diminishes the perceived value of the brand.",
    pagespeed_score: "Luxury ecommerce must replicate the attentive service of high-end retail. A fast, polished online experience demonstrates the brand's commitment to excellence.",
    trust_gap_score: "Luxury purchases involve significant investment and concerns about counterfeits. Shoppers need authenticity guarantees, provenance details, white-glove service options, and exclusive membership benefits."
  },
  skincare: {
    lcp_ms: "Skincare shoppers research ingredients and compare products extensively. Slow-loading product pages interrupt their research flow and reduce the depth of engagement.",
    pagespeed_score: "Skincare routines involve multiple products, meaning shoppers often view many pages per session. Fast page loads dramatically improve the multi-product browsing experience.",
    trust_gap_score: "Skincare involves applying products to your body with potential reactions. Shoppers need ingredient lists, clinical study results, dermatologist endorsements, and reviews from people with similar skin types."
  },
  supplements: {
    lcp_ms: "Supplement shoppers are often health-focused and time-conscious. They research thoroughly but decide quickly - a slow site loses them during the critical decision window.",
    pagespeed_score: "Supplement stores often have large catalogs. Fast page loads let shoppers efficiently compare products and read the detailed information they need.",
    trust_gap_score: "Supplements are ingested, making trust paramount. Shoppers need third-party testing results, FDA facility registrations, sourcing transparency, and reviews about effectiveness."
  },
  home_decor: {
    lcp_ms: "Home decor shopping is highly visual, with shoppers imagining products in their space. Slow-loading lifestyle images break the visualization experience.",
    pagespeed_score: "Decorating involves browsing many options before deciding. Fast page loads enable the exploratory browsing behavior that leads to larger purchases.",
    trust_gap_score: "Home decor involves significant investment and subjective taste. Shoppers need room scene photos, accurate color representation, quality close-ups, and easy returns for items that don't match their vision."
  },
  furniture: {
    lcp_ms: "Furniture shoppers need to see products from multiple angles with detail shots. Slow-loading images frustrate the detailed examination process essential for big-ticket purchases.",
    pagespeed_score: "Furniture purchases require extensive research given their cost and permanence. A fast site enables the thorough comparison shopping these decisions require.",
    trust_gap_score: "Furniture is expensive and difficult to return. Shoppers need assembly information, material quality details, durability guarantees, and white-glove delivery options."
  },
  watches: {
    lcp_ms: "Watch enthusiasts expect to examine timepieces in detail online. High-resolution images that load slowly frustrate the inspection process collectors value.",
    pagespeed_score: "Watch shoppers often compare specifications across multiple models. Fast page loads support the detailed comparison behavior of watch enthusiasts.",
    trust_gap_score: "Watches involve authentication concerns and significant investment. Collectors need provenance documentation, serial number verification, warranty transfers, and authentication guarantees."
  }
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
  // Pick 3-4 relevant findings and add source citation
  const findings = templates
    .slice(0, 4)
    .map(template => template(data))
    .filter(Boolean);

  // Add source citation to the end
  findings.push(`Source: Boostra analysis of ${data.sample_size} Shopify ${data.niche_label.toLowerCase()} stores, ${data.data_date}.`);

  return findings;
}

function generateFAQSchema(data, metricConfig, nicheContext) {
  const metricLabel = data.metric_label;
  const nicheLabel = data.niche_label;
  const niche = data.niche;

  // Get niche-specific FAQ context
  const nicheFAQ = NICHE_FAQ_CONTEXT[niche]?.[data.metric] || '';

  // For "lower is better" metrics, show p10 as top performers; for "higher is better", show p90
  const topPerformerValue = metricConfig.goodDirection === 'lower'
    ? formatMetricValue(data.percentiles.p10, data.metric)
    : formatMetricValue(data.percentiles.p90, data.metric);

  const questions = [
    {
      "@type": "Question",
      "name": `What is ${metricLabel}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": metricConfig.metricExplainer
      }
    },
    {
      "@type": "Question",
      "name": `Why does ${metricLabel} matter for ${nicheLabel.toLowerCase()} stores?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": nicheFAQ || `${metricConfig.metricExplainer} ${metricConfig.thresholdContext}`
      }
    },
    {
      "@type": "Question",
      "name": `What is a good ${metricLabel} for Shopify ${nicheLabel.toLowerCase()} stores?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Based on Boostra's analysis of ${data.sample_size} Shopify ${nicheLabel.toLowerCase()} stores, the median ${metricLabel.toLowerCase()} is ${formatMetricValue(data.percentiles.p50, data.metric)}. Top-performing stores in this niche (top 10%) achieve ${topPerformerValue}. ${metricConfig.thresholdContext}`
      }
    },
    {
      "@type": "Question",
      "name": `How can I improve my ${nicheLabel.toLowerCase()} store's ${metricLabel}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": metricConfig.improvementTips.slice(0, 4).join(". ") + ". For a personalized analysis of your store's specific issues and opportunities, consider a professional CRO audit."
      }
    },
    {
      "@type": "Question",
      "name": `How does my store compare to other ${nicheLabel.toLowerCase()} stores?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `You can compare your ${metricLabel.toLowerCase()} against our benchmarks. If your score is better than ${formatMetricValue(data.percentiles.p50, data.metric)} (the median), you're in the top half of ${nicheLabel.toLowerCase()} stores. If you're better than ${topPerformerValue}, you're among the top 10% performers in your industry.`
      }
    }
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions
  };
}

function generateSEO(data, metricConfig, nicheContext) {
  const title = `${data.metric_label} Benchmarks for Shopify ${data.niche_label} Stores (2026)`;

  // For "lower is better" metrics, show p10 as top performers; for "higher is better", show p90
  const topPerformerValue = metricConfig.goodDirection === 'lower'
    ? formatMetricValue(data.percentiles.p10, data.metric)
    : formatMetricValue(data.percentiles.p90, data.metric);

  // Enhanced meta description with audience-specific context and CTA
  const audienceCapitalized = nicheContext.audience.charAt(0).toUpperCase() + nicheContext.audience.slice(1);
  const metaDescription = `${audienceCapitalized} expect fast, trustworthy stores. See how ${data.sample_size} Shopify ${data.niche_label.toLowerCase()} stores perform on ${data.metric_label.toLowerCase()}. Median: ${formatMetricValue(data.percentiles.p50, data.metric)}, Top 10%: ${topPerformerValue}. Free benchmarks.`;

  // Enhanced keywords with more specific long-tail variations
  const keywords = [
    `shopify ${data.niche.toLowerCase()} ${data.metric_label.toLowerCase()} benchmark`,
    `${data.niche_label.toLowerCase()} store ${data.metric_label.toLowerCase()}`,
    `ecommerce ${data.metric_label.toLowerCase()} statistics 2026`,
    `shopify ${data.niche.toLowerCase()} performance data`,
    `best ${data.metric_label.toLowerCase()} for ${data.niche.toLowerCase()} stores`,
    `${data.niche_label.toLowerCase()} shopify optimization`,
    `how to improve ${data.metric_label.toLowerCase()} shopify`,
    `${data.niche_label.toLowerCase()} ecommerce benchmarks`
  ];

  return { title, meta_description: metaDescription, keywords };
}

function generateRelatedBenchmarks(data, allSlugs, allBenchmarksData) {
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
    jewelry: ['fashion', 'luxury', 'watches'],
    luxury: ['jewelry', 'fashion', 'watches'],
    pet: ['baby', 'food'],
    skincare: ['beauty', 'haircare'],
    supplements: ['fitness', 'food'],
    watches: ['jewelry', 'luxury'],
    furniture: ['home_decor', 'kitchen'],
    kitchen: ['home_decor', 'furniture'],
    sports: ['fitness'],
    automotive: ['gadgets', 'office'],
    art: ['crafts', 'home_decor'],
    crafts: ['art', 'kids'],
    tea: ['food'],
    haircare: ['beauty', 'skincare'],
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

    // Try to get median value from the related benchmark data for richer anchor text
    const relatedData = allBenchmarksData[slug];
    let anchorText = `${nicheLabel} ${metricLabel.toLowerCase()} benchmarks`;
    if (relatedData?.percentiles?.p50) {
      const medianValue = formatMetricValue(relatedData.percentiles.p50, relatedData.metric);
      anchorText = `${nicheLabel} stores (median: ${medianValue})`;
    }

    return {
      slug,
      title: `${metricLabel} - ${nicheLabel}`,
      anchorText
    };
  });
}

function generateJsonLd(data, nicheContext) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": `${data.metric_label} Benchmarks for Shopify ${data.niche_label} Stores`,
    "description": `Performance benchmark data for ${data.sample_size} Shopify stores in the ${nicheContext.industry} industry, measuring ${data.metric_label.toLowerCase()}.`,
    "url": `https://boostra.agency/benchmarks/${data.slug}`,
    "dateModified": data.data_date,
    "creator": {
      "@type": "Organization",
      "name": "Boostra",
      "url": "https://boostra.agency"
    },
    "distribution": {
      "@type": "DataDownload",
      "contentUrl": `https://boostra.agency/benchmarks/${data.slug}`,
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

function generateBreadcrumbSchema(data) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://boostra.agency"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Benchmarks",
        "item": "https://boostra.agency/benchmarks"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${data.metric_label} - ${data.niche_label}`,
        "item": `https://boostra.agency/benchmarks/${data.slug}`
      }
    ]
  };
}

// Main enrichment function
function enrichBenchmark(filePath, allSlugs, allBenchmarksData) {
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

  // Enrich the data with all SEO schemas and content
  const enriched = {
    ...data,
    content_generated_at: new Date().toISOString(),
    last_updated: new Date().toISOString(),
    version: 2, // Bumped version for SEO enhancements
    seo: generateSEO(data, metricConfig, nicheContext),
    content: {
      hero_stat: generateHeroStat(data, metricConfig),
      key_findings: generateKeyFindings(data, metricConfig),
      how_to_improve: metricConfig.improvementTips,
    },
    related_benchmarks: generateRelatedBenchmarks(data, allSlugs, allBenchmarksData),
    // Structured data schemas
    jsonld: generateJsonLd(data, nicheContext),
    faqSchema: generateFAQSchema(data, metricConfig, nicheContext),
    breadcrumbSchema: generateBreadcrumbSchema(data)
  };

  return enriched;
}

// Run the enrichment
function main() {
  console.log('Enriching benchmark files with SEO schemas...\n');

  const files = fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.json'));
  const allSlugs = files.map(f => f.replace('.json', ''));

  // First pass: load all benchmark data for cross-referencing
  console.log('Loading all benchmark data for cross-referencing...');
  const allBenchmarksData = {};
  for (const file of files) {
    const filePath = path.join(PAGES_DIR, file);
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      allBenchmarksData[data.slug] = data;
    } catch (error) {
      console.error(`✗ Error loading ${file}:`, error.message);
    }
  }
  console.log(`Loaded ${Object.keys(allBenchmarksData).length} benchmarks.\n`);

  // Second pass: enrich all files
  let enrichedCount = 0;

  for (const file of files) {
    const filePath = path.join(PAGES_DIR, file);
    try {
      const enriched = enrichBenchmark(filePath, allSlugs, allBenchmarksData);
      fs.writeFileSync(filePath, JSON.stringify(enriched, null, 2));
      console.log(`✓ Enriched: ${file}`);
      enrichedCount++;
    } catch (error) {
      console.error(`✗ Error enriching ${file}:`, error.message);
    }
  }

  console.log(`\n✓ Enriched ${enrichedCount} of ${files.length} benchmark files.`);
  console.log('\nSchemas added:');
  console.log('  • Dataset (jsonld)');
  console.log('  • FAQPage (faqSchema)');
  console.log('  • BreadcrumbList (breadcrumbSchema)');
}

main();
