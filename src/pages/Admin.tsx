import { useState } from "react";
import { motion } from "framer-motion";
import { LogOut, User, Briefcase, Code2, Mail, Settings, Menu, X } from "lucide-react";

type Tab = "profile" | "projects" | "skills" | "messages" | "settings";

const initialProfile = {
  name: "Ajit Verma",
  title: "Frontend Developer / UX & UI Designer",
  email: "ajitchaudhary714@gmail.com",
  phone: "+91 9026029479",
  location: "Lucknow, Uttar Pradesh",
  bio: "Passionate about creating beautiful, responsive, and user-friendly web applications.",
};

const initialProjects = [
  { id: 1, title: "MySkillWallet.ai", status: "Live", link: "https://myskillwallet.ai/" },
  { id: 2, title: "Troven.ai", status: "Live", link: "https://troven.ai/" },
  { id: 3, title: "ConQT.com", status: "Live", link: "https://conqt.com/" },
];

const initialSkills = ["React", "Next.js", "Tailwind CSS", "JavaScript", "TypeScript", "Node.js", "Git", "Figma"];

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [profile, setProfile] = useState(initialProfile);
  const [projects] = useState(initialProjects);
  const [skills] = useState(initialSkills);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
    { id: "projects", label: "Projects", icon: <Briefcase className="w-4 h-4" /> },
    { id: "skills", label: "Skills", icon: <Code2 className="w-4 h-4" /> },
    { id: "messages", label: "Messages", icon: <Mail className="w-4 h-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
  ];

  const inputClass = "w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm";

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-card border-r border-border flex flex-col z-50 transition-transform md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h1 className="text-xl font-bold text-gradient">Admin Panel</h1>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-muted-foreground"><X className="w-5 h-5" /></button>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${activeTab === tab.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <a href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <LogOut className="w-4 h-4" /> Back to Portfolio
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-h-screen">
        <header className="sticky top-0 bg-card/80 backdrop-blur-lg border-b border-border px-6 py-4 flex items-center gap-4 z-30">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-foreground"><Menu className="w-5 h-5" /></button>
          <h2 className="text-lg font-semibold text-foreground capitalize">{activeTab}</h2>
        </header>

        <div className="p-6 md:p-8 max-w-4xl">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Full Name</label>
                    <input className={inputClass} value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Title</label>
                    <input className={inputClass} value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Email</label>
                    <input className={inputClass} value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Phone</label>
                    <input className={inputClass} value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-muted-foreground mb-1 block">Location</label>
                    <input className={inputClass} value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-muted-foreground mb-1 block">Bio</label>
                    <textarea className={`${inputClass} resize-none`} rows={3} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
                  </div>
                </div>
                <button className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === "projects" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-muted-foreground text-sm">{projects.length} projects</p>
                  <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">+ Add Project</button>
                </div>
                {projects.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                    <div>
                      <h3 className="font-medium text-foreground">{p.title}</h3>
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">{p.link}</a>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400">{p.status}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "skills" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-muted-foreground text-sm">{skills.length} skills</p>
                  <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">+ Add Skill</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {skills.map((s) => (
                    <div key={s} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
                      <span className="text-sm text-foreground">{s}</span>
                      <button className="text-muted-foreground hover:text-destructive text-xs">×</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "messages" && (
              <div className="text-center py-16">
                <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No messages yet. Contact form submissions will appear here.</p>
                <p className="text-xs text-muted-foreground mt-2">Connect Lovable Cloud to enable message storage</p>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-card border border-border">
                  <h3 className="font-medium text-foreground mb-2">Theme</h3>
                  <p className="text-sm text-muted-foreground">Dark mode is currently active</p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border">
                  <h3 className="font-medium text-foreground mb-2">Backend</h3>
                  <p className="text-sm text-muted-foreground">Connect Lovable Cloud to persist data, manage messages, and add authentication.</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
