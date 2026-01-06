#!/usr/bin/env node

/**
 * Submit all benchmark pages to IndexNow for instant indexing
 * Submits to: Bing, Yandex, Seznam, Naver
 *
 * Usage: node scripts/submit-indexnow.js
 */

const fs = require('fs');
const path = require('path');

const INDEXNOW_KEY = '394499ec1f89ed394c189efc72b4f050';
const SITE_HOST = 'boostra.agency';
const KEY_LOCATION = `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`;

// All IndexNow-compatible search engines
const SEARCH_ENGINES = [
  { name: 'Bing/IndexNow API', endpoint: 'https://api.indexnow.org/indexnow' },
  { name: 'Bing', endpoint: 'https://www.bing.com/indexnow' },
  { name: 'Yandex', endpoint: 'https://yandex.com/indexnow' },
  { name: 'Seznam', endpoint: 'https://search.seznam.cz/indexnow' },
  { name: 'Naver', endpoint: 'https://searchadvisor.naver.com/indexnow' },
];

async function getAllBenchmarkUrls() {
  const manifestPath = path.join(__dirname, '..', 'data', 'benchmarks', 'manifest.json');

  if (!fs.existsSync(manifestPath)) {
    throw new Error('Manifest file not found. Run enrichment script first.');
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

  // Generate URLs for all benchmark pages
  const benchmarkUrls = manifest.pages.map(page =>
    `https://${SITE_HOST}/benchmarks/${page.slug}`
  );

  // Add main pages
  const mainPages = [
    `https://${SITE_HOST}`,
    `https://${SITE_HOST}/benchmarks`,
    `https://${SITE_HOST}/about`,
    `https://${SITE_HOST}/services`,
    `https://${SITE_HOST}/pricing`,
    `https://${SITE_HOST}/contact`,
    `https://${SITE_HOST}/case-studies`,
  ];

  return [...mainPages, ...benchmarkUrls];
}

async function submitToSearchEngine(engine, urls) {
  const payload = {
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  try {
    const response = await fetch(engine.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    const status = response.status;
    let result;

    if (status === 200) {
      result = '✓ Submitted successfully';
    } else if (status === 202) {
      result = '✓ Accepted (key validation pending)';
    } else if (status === 400) {
      result = '✗ Bad request (invalid format)';
    } else if (status === 403) {
      result = '✗ Forbidden (key not valid)';
    } else if (status === 422) {
      result = '✗ Unprocessable (URLs don\'t match host)';
    } else if (status === 429) {
      result = '✗ Too many requests (rate limited)';
    } else {
      result = `? Unknown response (${status})`;
    }

    console.log(`  ${engine.name}: ${result}`);
    return { engine: engine.name, status, success: status === 200 || status === 202 };
  } catch (error) {
    console.log(`  ${engine.name}: ✗ Error - ${error.message}`);
    return { engine: engine.name, status: 0, success: false, error: error.message };
  }
}

async function main() {
  console.log('IndexNow Bulk Submission');
  console.log('========================\n');

  // Get all URLs
  const urls = await getAllBenchmarkUrls();
  console.log(`Found ${urls.length} URLs to submit:\n`);
  console.log(`  - 7 main pages`);
  console.log(`  - ${urls.length - 7} benchmark pages\n`);

  console.log('Submitting to search engines...\n');

  const results = [];

  for (const engine of SEARCH_ENGINES) {
    const result = await submitToSearchEngine(engine, urls);
    results.push(result);
    // Small delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n========================');
  const successful = results.filter(r => r.success).length;
  console.log(`\nCompleted: ${successful}/${SEARCH_ENGINES.length} search engines accepted submissions`);

  if (successful > 0) {
    console.log('\nURLs should appear in search results within minutes to hours.');
  }
}

main().catch(console.error);
