import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Journey from "@/components/Journey";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

const Index = () => (
  <div className="min-h-screen bg-background relative">
    <AnimatedBackground />
    <Navbar />
    <Hero />
    <Skills />
    <Journey />
    <Projects />
    <Contact />
    <Footer />
  </div>
);

export default Index;
