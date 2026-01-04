
import { ArrowUpRight, Users, ShoppingCart, TrendingUp, Zap } from 'lucide-react';

const StatsCard = ({ icon, title, value, description }: { 
  icon: React.ReactNode, 
  title: string, 
  value: string, 
  description: string 
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm card-hover">
      <div className="mb-4 p-3 bg-boostra-light-blue inline-block rounded-lg">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-boostra-gray mb-2">{title}</h3>
      <p className="text-3xl font-bold mb-2">{value}</p>
      <p className="text-boostra-gray">{description}</p>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="badge mb-4">OUR IMPACT</span>
            <h2 className="text-3xl md:text-4xl font-bold text-boostra-dark">
              Real Results for Shopify Stores
            </h2>
          </div>
          <div className="hidden md:block">
            <a href="/case-studies" className="text-boostra-blue font-medium flex items-center gap-2 hover:underline">
              View All Case Studies
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard 
            icon={<TrendingUp className="text-boostra-blue" size={24} />}
            title="Average Conversion Rate Increase"
            value="37%"
            description="Through A/B testing and UX optimization"
          />
          <StatsCard 
            icon={<ShoppingCart className="text-boostra-blue" size={24} />}
            title="Average Revenue Increase"
            value="28%"
            description="For stores after 3 months of optimization"
          />
          <StatsCard 
            icon={<Users className="text-boostra-blue" size={24} />}
            title="Happy Clients"
            value="80+"
            description="Across different Shopify niches"
          />
          <StatsCard 
            icon={<Zap className="text-boostra-blue" size={24} />}
            title="Page Load Speed Improvement"
            value="65%"
            description="Faster sites = better conversions"
          />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
