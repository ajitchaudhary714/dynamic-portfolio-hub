import { motion } from "framer-motion";

const timeline = [
  { year: "2024", title: "Frontend Developer", company: "Web Solutions Ltd." },
  { year: "2022", title: "Junior Developer", company: "StartUp Crew" },
];

const hobbies = [
  { title: "Traveling", desc: "Exploring new cultures and cuisines", emoji: "✈️" },
  { title: "Blogging", desc: "Sharing my tech journey and tips", emoji: "✍️" },
  { title: "Open Source", desc: "Contributing to community projects", emoji: "🌐" },
];

const Journey = () => (
  <section className="py-24 px-6 md:px-12">
    <div className="max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-16 text-gradient"
      >
        My Journey
      </motion.h2>

      <div className="space-y-8 mb-20 max-w-2xl mx-auto">
        {timeline.map((item, i) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="flex gap-6 items-start"
          >
            <span className="text-primary font-bold text-lg min-w-[4rem]">{item.year}</span>
            <div className="border-l-2 border-primary/30 pl-6">
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.company}</p>
            </div>
          </motion.div>
        ))}
      </div>

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
            whileHover={{ y: -4 }}
            className="p-6 rounded-xl bg-card border border-border text-center"
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

export default Journey;
