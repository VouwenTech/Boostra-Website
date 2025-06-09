
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutHero = () => {
  return (
    <section className="py-20 md:py-32 bg-hero-pattern">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <span className="badge">ABOUT US</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-boostra-dark leading-tight">
            About 
            <span className="gradient-text"> Boostra</span>
          </h1>
          <div className="text-lg md:text-xl text-boostra-gray mb-10 max-w-3xl mx-auto text-left">
            <p className="mb-6">
              At Boostra, we specialize in uncovering the hidden revenue potential in Shopify stores around the globe. Our expert-led CRO audits are designed to identify exactly what's preventing your visitors from converting—and provide a clear, data-driven roadmap to fix it.
            </p>
            <p className="mb-6">
              We don't believe in guesswork, either. Every recommendation we make is backed by analytics, user behavior insights, and industry best practices. Whether you're looking for a quick-win Mini Audit or a deep-dive Full CRO Audit, we deliver actionable insights that drive real, measurable growth.
            </p>
            <p className="mb-6">
              We work with ambitious eCommerce brands, helping them fine-tune their stores for maximum conversions, higher AOV, and long-term customer retention. No fluff, no generic advice—just clear, strategic improvements that move the needle.
            </p>
            <p className="mb-6">
              If you're serious about turning more visitors into customers, let's talk.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/services">
              <Button className="rounded-full bg-boostra-blue text-white hover:bg-boostra-blue/90 px-8 py-6 text-lg">
                View Our Services
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" className="rounded-full border-boostra-blue text-boostra-blue hover:bg-boostra-light-blue px-8 py-6 text-lg">
                See Pricing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
