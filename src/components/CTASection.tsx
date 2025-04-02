
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-boostra-dark">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <span className="badge bg-boostra-blue/20 text-white mb-4">GET STARTED</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Boost Your Shopify Store's Performance?
          </h2>
          <p className="text-lg text-gray-300 mb-10">
            Take the first step toward optimizing your store with our free conversion audit. Find out exactly where your store is leaving money on the table.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="rounded-full bg-boostra-blue text-white hover:bg-boostra-blue/90 px-8 py-6 text-lg">
              Book a Free Audit
              <ArrowRight className="ml-2" size={18} />
            </Button>
            <Button variant="outline" className="rounded-full border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
              Talk to an Expert
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
