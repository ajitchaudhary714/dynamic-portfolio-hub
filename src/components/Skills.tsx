import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { useSkills } from "@/hooks/use-portfolio-data";

const Skills = () => {
  const { data: skills } = useSkills();

  return (
    <section id="skills" className="relative z-10 py-24 px-6 md:px-12">
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
          {skills?.map((skill, i) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 15 }}
              whileHover={{ scale: 1.1, y: -8, boxShadow: "0 20px 40px -15px hsl(245 80% 65% / 0.3)" }}
              className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/60 transition-colors cursor-default"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
              >
                <Code2 className="w-8 h-8 text-primary" />
              </motion.div>
              <span className="text-sm font-medium text-foreground">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
