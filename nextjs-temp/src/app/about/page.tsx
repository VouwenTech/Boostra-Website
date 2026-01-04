import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AboutHero from "@/components/AboutHero";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Boostra - we specialize in uncovering the hidden revenue potential in Shopify stores through expert-led CRO audits.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <AboutHero />
      </main>
      <Footer />
    </div>
  );
}
