// Database Types
export interface ChatMessage {
  id: number;
  chat_id: string;
  sender: "visitor" | "admin";
  content: string;
  created_at: string;
}

export interface ChatSession {
  id: number;
  chat_id: string;
  email?: string;
  phone?: string;
  created_at: string;
  last_message_at: string;
}

export interface Setting {
  key: string;
  value: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      settings: {
        Row: Setting;
        Insert: Omit<Setting, "updated_at"> & { updated_at?: string };
        Update: Partial<Setting>;
      };
      chat_messages: {
        Row: ChatMessage;
        Insert: Omit<ChatMessage, "id" | "created_at">;
        Update: Partial<ChatMessage>;
      };
      chat_sessions: {
        Row: ChatSession;
        Insert: Omit<ChatSession, "id" | "created_at" | "last_message_at">;
        Update: Partial<ChatSession>;
      };
    };
  };
}
