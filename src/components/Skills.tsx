import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

const skills = ["React", "Next.js", "Tailwind CSS", "JavaScript", "TypeScript", "Node.js", "Git", "Figma"];

const Skills = () => (
  <section id="skills" className="py-24 px-6 md:px-12">
    <div className="max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-16 text-gradient"
      >
        My Toolbox
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {skills.map((skill, i) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.05, y: -4 }}
            className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors"
          >
            <Code2 className="w-8 h-8 text-primary" />
            <span className="text-sm font-medium text-foreground">{skill}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
