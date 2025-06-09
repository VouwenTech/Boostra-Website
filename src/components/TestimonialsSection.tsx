
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type Testimonial = {
  id: number;
  title: string;
  company: string;
  stars: number;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    title: "Head of eCommerce",
    company: "DTC Brand (US)",
    stars: 5,
    quote: "I was genuinely impressed by how detailed the Boostra audit was. It didn't just highlight what was wrong, it explained why it mattered and exactly how to fix it. We'd done CRO work before, but this was on another level. Super insightful, and easy to action."
  },
  {
    id: 2,
    title: "eCommerce Manager",
    company: "Lifestyle Brand (UK)",
    stars: 5,
    quote: "The audit from Boostra cut straight to the point. There was no fluff, just actionable advice. The mobile UX section alone gave us a whole list of quick wins we'd completely overlooked. Easily one of the best value investments we've made this quarter."
  }
];

const TestimonialsSection = () => {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border border-gray-100 shadow-sm overflow-hidden rounded-2xl">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} size={20} className="fill-boostra-yellow text-boostra-yellow" />
                  ))}
                </div>
                <p className="text-lg mb-6 text-boostra-dark italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="text-boostra-gray">
                    — {testimonial.title}, {testimonial.company}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
