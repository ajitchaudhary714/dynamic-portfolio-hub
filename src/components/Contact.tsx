import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useProfile, useSendMessage } from "@/hooks/use-portfolio-data";
import ajitPhoto from "@/assets/ajitcontact.jpeg";
import { toast } from "sonner";

const Contact = () => {
  const { data: profile } = useProfile();
  const sendMessage = useSendMessage();
  const [form, setForm] = useState({ sender_name: "", sender_email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.sender_name.trim() || !form.sender_email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    sendMessage.mutate(form, {
      onSuccess: () => {
        toast.success("Message sent! I'll get back to you soon.");
        setForm({ sender_name: "", sender_email: "", message: "" });
      },
      onError: () => toast.error("Failed to send. Please try again."),
    });
  };

  return (
      <section id="contact" className="relative z-10 py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center md:text-left">
            <div className=" rounded-lg overflow-hidden border-2 border-primary/40 mx-auto md:mx-0 mb-4">
              <img src={ajitPhoto} alt={profile?.name || "Ajit"} className="w-full h-full object-cover" />
            </div>
           
          </motion.div>

          <motion.form initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6" onSubmit={handleSubmit}>
          <div> <h2 className="text-3xl font-bold text-foreground mb-1">{profile?.name}</h2>
            <p className="text-muted-foreground mb-4">{profile?.title}</p>
            <div className="space-y-3 text-sm text-muted-foreground">
              {profile?.phone && (
                <a href={`tel:${profile.phone}`} className="flex items-center gap-3 justify-center md:justify-start hover:text-foreground transition-colors">
                  <Phone className="w-4 h-4 text-primary" /> {profile.phone}
                </a>
              )}
              {profile?.email && (
                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 justify-center md:justify-start hover:text-foreground transition-colors">
                  <Mail className="w-4 h-4 text-primary" /> {profile.email}
                </a>
              )}
              {profile?.location && (
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <MapPin className="w-4 h-4 text-primary" /> {profile.location}
                </div>
              )}
            </div></div>
          
            <h3 className="text-xl font-bold text-foreground mb-4">Get in Touch</h3>
            <input type="text" placeholder="Your Name" required value={form.sender_name} onChange={(e) => setForm({ ...form, sender_name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
            <input type="email" placeholder="Your Email" required value={form.sender_email} onChange={(e) => setForm({ ...form, sender_email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
            <textarea rows={4} placeholder="Your Message" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm resize-none" />
            <button type="submit" disabled={sendMessage.isPending}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50">
              <Send className="w-4 h-4" /> {sendMessage.isPending ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
