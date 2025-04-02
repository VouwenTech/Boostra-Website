
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingTier = ({ 
  name, 
  description, 
  price, 
  features, 
  popular = false 
}: {
  name: string,
  description: string,
  price: string,
  features: string[],
  popular?: boolean
}) => {
  return (
    <div className={`rounded-2xl p-8 ${popular ? 'border-2 border-boostra-blue shadow-lg' : 'border border-gray-200'} relative`}>
      {popular && (
        <div className="absolute -top-4 right-8">
          <span className="bg-boostra-blue text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <p className="text-boostra-gray">{description}</p>
      </div>
      <div className="mb-6">
        <span className="text-4xl font-bold">{price}</span>
        <span className="text-boostra-gray">/month</span>
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
        className={`w-full ${popular ? 'bg-boostra-blue text-white hover:bg-boostra-blue/90' : 'bg-white border border-boostra-blue text-boostra-blue hover:bg-boostra-light-blue'} rounded-full`}
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
                Simple, Transparent 
                <span className="gradient-text"> Pricing</span>
              </h1>
              <p className="text-lg md:text-xl text-boostra-gray mb-10 max-w-2xl mx-auto">
                Choose the right plan for your Shopify store's needs. All plans include our core analytics and optimization expertise.
              </p>
            </div>
          </div>
        </div>
        
        <section className="py-16 md:py-24">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <PricingTier 
                name="Starter" 
                description="Perfect for new Shopify stores"
                price="$997"
                features={[
                  "Initial store audit",
                  "Basic analytics setup",
                  "3 key page optimizations",
                  "Monthly performance report",
                  "Email support"
                ]}
              />
              <PricingTier 
                name="Growth" 
                description="For established stores ready to scale"
                price="$1,997"
                features={[
                  "Comprehensive store audit",
                  "Advanced analytics setup",
                  "6 key page optimizations",
                  "A/B testing program",
                  "Bi-weekly performance reports",
                  "Priority email & chat support"
                ]}
                popular
              />
              <PricingTier 
                name="Enterprise" 
                description="Custom solutions for high-volume stores"
                price="$3,997"
                features={[
                  "End-to-end store optimization",
                  "Custom analytics dashboard",
                  "Unlimited page optimizations",
                  "Continuous A/B testing program",
                  "Weekly strategy calls",
                  "24/7 priority support",
                  "Dedicated account manager"
                ]}
              />
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-boostra-gray mb-8">
                Need a custom solution for your specific needs?
              </p>
              <Button className="rounded-full bg-boostra-blue text-white hover:bg-boostra-blue/90 px-8 py-6 text-lg">
                Contact Us for Custom Pricing
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
