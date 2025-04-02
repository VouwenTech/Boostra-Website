
import Navbar from "@/components/Navbar";
import AboutHero from "@/components/AboutHero";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <AboutHero />
        {/* More about page sections would go here */}
      </main>
      <Footer />
    </div>
  );
};

export default About;
