
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <section className="py-20 md:py-32">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <span className="badge mb-4">CONTACT US</span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-boostra-dark">
                Ready to Get Started?
              </h1>
              <p className="text-lg md:text-xl text-boostra-gray mb-10">
                Get in touch with us to discuss your Shopify optimization needs and book your free audit.
              </p>
              <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-3 text-lg">
                  <Mail className="text-boostra-blue" size={24} />
                  <a 
                    href="mailto:byron@boostra.agency" 
                    className="text-boostra-blue hover:text-boostra-deep-blue transition-colors font-medium"
                  >
                    byron@boostra.agency
                  </a>
                </div>
                <Button className="rounded-full bg-boostra-blue text-white hover:bg-boostra-deep-blue px-8 py-6 text-lg">
                  <a href="mailto:byron@boostra.agency">Send Email</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
