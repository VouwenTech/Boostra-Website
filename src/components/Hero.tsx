
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="py-20 md:py-32 bg-hero-pattern">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <span className="badge">SHOPIFY SPECIALISTS</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-boostra-dark leading-tight">
            Turn Your Shopify Store Into a 
            <span className="gradient-text"> Conversion Machine</span>
          </h1>
          <p className="text-lg md:text-xl text-boostra-gray mb-10 max-w-2xl mx-auto">
            We help Shopify store owners optimize their websites through data-driven strategies to increase conversions, revenue, and customer satisfaction.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="rounded-full bg-boostra-blue text-white hover:bg-boostra-blue/90 px-8 py-6 text-lg">
              Book a Free Audit
            </Button>
            <Button variant="outline" className="rounded-full border-boostra-blue text-boostra-blue hover:bg-boostra-light-blue px-8 py-6 text-lg">
              View Case Studies
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
