import { motion } from "framer-motion";
import ajitPhoto from "@/assets/ajit-photo.jpeg";
import { useProfile } from "@/hooks/use-portfolio-data";

const TypeWriter = ({ text, className }: { text: string; className?: string }) => (
  <motion.span className={className}>
    {text.split("").map((char, i) => (
      <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + i * 0.04, duration: 0.1 }}>
        {char}
      </motion.span>
    ))}
  </motion.span>
);

const Hero = () => {
  const { data: profile } = useProfile();
  const name = profile?.name || "Ajit Verma";
  const title = profile?.title || "Frontend Developer & UI/UX Enthusiast";
  const bio = profile?.bio || "";

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 px-6 md:px-12 lg:px-24 overflow-hidden relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto">
        <motion.div initial={{ x: -80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
          <p className="text-muted-foreground text-lg mb-2">Hi there,</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            I am <span className="text-foreground">{name}</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            <TypeWriter text={title} className="text-gradient" />
          </h2>
          <p className="text-muted-foreground max-w-lg text-base leading-relaxed mb-8">{bio}</p>
          <div className="flex gap-4">
            <a href="#contact" className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">Contact Me</a>
            <a href="#projects" className="px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-secondary transition-colors">View Projects</a>
          </div>
        </motion.div>
        <motion.div initial={{ x: 80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="flex justify-center lg:justify-end">
          <div className="relative w-72 h-80 md:w-96 md:h-[28rem] rounded-2xl overflow-hidden border-2 border-border shadow-2xl shadow-primary/10">
            <img src={ajitPhoto} alt={name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
