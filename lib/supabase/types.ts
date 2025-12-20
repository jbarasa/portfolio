// Database Types
export interface ChatMessage {
  id: number;
  session_id: string;
  sender: "visitor" | "admin";
  content: string;
  created_at: string;
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
    };
  };
}
