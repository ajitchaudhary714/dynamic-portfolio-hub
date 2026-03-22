import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import avLogo from "@/assets/av-logo.png";

const navItems = ["Home", "Skills", "Journey", "Projects", "Contact"];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-2 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <a href="#home" className="flex items-center gap-2">
        <img src={avLogo} alt="AV Logo" className="h-10 w-auto" />
      </a>
      <div className="hidden md:flex gap-2">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
          >
            {item}
          </a>
        ))}
      </div>
      <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border flex flex-col p-4 gap-2 md:hidden"
        >
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
            >
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
