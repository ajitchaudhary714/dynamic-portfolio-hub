import { useState } from "react";
import { motion } from "framer-motion";
import { LogOut, User, Briefcase, Code2, Mail, Link2, Menu, X, Trash2, Plus, Check, Eye } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import AdminLogin from "@/components/AdminLogin";
import {
  useProfile, useProjects, useSkills, useSocialLinks, useMessages, useExperiences,
  useUpdateProfile, useAddProject, useUpdateProject, useDeleteProject,
  useAddSkill, useDeleteSkill, useAddSocialLink, useUpdateSocialLink, useDeleteSocialLink,
  useMarkMessageRead, useDeleteMessage, useAddExperience, useUpdateExperience, useDeleteExperience,
} from "@/hooks/use-portfolio-data";
import { toast } from "sonner";

type Tab = "profile" | "projects" | "skills" | "experience" | "social" | "messages";

const AdminPanel = () => {
  const { session, loading: authLoading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (authLoading) return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Loading...</div>;
  if (!session) return <AdminLogin onLogin={() => {}} />;

  return <AdminDashboard activeTab={activeTab} setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} signOut={signOut} />;
};

const AdminDashboard = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen, signOut }: {
  activeTab: Tab; setActiveTab: (t: Tab) => void; sidebarOpen: boolean; setSidebarOpen: (o: boolean) => void; signOut: () => void;
}) => {
  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
    { id: "projects", label: "Projects", icon: <Briefcase className="w-4 h-4" /> },
    { id: "skills", label: "Skills", icon: <Code2 className="w-4 h-4" /> },
    { id: "social", label: "Social Links", icon: <Link2 className="w-4 h-4" /> },
    { id: "messages", label: "Messages", icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}

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
              {tab.icon}{tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-border space-y-1">
          <a href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            ← Back to Portfolio
          </a>
          <button onClick={signOut} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 min-h-screen">
        <header className="sticky top-0 bg-card/80 backdrop-blur-lg border-b border-border px-6 py-4 flex items-center gap-4 z-30">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-foreground"><Menu className="w-5 h-5" /></button>
          <h2 className="text-lg font-semibold text-foreground capitalize">{activeTab === "social" ? "Social Links" : activeTab}</h2>
        </header>
        <div className="p-6 md:p-8 max-w-4xl">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "projects" && <ProjectsTab />}
            {activeTab === "skills" && <SkillsTab />}
            {activeTab === "social" && <SocialTab />}
            {activeTab === "messages" && <MessagesTab />}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

const inputClass = "w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm";

const ProfileTab = () => {
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const [form, setForm] = useState<Record<string, string>>({});

  const p = { ...profile, ...form };
  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  const save = () => {
    if (Object.keys(form).length === 0) return;
    updateProfile.mutate(form, { onSuccess: () => { toast.success("Profile updated!"); setForm({}); } });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(["name", "title", "email", "phone", "location"] as const).map((field) => (
          <div key={field} className={field === "location" ? "md:col-span-2" : ""}>
            <label className="text-sm text-muted-foreground mb-1 block capitalize">{field}</label>
            <input className={inputClass} value={p[field] || ""} onChange={(e) => setForm({ ...form, [field]: e.target.value })} />
          </div>
        ))}
        <div className="md:col-span-2">
          <label className="text-sm text-muted-foreground mb-1 block">Bio</label>
          <textarea className={`${inputClass} resize-none`} rows={3} value={p.bio || ""} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
        </div>
      </div>
      <button onClick={save} disabled={updateProfile.isPending} className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50">
        {updateProfile.isPending ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

const ProjectsTab = () => {
  const { data: projects, isLoading } = useProjects();
  const addProject = useAddProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const [showAdd, setShowAdd] = useState(false);
  const [newProject, setNewProject] = useState({ title: "", description: "", link: "", tags: "" });
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", link: "", tags: "" });

  const handleAdd = () => {
    if (!newProject.title.trim()) return;
    addProject.mutate(
      { title: newProject.title, description: newProject.description, link: newProject.link, tags: newProject.tags.split(",").map(t => t.trim()).filter(Boolean) },
      { onSuccess: () => { toast.success("Project added!"); setNewProject({ title: "", description: "", link: "", tags: "" }); setShowAdd(false); } }
    );
  };

  const handleUpdate = (id: string) => {
    updateProject.mutate(
      { id, title: editForm.title, description: editForm.description, link: editForm.link, tags: editForm.tags.split(",").map(t => t.trim()).filter(Boolean) },
      { onSuccess: () => { toast.success("Project updated!"); setEditId(null); } }
    );
  };

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground text-sm">{projects?.length || 0} projects</p>
        <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {showAdd && (
        <div className="p-4 rounded-xl bg-card border border-border space-y-3">
          <input className={inputClass} placeholder="Project Title" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} />
          <textarea className={`${inputClass} resize-none`} rows={2} placeholder="Description" value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} />
          <input className={inputClass} placeholder="Link (https://...)" value={newProject.link} onChange={(e) => setNewProject({ ...newProject, link: e.target.value })} />
          <input className={inputClass} placeholder="Tags (comma separated)" value={newProject.tags} onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })} />
          <div className="flex gap-2">
            <button onClick={handleAdd} disabled={addProject.isPending} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:opacity-90 disabled:opacity-50">
              {addProject.isPending ? "Adding..." : "Add"}
            </button>
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground">Cancel</button>
          </div>
        </div>
      )}

      {projects?.map((p) => (
        <div key={p.id} className="p-4 rounded-xl bg-card border border-border">
          {editId === p.id ? (
            <div className="space-y-3">
              <input className={inputClass} value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
              <textarea className={`${inputClass} resize-none`} rows={2} value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
              <input className={inputClass} value={editForm.link} onChange={(e) => setEditForm({ ...editForm, link: e.target.value })} />
              <input className={inputClass} placeholder="Tags (comma separated)" value={editForm.tags} onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })} />
              <div className="flex gap-2">
                <button onClick={() => handleUpdate(p.id)} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:opacity-90">Save</button>
                <button onClick={() => setEditId(null)} className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-foreground">{p.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{p.description}</p>
                {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">{p.link}</a>}
                {p.tags && <div className="flex gap-1 mt-2">{p.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{t}</span>)}</div>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditId(p.id); setEditForm({ title: p.title, description: p.description || "", link: p.link || "", tags: p.tags?.join(", ") || "" }); }} className="text-muted-foreground hover:text-foreground"><Code2 className="w-4 h-4" /></button>
                <button onClick={() => deleteProject.mutate(p.id, { onSuccess: () => toast.success("Deleted!") })} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const SkillsTab = () => {
  const { data: skills, isLoading } = useSkills();
  const addSkill = useAddSkill();
  const deleteSkill = useDeleteSkill();
  const [newSkill, setNewSkill] = useState("");

  const handleAdd = () => {
    if (!newSkill.trim()) return;
    addSkill.mutate({ name: newSkill.trim(), sort_order: (skills?.length || 0) + 1 }, {
      onSuccess: () => { toast.success("Skill added!"); setNewSkill(""); }
    });
  };

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input className={inputClass} placeholder="Add a skill..." value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAdd()} />
        <button onClick={handleAdd} disabled={addSkill.isPending} className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 shrink-0 disabled:opacity-50">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        {skills?.map((s) => (
          <div key={s.id} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
            <span className="text-sm text-foreground">{s.name}</span>
            <button onClick={() => deleteSkill.mutate(s.id, { onSuccess: () => toast.success("Removed!") })} className="text-muted-foreground hover:text-destructive text-lg leading-none">×</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const SocialTab = () => {
  const { data: links, isLoading } = useSocialLinks();
  const addLink = useAddSocialLink();
  const updateLink = useUpdateSocialLink();
  const deleteLink = useDeleteSocialLink();
  const [showAdd, setShowAdd] = useState(false);
  const [newLink, setNewLink] = useState({ platform: "", url: "" });
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ platform: "", url: "" });

  const platforms = ["GitHub", "LinkedIn", "Twitter", "Instagram", "YouTube", "Facebook", "Dribbble", "Behance", "Website"];

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground text-sm">{links?.length || 0} social links</p>
        <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
          <Plus className="w-4 h-4" /> Add Link
        </button>
      </div>

      {showAdd && (
        <div className="p-4 rounded-xl bg-card border border-border space-y-3">
          <select className={inputClass} value={newLink.platform} onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}>
            <option value="">Select Platform</option>
            {platforms.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <input className={inputClass} placeholder="URL (https://...)" value={newLink.url} onChange={(e) => setNewLink({ ...newLink, url: e.target.value })} />
          <div className="flex gap-2">
            <button onClick={() => { if (!newLink.platform || !newLink.url) return; addLink.mutate({ platform: newLink.platform, url: newLink.url, sort_order: (links?.length || 0) + 1 }, { onSuccess: () => { toast.success("Added!"); setNewLink({ platform: "", url: "" }); setShowAdd(false); } }); }} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:opacity-90">Add</button>
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground">Cancel</button>
          </div>
        </div>
      )}

      {links?.map((l) => (
        <div key={l.id} className="p-4 rounded-xl bg-card border border-border">
          {editId === l.id ? (
            <div className="space-y-3">
              <select className={inputClass} value={editForm.platform} onChange={(e) => setEditForm({ ...editForm, platform: e.target.value })}>
                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <input className={inputClass} value={editForm.url} onChange={(e) => setEditForm({ ...editForm, url: e.target.value })} />
              <div className="flex gap-2">
                <button onClick={() => { updateLink.mutate({ id: l.id, ...editForm }, { onSuccess: () => { toast.success("Updated!"); setEditId(null); } }); }} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:opacity-90">Save</button>
                <button onClick={() => setEditId(null)} className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-foreground">{l.platform}</h3>
                <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">{l.url}</a>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditId(l.id); setEditForm({ platform: l.platform, url: l.url }); }} className="text-muted-foreground hover:text-foreground"><Code2 className="w-4 h-4" /></button>
                <button onClick={() => deleteLink.mutate(l.id, { onSuccess: () => toast.success("Deleted!") })} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const MessagesTab = () => {
  const { data: messages, isLoading } = useMessages();
  const markRead = useMarkMessageRead();
  const deleteMessage = useDeleteMessage();

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;
  if (!messages?.length) return (
    <div className="text-center py-16">
      <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
      <p className="text-muted-foreground">No messages yet</p>
    </div>
  );

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm">{messages.length} messages ({messages.filter(m => !m.is_read).length} unread)</p>
      {messages.map((m) => (
        <div key={m.id} className={`p-4 rounded-xl border ${m.is_read ? "bg-card border-border" : "bg-primary/5 border-primary/20"}`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-foreground">{m.sender_name}</h3>
                {!m.is_read && <span className="w-2 h-2 rounded-full bg-primary" />}
              </div>
              <p className="text-xs text-primary">{m.sender_email}</p>
              <p className="text-sm text-muted-foreground mt-2">{m.message}</p>
              <p className="text-xs text-muted-foreground mt-2">{new Date(m.created_at).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2">
              {!m.is_read && (
                <button onClick={() => markRead.mutate(m.id)} className="text-muted-foreground hover:text-foreground" title="Mark as read">
                  <Eye className="w-4 h-4" />
                </button>
              )}
              <button onClick={() => deleteMessage.mutate(m.id, { onSuccess: () => toast.success("Deleted!") })} className="text-muted-foreground hover:text-destructive">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
