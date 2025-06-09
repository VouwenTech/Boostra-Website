import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingTier = ({ 
  name, 
  description, 
  price, 
  originalPrice,
  features, 
  popular = false 
}: {
  name: string,
  description: string,
  price: string,
  originalPrice?: string,
  features: string[],
  popular?: boolean
}) => {
  return (
    <div className={`rounded-2xl p-8 ${popular ? 'border-2 border-boostra-blue shadow-lg' : 'border border-gray-200'} relative`}>
      {popular && (
        <div className="absolute -top-4 right-8">
          <span className="bg-boostra-red text-white px-4 py-1 rounded-full text-sm font-medium">
            Special Offer
          </span>
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <p className="text-boostra-gray">{description}</p>
      </div>
      <div className="mb-6">
        {originalPrice && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-semibold text-boostra-gray line-through">${originalPrice}</span>
            <span className="bg-boostra-red text-white px-2 py-1 rounded text-sm font-medium">Save $1,500</span>
          </div>
        )}
        <span className="text-4xl font-bold">{price}</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="rounded-full bg-boostra-light-blue p-1 mt-0.5">
              <Check size={12} className="text-boostra-blue" />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button 
        className={`w-full ${popular ? 'bg-boostra-red text-white hover:bg-boostra-bright-red' : 'bg-boostra-blue text-white hover:bg-boostra-blue/90'} rounded-full`}
      >
        Get Started
      </Button>
    </div>
  );
};

const Pricing = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <div className="py-20 md:py-32 bg-hero-pattern">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6 inline-block">
                <span className="badge">PRICING</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-boostra-dark leading-tight">
                CRO Audit 
                <span className="text-boostra-red"> Packages</span>
              </h1>
              <p className="text-lg md:text-xl text-boostra-gray mb-10 max-w-2xl mx-auto">
                Get expert conversion rate optimization insights for your Shopify store. Choose the audit that fits your needs.
              </p>
            </div>
          </div>
        </div>
        
        <section className="py-16 md:py-24">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <PricingTier 
                name="Mini CRO Audit" 
                description="Perfect for quick wins and targeted improvements"
                price="$750"
                features={[
                  "Homepage audit",
                  "One landing page audit",
                  "No additional access required",
                  "5-6 actionable recommendations",
                  "Detailed report with findings",
                  "Email support"
                ]}
              />
              <PricingTier 
                name="Full CRO Audit" 
                description="Comprehensive site analysis with advanced insights"
                price="$2,000"
                originalPrice="3,500"
                features={[
                  "Comprehensive site audit",
                  "Microsoft Clarity heatmap analysis",
                  "GA4 & Shopify Analytics review",
                  "30-50 detailed recommendations",
                  "Key A/B testing ideas",
                  "Implementation roadmap",
                  "Priority support & consultation call"
                ]}
                popular
              />
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-boostra-gray mb-8">
                Need help choosing the right audit for your store?
              </p>
              <Button className="rounded-full bg-boostra-blue text-white hover:bg-boostra-blue/90 px-8 py-6 text-lg">
                Schedule a Free Consultation
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
