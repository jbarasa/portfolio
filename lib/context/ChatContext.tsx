"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
  useMemo,
} from "react";
import { createClient } from "@/lib/supabase/client";
import type { RealtimeChannel } from "@supabase/supabase-js";

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "admin";
  timestamp: Date;
}

interface VisitorInfo {
  email?: string;
  phone?: string;
}

interface ChatContextType {
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  messages: ChatMessage[];
  addMessage: (content: string, sender: "user" | "admin") => void;
  clearMessages: () => void;
  chatId: string;
  visitorInfo: VisitorInfo | null;
  setVisitorInfo: (info: VisitorInfo) => void;
  hasStartedChat: boolean;
  startChat: (info?: VisitorInfo) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Generate or retrieve chat ID from localStorage (persistent across sessions)
function getOrCreateChatId(): string {
  if (typeof window === "undefined") return "";
  let chatId = localStorage.getItem("jbarasa_chat_id");
  if (!chatId) {
    chatId = `chat_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 11)}`;
    localStorage.setItem("jbarasa_chat_id", chatId);
  }
  return chatId;
}

// Get visitor info from localStorage
function getStoredVisitorInfo(): VisitorInfo | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("jbarasa_visitor_info");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
}

// Check if chat has been started (exists in DB)
function getHasStartedChat(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("jbarasa_chat_started") === "true";
}

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [chatId] = useState(() => getOrCreateChatId());
  const [isOnline, setIsOnline] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [visitorInfo, setVisitorInfoState] = useState<VisitorInfo | null>(() =>
    getStoredVisitorInfo()
  );
  const [hasStartedChat, setHasStartedChat] = useState(() =>
    getHasStartedChat()
  );
  const supabaseRef = useRef(createClient());
  const statusChannelRef = useRef<RealtimeChannel | null>(null);
  const messagesChannelRef = useRef<RealtimeChannel | null>(null);

  // Set visitor info and persist to localStorage
  const setVisitorInfo = useCallback((info: VisitorInfo) => {
    setVisitorInfoState(info);
    if (typeof window !== "undefined") {
      localStorage.setItem("jbarasa_visitor_info", JSON.stringify(info));
    }
  }, []);

  // Start chat - creates session in database
  // Accepts optional visitor info to avoid stale closure issues
  const startChat = useCallback(
    async (info?: VisitorInfo) => {
      const currentVisitorInfo = info || visitorInfo;
      if (!chatId || !currentVisitorInfo || hasStartedChat) return;

      try {
        const res = await fetch("/api/chat/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chatId,
            email: currentVisitorInfo.email,
            phone: currentVisitorInfo.phone,
          }),
        });

        if (res.ok) {
          setHasStartedChat(true);
          if (typeof window !== "undefined") {
            localStorage.setItem("jbarasa_chat_started", "true");
          }
        }
      } catch (error) {
        console.error("Error starting chat:", error);
      }
    },
    [chatId, visitorInfo, hasStartedChat]
  );

  // Fetch initial admin status and subscribe to realtime updates
  useEffect(() => {
    const supabase = supabaseRef.current;

    // Fetch initial status
    const fetchStatus = async () => {
      try {
        const res = await fetch("/api/admin/status");
        const data = await res.json();
        setIsOnline(data.isOnline);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };

    fetchStatus();

    // Subscribe to realtime admin status changes
    statusChannelRef.current = supabase
      .channel("admin_status_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "settings",
          filter: "key=eq.admin_online",
        },
        (payload) => {
          const newValue = (payload.new as { value: string })?.value;
          setIsOnline(newValue === "true");
        }
      )
      .subscribe();

    return () => {
      if (statusChannelRef.current) {
        supabase.removeChannel(statusChannelRef.current);
      }
    };
  }, []);

  // Subscribe to realtime messages when chat is open and started
  useEffect(() => {
    if (!isChatOpen || !chatId || !hasStartedChat) return;

    const supabase = supabaseRef.current;

    // Fetch existing messages for this chat
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/chat/messages?chatId=${chatId}`);
        const data = await res.json();
        if (data.messages) {
          const formattedMessages = data.messages
            .reverse()
            .map(
              (msg: {
                id: number;
                content: string;
                sender: string;
                created_at: string;
              }) => ({
                id: msg.id.toString(),
                content: msg.content,
                sender: msg.sender === "visitor" ? "user" : "admin",
                timestamp: new Date(msg.created_at),
              })
            );
          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    // Subscribe to new messages for this chat
    messagesChannelRef.current = supabase
      .channel(`messages_${chatId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          const newMsg = payload.new as {
            id: number;
            content: string;
            sender: string;
            created_at: string;
          };
          const formattedMessage: ChatMessage = {
            id: newMsg.id.toString(),
            content: newMsg.content,
            sender: newMsg.sender === "visitor" ? "user" : "admin",
            timestamp: new Date(newMsg.created_at),
          };
          setMessages((prev) => {
            // Avoid duplicates
            if (prev.some((m) => m.id === formattedMessage.id)) {
              return prev;
            }
            return [...prev, formattedMessage];
          });
        }
      )
      .subscribe();

    return () => {
      if (messagesChannelRef.current) {
        supabase.removeChannel(messagesChannelRef.current);
      }
    };
  }, [isChatOpen, chatId, hasStartedChat]);

  const addMessage = useCallback(
    async (content: string, sender: "user" | "admin") => {
      // Optimistically add message
      const tempId = `temp_${Date.now()}`;
      const newMessage: ChatMessage = {
        id: tempId,
        content,
        sender,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);

      // Only save to database if chat has been started
      if (chatId && hasStartedChat) {
        try {
          await fetch("/api/chat/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chatId,
              sender: sender === "user" ? "visitor" : "admin",
              content,
            }),
          });
        } catch (error) {
          console.error("Error saving message:", error);
        }
      }
    },
    [chatId, hasStartedChat]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const contextValue = useMemo(
    () => ({
      isOnline,
      setIsOnline,
      isChatOpen,
      setIsChatOpen,
      messages,
      addMessage,
      clearMessages,
      chatId,
      visitorInfo,
      setVisitorInfo,
      hasStartedChat,
      startChat,
    }),
    [
      isOnline,
      isChatOpen,
      messages,
      addMessage,
      clearMessages,
      chatId,
      visitorInfo,
      setVisitorInfo,
      hasStartedChat,
      startChat,
    ]
  );

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
