import { motion } from "framer-motion";

const AnimatedBackground = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <motion.div
        animate={{ x: [0, 50, -30, 0], y: [0, -40, 20, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, hsl(245 80% 65%), transparent)" }}
      />
      <motion.div
        animate={{ x: [0, -60, 40, 0], y: [0, 50, -30, 0], scale: [1, 0.8, 1.3, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8"
        style={{ background: "radial-gradient(circle, hsl(280 70% 60%), transparent)" }}
      />
      <motion.div
        animate={{ x: [0, 30, -50, 0], y: [0, -60, 40, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-5"
        style={{ background: "radial-gradient(circle, hsl(200 80% 60%), transparent)" }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(245 80% 65% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(245 80% 65% / 0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
