
import { BarChart3, Zap, ShoppingBag, TrendingUp, Target, CheckSquare } from 'lucide-react';
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
            We specialize in data-driven strategies that transform your Shopify store&apos;s performance and drive sustainable growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            icon={<BarChart3 className="text-boostra-dark" size={24} />}
            title="CRO Audit"
            description="A full audit assessing your store's UX, checkout flow, and technical performance to identify conversion blockers and missed revenue opportunities, and giving you all the juicy data that comes along with it."
          />
          <ServiceCard
            icon={<Zap className="text-boostra-dark" size={24} />}
            title="Mini Audit"
            description="A small audit focusing on the Homepage and one landing page (of your choice) that will pinpoint quick wins and low-effort improvements to increase conversions. This one is perfect for stores looking for actionable insights without a deep dive."
          />
          <ServiceCard
            icon={<ShoppingBag className="text-boostra-dark" size={24} />}
            title="Checkout & Mobile Optimization"
            description="Included in the full CRO Audit, we conduct a specialized analysis of your checkout process and mobile experience to reduce friction, decrease cart abandonment, and improve your conversion rates."
          />
          <ServiceCard
            icon={<Target className="text-boostra-dark" size={24} />}
            title="Data-Driven Insights & Recommendations"
            description="We analyze user behavior, heatmaps, and session recordings throughout the full CRO Audit to provide data-backed recommendations tailored to your store's unique challenges and goals."
          />
          <ServiceCard
            icon={<TrendingUp className="text-boostra-dark" size={24} />}
            title="Revenue Growth Strategy"
            description="Based on the audit findings in the CRO Audit, we'll outline strategic recommendations to help you increase your Average Order Value (AOV), reduce churn, and improve customer retention."
          />
          <ServiceCard
            icon={<CheckSquare className="text-boostra-dark" size={24} />}
            title="Priority Action Plan"
            description="We'll give you a structured, step-by-step action plan, ensuring you have a clear roadmap to implement all the necessary changes for better conversions."
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
