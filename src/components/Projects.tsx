import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import projectSkillwallet from "@/assets/project-skillwallet.jpg";
import projectTroven from "@/assets/project-troven.jpg";
import projectConqt from "@/assets/project-conqt.jpg";

const projects = [
  {
    title: "MySkillWallet.ai",
    desc: "EdTech platform for building skills, earning certifications, virtual internships and job opportunities. Trusted by Intel, Google, Salesforce, IBM & more.",
    tags: ["React", "EdTech", "SaaS", "Full Stack"],
    image: projectSkillwallet,
    link: "https://myskillwallet.ai/",
  },
  {
    title: "Troven.ai",
    desc: "AI-powered assessment platform with custom coding challenges, secure proctoring, skill-based evaluations and real-time candidate insights.",
    tags: ["AI", "Assessment", "React", "Node.js"],
    image: projectTroven,
    link: "https://troven.ai/",
  },
  {
    title: "ConQT.com",
    desc: "Industrial data analytics & consulting platform. AI-powered insights, data historian solutions, and process optimization for enterprises.",
    tags: ["Analytics", "AI", "Enterprise", "WordPress"],
    image: projectConqt,
    link: "https://conqt.com/",
  },
];

const Projects = () => (
  <section id="projects" className="relative z-10 py-24 px-6 md:px-12">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">Featured Projects</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Real-world projects I've built — from EdTech to AI-driven assessment platforms
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            whileHover={{ y: -8 }}
            className="rounded-xl bg-card border border-border overflow-hidden group block"
          >
            <div className="h-48 overflow-hidden relative">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
              <ExternalLink className="absolute top-3 right-3 w-5 h-5 text-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
