import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useProfile = () =>
  useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profile").select("*").limit(1).single();
      if (error) throw error;
      return data;
    },
  });

export const useProjects = () =>
  useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

export const useSkills = () =>
  useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data, error } = await supabase.from("skills").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

export const useSocialLinks = () =>
  useQuery({
    queryKey: ["social_links"],
    queryFn: async () => {
      const { data, error } = await supabase.from("social_links").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

export const useMessages = () =>
  useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const { data, error } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

export const useSendMessage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (msg: { sender_name: string; sender_email: string; message: string }) => {
      const { error } = await supabase.from("messages").insert(msg);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["messages"] }),
  });
};

export const useUpdateProfile = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (updates: Record<string, string>) => {
      const { data: profile } = await supabase.from("profile").select("id").limit(1).single();
      if (!profile) throw new Error("No profile found");
      const { error } = await supabase.from("profile").update(updates).eq("id", profile.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile"] }),
  });
};

export const useAddProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (project: { title: string; description?: string; tags?: string[]; link?: string; image_url?: string; sort_order?: number }) => {
      const { error } = await supabase.from("projects").insert(project);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
};

export const useUpdateProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; title?: string; description?: string; tags?: string[]; link?: string; image_url?: string; sort_order?: number }) => {
      const { error } = await supabase.from("projects").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
};

export const useDeleteProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
};

export const useAddSkill = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (skill: { name: string; sort_order?: number }) => {
      const { error } = await supabase.from("skills").insert(skill);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["skills"] }),
  });
};

export const useDeleteSkill = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("skills").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["skills"] }),
  });
};

export const useAddSocialLink = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (link: { platform: string; url: string; sort_order?: number }) => {
      const { error } = await supabase.from("social_links").insert(link);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["social_links"] }),
  });
};

export const useUpdateSocialLink = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; platform?: string; url?: string }) => {
      const { error } = await supabase.from("social_links").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["social_links"] }),
  });
};

export const useDeleteSocialLink = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("social_links").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["social_links"] }),
  });
};

export const useMarkMessageRead = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("messages").update({ is_read: true }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["messages"] }),
  });
};

export const useDeleteMessage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("messages").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["messages"] }),
  });
};
