
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Testimonial = {
  id: number;
  name: string;
  position: string;
  company: string;
  image: string;
  stars: number;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Founder",
    company: "Fashion Boutique",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop",
    stars: 5,
    quote: "Boostra completely transformed our Shopify store. We saw a 42% increase in conversion rate within just two months of implementing their recommendations. Their data-driven approach was exactly what we needed."
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Marketing Director",
    company: "Home Goods Co.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop",
    stars: 5,
    quote: "I was impressed by how thoroughly the Boostra team analyzed our customer journey. They identified critical conversion bottlenecks we'd been missing for years. Our cart abandonment rate decreased by 35% after working with them."
  },
  {
    id: 3,
    name: "Emma Wilson",
    position: "E-commerce Manager",
    company: "Organic Foods",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&auto=format&fit=crop",
    stars: 5,
    quote: "The analytics implementation and dashboard Boostra created gave us visibility into customer behavior we never had before. Now we make decisions based on real data instead of gut feelings. Our average order value is up 28%."
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="badge mb-4">TESTIMONIALS</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-boostra-dark">
            What Our Clients Say
          </h2>
          <p className="text-lg text-boostra-gray">
            Don't just take our word for it. Here's what store owners have to say about working with Boostra.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <Card className="border border-gray-100 shadow-sm overflow-hidden rounded-2xl">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="shrink-0">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].name}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-md"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex mb-4">
                    {[...Array(testimonials[activeIndex].stars)].map((_, i) => (
                      <Star key={i} size={20} className="fill-boostra-yellow text-boostra-yellow" />
                    ))}
                  </div>
                  <p className="text-lg md:text-xl mb-6 text-boostra-dark italic">
                    "{testimonials[activeIndex].quote}"
                  </p>
                  <div>
                    <h4 className="font-bold text-lg">{testimonials[activeIndex].name}</h4>
                    <p className="text-boostra-gray">
                      {testimonials[activeIndex].position}, {testimonials[activeIndex].company}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-center mt-8 gap-2">
            <Button 
              onClick={prevTestimonial}
              variant="outline" 
              size="icon" 
              className="rounded-full border-boostra-blue text-boostra-blue hover:bg-boostra-light-blue"
            >
              <ChevronLeft size={18} />
            </Button>
            <Button 
              onClick={nextTestimonial}
              variant="outline" 
              size="icon" 
              className="rounded-full border-boostra-blue text-boostra-blue hover:bg-boostra-light-blue"
            >
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
