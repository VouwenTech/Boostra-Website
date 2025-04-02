
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="py-20 md:py-32 bg-hero-pattern flex items-center justify-center">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-boostra-dark">404</h1>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-boostra-dark">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-boostra-gray mb-10">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/">
              <Button className="rounded-full bg-boostra-blue text-white hover:bg-boostra-blue/90 px-8 py-6 text-lg">
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
