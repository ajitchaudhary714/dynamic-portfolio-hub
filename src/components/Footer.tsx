import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram, Youtube, Facebook, Globe, Dribbble } from "lucide-react";
import { useProfile, useSocialLinks } from "@/hooks/use-portfolio-data";

const iconMap: Record<string, React.ReactNode> = {
  GitHub: <Github className="w-5 h-5" />,
  LinkedIn: <Linkedin className="w-5 h-5" />,
  Twitter: <Twitter className="w-5 h-5" />,
  Instagram: <Instagram className="w-5 h-5" />,
  YouTube: <Youtube className="w-5 h-5" />,
  Facebook: <Facebook className="w-5 h-5" />,
  Dribbble: <Dribbble className="w-5 h-5" />,
  Website: <Globe className="w-5 h-5" />,
  Behance: <Globe className="w-5 h-5" />,
};

const Footer = () => {
  const { data: profile } = useProfile();
  const { data: socialLinks } = useSocialLinks();

  return (
    <footer className="relative z-10 border-t border-border py-12 px-6 md:px-12">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4"
        >
          {socialLinks?.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
              title={link.platform}
            >
              {iconMap[link.platform] || <Globe className="w-5 h-5" />}
            </a>
          ))}
        </motion.div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {profile?.name || "Ajit Verma"}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
