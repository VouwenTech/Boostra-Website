
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CaseStudyCard = ({ title, category, improvement, image }: {
  title: string,
  category: string,
  improvement: string,
  image: string
}) => {
  return (
    <Card className="overflow-hidden border-none rounded-2xl shadow-sm card-hover">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="p-6">
        <div className="mb-3">
          <span className="badge">{category}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-boostra-gray mb-4">{improvement}</p>
        <Button variant="ghost" className="text-boostra-blue p-0 hover:bg-transparent hover:text-boostra-blue/80 flex items-center gap-2">
          View Case Study
          <ArrowRight size={16} />
        </Button>
      </CardContent>
    </Card>
  );
};

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <div className="py-20 md:py-32 bg-hero-pattern">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6 inline-block">
                <span className="badge">CASE STUDIES</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-boostra-dark leading-tight">
                See Our 
                <span className="gradient-text"> Real Results</span>
              </h1>
              <p className="text-lg md:text-xl text-boostra-gray mb-10 max-w-2xl mx-auto">
                Explore how we've helped Shopify store owners transform their businesses through data-driven optimization strategies.
              </p>
            </div>
          </div>
        </div>
        
        <section className="py-16 md:py-24">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <CaseStudyCard 
                title="Fashion Boutique Conversion Rate Boost"
                category="FASHION"
                improvement="42% increase in conversion rate in 60 days"
                image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop"
              />
              <CaseStudyCard 
                title="Home Goods Store Cart Abandonment Reduction"
                category="HOME GOODS"
                improvement="35% decrease in cart abandonment rate"
                image="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop"
              />
              <CaseStudyCard 
                title="Organic Foods Revenue Growth"
                category="FOOD & BEVERAGE"
                improvement="28% increase in average order value"
                image="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop"
              />
              <CaseStudyCard 
                title="Beauty Brand Email Optimization"
                category="BEAUTY"
                improvement="53% improvement in email conversion rates"
                image="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop"
              />
              <CaseStudyCard 
                title="Electronics Store Checkout Optimization"
                category="ELECTRONICS"
                improvement="47% reduction in checkout abandonment"
                image="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=600&auto=format&fit=crop"
              />
              <CaseStudyCard 
                title="Fitness Brand Mobile Conversion Boost"
                category="FITNESS"
                improvement="62% increase in mobile conversions"
                image="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudies;
