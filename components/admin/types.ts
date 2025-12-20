// Shared types for admin components

export interface ChatMessage {
  id: number;
  chat_id: string;
  sender: string;
  content: string;
  created_at: string;
}

export interface ChatSession {
  chat_id: string;
  email?: string;
  phone?: string;
  created_at: string;
  last_message_at: string;
  messages: ChatMessage[];
  isTyping?: boolean;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  url: string;
  image_url?: string;
  tech_stack: string[];
  show_tech: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  email?: string;
  full_name?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  cover_image?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminStats {
  label: string;
  value: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  badge?: boolean;
}
