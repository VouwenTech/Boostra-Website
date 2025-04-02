
import { BarChart3, LineChart, MousePointer, ShoppingBag, Rocket, Megaphone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ServiceCard = ({ icon, title, description }: {
  icon: React.ReactNode,
  title: string,
  description: string
}) => {
  return (
    <Card className="border border-gray-100 rounded-2xl overflow-hidden card-hover">
      <CardContent className="p-6">
        <div className="mb-4 p-3 bg-boostra-light-yellow inline-block rounded-lg">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-boostra-gray">{description}</p>
      </CardContent>
    </Card>
  );
};

const ServicesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="badge mb-4">OUR SERVICES</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-boostra-dark">
            Comprehensive CRO & Analytics Solutions
          </h2>
          <p className="text-lg text-boostra-gray">
            We specialize in data-driven strategies that transform your Shopify store's performance and drive sustainable growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            icon={<BarChart3 className="text-boostra-dark" size={24} />}
            title="Analytics Setup & Tracking"
            description="We implement robust analytics systems to track user behavior, sales funnels, and key metrics that drive business decisions."
          />
          <ServiceCard
            icon={<MousePointer className="text-boostra-dark" size={24} />}
            title="Conversion Rate Optimization"
            description="Through methodical A/B testing and data analysis, we optimize your store to convert more visitors into paying customers."
          />
          <ServiceCard
            icon={<ShoppingBag className="text-boostra-dark" size={24} />}
            title="Shopify Store Audits"
            description="Comprehensive evaluation of your store's UX, checkout process, and technical performance to identify improvement opportunities."
          />
          <ServiceCard
            icon={<LineChart className="text-boostra-dark" size={24} />}
            title="Performance Monitoring"
            description="Continuous monitoring of KPIs and performance metrics with regular reports to track growth and identify issues."
          />
          <ServiceCard
            icon={<Rocket className="text-boostra-dark" size={24} />}
            title="Growth Strategy"
            description="Custom growth roadmaps based on your specific business goals, market position, and customer segments."
          />
          <ServiceCard
            icon={<Megaphone className="text-boostra-dark" size={24} />}
            title="Marketing Optimization"
            description="Refine your marketing channels and campaigns using data-driven insights to maximize ROI and customer acquisition."
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
