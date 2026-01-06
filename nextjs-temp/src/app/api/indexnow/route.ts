import { NextRequest, NextResponse } from "next/server";

/**
 * IndexNow API Route
 *
 * IndexNow is a protocol that enables websites to notify search engines about
 * content changes instantly, rather than waiting for crawlers to discover updates.
 *
 * Supported search engines: Bing, Yandex, Seznam, Naver
 *
 * Setup: Already configured with key in .env.local
 * Key verification file: /public/394499ec1f89ed394c189efc72b4f050.txt
 *
 * Usage:
 * POST /api/indexnow
 * Body: { "urls": ["https://boostra.agency/benchmarks/shopify-lcp-fashion", ...] }
 *
 * Example with curl:
 * curl -X POST https://boostra.agency/api/indexnow \
 *   -H "Content-Type: application/json" \
 *   -d '{"urls": ["https://boostra.agency/benchmarks/shopify-lcp-fashion"]}'
 */

const INDEXNOW_KEY = process.env.INDEXNOW_KEY;
const SITE_HOST = "boostra.agency";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export async function POST(request: NextRequest) {
  // Check if IndexNow key is configured
  if (!INDEXNOW_KEY) {
    return NextResponse.json(
      {
        error: "IndexNow key not configured",
        message: "Add INDEXNOW_KEY to your environment variables"
      },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { urls } = body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: "Invalid request", message: "Provide an array of URLs to submit" },
        { status: 400 }
      );
    }

    // Validate URLs belong to our domain
    const validUrls = urls.filter((url: string) => {
      try {
        const parsed = new URL(url);
        return parsed.hostname === SITE_HOST;
      } catch {
        return false;
      }
    });

    if (validUrls.length === 0) {
      return NextResponse.json(
        { error: "No valid URLs", message: "All URLs must be from boostra.agency" },
        { status: 400 }
      );
    }

    // Submit to IndexNow
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        host: SITE_HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`,
        urlList: validUrls,
      }),
    });

    if (response.ok || response.status === 202) {
      return NextResponse.json({
        success: true,
        message: `Successfully submitted ${validUrls.length} URLs to IndexNow`,
        urls: validUrls,
      });
    } else {
      const errorText = await response.text();
      return NextResponse.json(
        {
          error: "IndexNow submission failed",
          status: response.status,
          message: errorText
        },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("IndexNow API error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: String(error) },
      { status: 500 }
    );
  }
}

// GET endpoint to check configuration status
export async function GET() {
  return NextResponse.json({
    configured: !!INDEXNOW_KEY,
    host: SITE_HOST,
    endpoint: INDEXNOW_ENDPOINT,
    instructions: INDEXNOW_KEY
      ? "IndexNow is configured. POST URLs to this endpoint to submit them."
      : "Add INDEXNOW_KEY to your environment variables to enable IndexNow.",
  });
}
