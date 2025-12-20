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

interface ChatContextType {
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  messages: ChatMessage[];
  addMessage: (content: string, sender: "user" | "admin") => void;
  clearMessages: () => void;
  sessionId: string;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Generate or retrieve session ID
function getInitialSessionId(): string {
  if (typeof window === "undefined") return "";
  let sessionId = sessionStorage.getItem("chat_session_id");
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 9)}`;
    sessionStorage.setItem("chat_session_id", sessionId);
  }
  return sessionId;
}

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sessionId] = useState(() => getInitialSessionId());
  const [isOnline, setIsOnline] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const supabaseRef = useRef(createClient());
  const statusChannelRef = useRef<RealtimeChannel | null>(null);
  const messagesChannelRef = useRef<RealtimeChannel | null>(null);

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

  // Subscribe to realtime messages when chat is open
  useEffect(() => {
    if (!isChatOpen || !sessionId) return;

    const supabase = supabaseRef.current;

    // Fetch existing messages for this session
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/chat/messages?sessionId=${sessionId}`);
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

    // Subscribe to new messages for this session
    messagesChannelRef.current = supabase
      .channel(`messages_${sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `session_id=eq.${sessionId}`,
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
  }, [isChatOpen, sessionId]);

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

      // Save to database
      if (sessionId) {
        try {
          await fetch("/api/chat/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId,
              sender: sender === "user" ? "visitor" : "admin",
              content,
            }),
          });
        } catch (error) {
          console.error("Error saving message:", error);
        }
      }
    },
    [sessionId]
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
      sessionId,
    }),
    [isOnline, isChatOpen, messages, addMessage, clearMessages, sessionId]
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
