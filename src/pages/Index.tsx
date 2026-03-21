import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Journey from "@/components/Journey";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import AnimatedBackground from "@/components/AnimatedBackground";

const Index = () => (
  <div className="min-h-screen bg-background relative">
    <AnimatedBackground />
    <Navbar />
    <div className="relative z-10">
      <Hero />
      <Skills />
      <Journey />
      <Projects />
      <Contact />
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border">
        © 2024 Ajit Verma. All rights reserved.
      </footer>
    </div>
  </div>
);

export default Index;
