import { motion } from "framer-motion";

const navItems = ["Home", "Projects", "Skills", "Contact"];

const Navbar = () => (
  <motion.nav
    initial={{ y: -60, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-background/80 backdrop-blur-lg border-b border-border"
  >
    <span className="text-xl font-bold font-['Space_Grotesk'] text-gradient">AV</span>
    <div className="hidden md:flex gap-2">
      {navItems.map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          {item}
        </a>
      ))}
    </div>
  </motion.nav>
);

export default Navbar;
