import { motion } from "framer-motion";

const projects = [
  {
    title: "E-commerce Website",
    desc: "A fully responsive e-commerce site built with Next.js and Tailwind CSS",
    tags: ["Next.js", "Tailwind CSS", "E-commerce"],
  },
  {
    title: "Task Management App",
    desc: "A React-based task management application with drag-and-drop functionality",
    tags: ["React", "DnD", "UI/UX"],
  },
  {
    title: "Portfolio Website",
    desc: "A customizable portfolio template built with Next.js and Tailwind CSS",
    tags: ["Next.js", "Portfolio", "Responsive"],
  },
];

const Projects = () => (
  <section id="projects" className="py-24 px-6 md:px-12">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">Featured Projects</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Explore my latest work and creative endeavors in web development and design
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            whileHover={{ y: -6 }}
            className="rounded-xl bg-card border border-border overflow-hidden group"
          >
            <div className="h-48 bg-secondary flex items-center justify-center">
              <span className="text-4xl text-muted-foreground group-hover:text-primary transition-colors">
                {i === 0 ? "🛒" : i === 1 ? "✅" : "💼"}
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
