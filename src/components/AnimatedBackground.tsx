import { motion } from "framer-motion";

const AnimatedBackground = () => {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Gold orb */}
      <motion.div
        animate={{ x: [0, 60, -40, 0], y: [0, -50, 30, 0], scale: [1, 1.3, 0.8, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.08]"
        style={{ background: "radial-gradient(circle, hsl(42 85% 55%), transparent)" }}
      />
      {/* Blue orb */}
      <motion.div
        animate={{ x: [0, -70, 50, 0], y: [0, 60, -40, 0], scale: [1, 0.7, 1.4, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, hsl(215 60% 45%), transparent)" }}
      />
      {/* Secondary gold */}
      <motion.div
        animate={{ x: [0, 40, -60, 0], y: [0, -70, 50, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-2/3 left-1/2 w-72 h-72 rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, hsl(35 90% 65%), transparent)" }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.id % 3 === 0
              ? "hsl(42 85% 55% / 0.3)"
              : "hsl(215 60% 45% / 0.2)",
          }}
          animate={{ y: [0, -120, 0], opacity: [0, 0.7, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
        />
      ))}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(42 85% 55% / 0.2) 1px, transparent 1px), linear-gradient(90deg, hsl(215 60% 45% / 0.2) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Diagonal sweep */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
        className="absolute top-0 h-full w-px opacity-[0.06]"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(42 85% 55%), transparent)" }}
      />
    </div>
  );
};

export default AnimatedBackground;
