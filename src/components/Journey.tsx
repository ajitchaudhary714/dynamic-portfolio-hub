import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { useExperiences } from "@/hooks/use-portfolio-data";

const hobbies = [
  { title: "Traveling", desc: "Exploring new cultures and cuisines", emoji: "✈️" },
  { title: "Blogging", desc: "Sharing my tech journey and tips", emoji: "✍️" },
  { title: "Open Source", desc: "Contributing to community projects", emoji: "🌐" },
];

const Journey = () => {
  const { data: experiences } = useExperiences();

  return (
    <section id="journey" className="relative z-10 py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-gradient"
        >
          My Journey
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground mb-16"
        >
          Professional experience & career path
        </motion.p>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto mb-24">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent" />

          {experiences?.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, type: "spring", stiffness: 100 }}
              className={`relative flex items-start mb-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <motion.div
                className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10"
                whileInView={{ scale: [0, 1.3, 1] }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.3 }}
              />

              {/* Card */}
              <div className={`ml-14 md:ml-0 md:w-[45%] ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/40 transition-all"
                >
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-sm font-semibold">{exp.role}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{exp.company}</h3>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {exp.start_date} — {exp.end_date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {exp.type}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hobbies */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient"
        >
          When I'm Not Coding
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hobbies.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="p-6 rounded-xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/40 text-center transition-all"
            >
              <span className="text-3xl mb-3 block">{h.emoji}</span>
              <h3 className="font-semibold text-foreground mb-1">{h.title}</h3>
              <p className="text-sm text-muted-foreground">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;
