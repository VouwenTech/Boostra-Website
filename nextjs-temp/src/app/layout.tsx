import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Boostra - CRO & Analytics for Shopify Stores",
    template: "%s | Boostra",
  },
  description: "Data-driven CRO audits and benchmarks for Shopify merchants. Compare your store against thousands of others in your niche.",
  metadataBase: new URL("https://boostra.agency"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://boostra.agency",
    siteName: "Boostra",
    title: "Boostra - CRO & Analytics for Shopify Stores",
    description: "Data-driven CRO audits and benchmarks for Shopify merchants.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boostra - CRO & Analytics for Shopify Stores",
    description: "Data-driven CRO audits and benchmarks for Shopify merchants.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
