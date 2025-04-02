
import { Button } from '@/components/ui/button';
import handDrawnArrow from '../assets/hand-drawn-arrow.svg';
import handDrawnCircle from '../assets/hand-drawn-circle.svg';

const Hero = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-red-50 via-white to-blue-50 opacity-80 -z-10"></div>
      
      {/* Hand-drawn elements */}
      <img src={handDrawnCircle} alt="" className="absolute top-20 right-10 w-28 h-28 animate-pulse opacity-70 -z-5" />
      <img src={handDrawnArrow} alt="" className="absolute bottom-20 left-10 w-32 h-24 transform rotate-12 opacity-80 -z-5" />
      
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <div className="mb-6 inline-block">
              <span className="badge">SHOPIFY SPECIALISTS</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-boostra-dark leading-tight">
              Turn Your Shopify Store Into a 
              <span className="text-red-600 font-bold"> Conversion Machine</span>
            </h1>
            <p className="text-lg md:text-xl text-boostra-gray mb-10 max-w-2xl">
              We help Shopify store owners optimize their websites through data-driven strategies to increase conversions, revenue, and customer satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="rounded-full bg-red-600 text-white hover:bg-red-700 px-8 py-6 text-lg shadow-lg hover:-translate-y-1 transition-all">
                Book a Free Audit
              </Button>
              <Button variant="outline" className="rounded-full border-boostra-blue text-boostra-blue hover:bg-boostra-light-blue px-8 py-6 text-lg">
                View Case Studies
              </Button>
            </div>
          </div>
          
          <div className="order-1 md:order-2 relative">
            <div className="bg-white p-4 rounded-lg shadow-lg transform rotate-2 mb-6 max-w-md mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1573164574511-73c773193279?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Shopify store owner working on analytics" 
                className="rounded-md w-full h-auto"
              />
              <div className="absolute -bottom-4 -right-4 bg-red-600 text-white text-sm px-4 py-2 rounded-full transform rotate-3">
                +127% conversion rate
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 p-4 bg-blue-100 rounded-lg shadow-md transform -rotate-3 hidden md:block">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-semibold">Revenue up 43%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
