
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Services = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <div className="py-20 md:py-32 bg-hero-pattern">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6 inline-block">
                <span className="badge">OUR SERVICES</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-boostra-dark leading-tight">
                Optimize Your Shopify Store for 
                <span className="gradient-text"> Maximum Performance</span>
              </h1>
              <p className="text-lg md:text-xl text-boostra-gray mb-10 max-w-2xl mx-auto">
                We offer comprehensive CRO and analytics services designed specifically for Shopify store owners who want to maximize their conversion rates.
              </p>
            </div>
          </div>
        </div>
        <ServicesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
