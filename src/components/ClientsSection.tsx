
const ClientsSection = () => {
  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <p className="text-xl text-boostra-gray font-medium">
            Trusted by top Shopify brands in various industries
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {/* Client logos in grayscale */}
          <div className="opacity-60 hover:opacity-100 transition-opacity">
            <img src="https://flowbite.com/docs/images/logo.svg" alt="Client Logo" className="h-12" />
          </div>
          <div className="opacity-60 hover:opacity-100 transition-opacity">
            <img src="https://flowbite.com/docs/images/logo.svg" alt="Client Logo" className="h-12" />
          </div>
          <div className="opacity-60 hover:opacity-100 transition-opacity">
            <img src="https://flowbite.com/docs/images/logo.svg" alt="Client Logo" className="h-12" />
          </div>
          <div className="opacity-60 hover:opacity-100 transition-opacity">
            <img src="https://flowbite.com/docs/images/logo.svg" alt="Client Logo" className="h-12" />
          </div>
          <div className="opacity-60 hover:opacity-100 transition-opacity">
            <img src="https://flowbite.com/docs/images/logo.svg" alt="Client Logo" className="h-12" />
          </div>
          <div className="opacity-60 hover:opacity-100 transition-opacity">
            <img src="https://flowbite.com/docs/images/logo.svg" alt="Client Logo" className="h-12" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
