import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import ajitPhoto from "@/assets/ajit-photo.jpeg";

const Contact = () => (
  <section id="contact" className="py-24 px-6 md:px-12">
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/40 mx-auto md:mx-0 mb-4">
            <img src={ajitPhoto} alt="Ajit Verma" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-1">Ajit Verma</h2>
          <p className="text-muted-foreground mb-6">Frontend Developer / UX & UI Designer</p>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Phone className="w-4 h-4 text-primary" /> +91 9026029479
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Mail className="w-4 h-4 text-primary" /> ajitchaudhary714@gmail.com
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <MapPin className="w-4 h-4 text-primary" /> Lucknow, Uttar Pradesh
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <h3 className="text-xl font-bold text-foreground mb-4">Get in Touch</h3>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          />
          <textarea
            rows={4}
            placeholder="Your Message"
            className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm resize-none"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </div>
  </section>
);

export default Contact;
