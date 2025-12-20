"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  HiChat,
  HiClock,
  HiUserGroup,
  HiStatusOnline,
  HiStatusOffline,
  HiShieldExclamation,
  HiHome,
  HiCog,
  HiLogout,
  HiMenuAlt2,
  HiX,
  HiRefresh,
  HiTrash,
  HiBell,
  HiChartBar,
  HiGlobe,
  HiReply,
  HiPaperAirplane,
} from "react-icons/hi";
import { isAdmin } from "@/lib/constants";

interface ChatMessage {
  id: number;
  chat_id: string;
  sender: string;
  content: string;
  created_at: string;
}

interface ChatSession {
  chat_id: string;
  email?: string;
  phone?: string;
  created_at: string;
  last_message_at: string;
  messages: ChatMessage[];
  isTyping?: boolean;
}

// Typing indicator component with animated dots
const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-4 py-2 bg-gray-100 rounded-2xl rounded-bl-none w-fit">
    <div className="flex gap-1">
      <span
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "0ms" }}
      />
      <span
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "150ms" }}
      />
      <span
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "300ms" }}
      />
    </div>
    <span className="text-xs text-gray-500 ml-2">Visitor is typing...</span>
  </div>
);

export default function AdminDashboard() {
  const { user, isLoading: authLoading, isAuthenticated, signOut } = useAuth();
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [replyInput, setReplyInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "messages" | "settings"
  >("overview");
  const [typingSessions, setTypingSessions] = useState<Set<string>>(new Set());
  const [newMessageAlert, setNewMessageAlert] = useState(false);
  const [isAdminTyping, setIsAdminTyping] = useState(false);
  const adminTypingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const userEmail = user?.email;
  const userIsAdmin = isAdmin(userEmail);

  // Broadcast admin typing indicator
  const broadcastAdminTyping = useCallback(
    (typing: boolean, chatId: string) => {
      const supabase = createClient();
      supabase.channel("admin_typing").send({
        type: "broadcast",
        event: "admin_typing",
        payload: { chatId, isTyping: typing },
      });
    },
    []
  );

  // Handle reply input change with typing indicator
  const handleReplyInputChange = (value: string) => {
    setReplyInput(value);

    if (!isAdminTyping && value.length > 0 && selectedSession) {
      setIsAdminTyping(true);
      broadcastAdminTyping(true, selectedSession);
    }

    // Reset typing timeout
    if (adminTypingTimeoutRef.current) {
      clearTimeout(adminTypingTimeoutRef.current);
    }

    // Stop typing indicator after 2 seconds of no input
    adminTypingTimeoutRef.current = setTimeout(() => {
      setIsAdminTyping(false);
      if (selectedSession) {
        broadcastAdminTyping(false, selectedSession);
      }
    }, 2000);
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedSession]);

  // Fetch admin status from API
  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch("/api/admin/status");
        const data = await res.json();
        setIsOnline(data.isOnline);
      } catch {
        // Silently fail
      } finally {
        setIsLoading(false);
      }
    }
    fetchStatus();
  }, []);

  // Fetch messages and sessions from API
  const fetchMessages = useCallback(async () => {
    try {
      const [messagesRes, sessionsRes] = await Promise.all([
        fetch("/api/chat/messages"),
        fetch("/api/chat/session"),
      ]);

      const messagesData = await messagesRes.json();
      const sessionsData = await sessionsRes.json();

      const fetchedMessages = messagesData.messages || [];
      const fetchedSessions = sessionsData.sessions || [];

      setMessages(fetchedMessages);

      const sessionInfoMap = new Map<
        string,
        { email?: string; phone?: string }
      >();
      fetchedSessions.forEach(
        (session: { chat_id: string; email?: string; phone?: string }) => {
          sessionInfoMap.set(session.chat_id, {
            email: session.email,
            phone: session.phone,
          });
        }
      );

      const sessionMap = new Map<string, ChatSession>();
      fetchedMessages.forEach((msg: ChatMessage) => {
        if (!sessionMap.has(msg.chat_id)) {
          const sessionInfo = sessionInfoMap.get(msg.chat_id) || {};
          sessionMap.set(msg.chat_id, {
            chat_id: msg.chat_id,
            email: sessionInfo.email,
            phone: sessionInfo.phone,
            created_at: msg.created_at,
            last_message_at: msg.created_at,
            messages: [],
          });
        }
        const session = sessionMap.get(msg.chat_id)!;
        session.messages.push(msg);
        if (new Date(msg.created_at) > new Date(session.last_message_at)) {
          session.last_message_at = msg.created_at;
        }
      });

      const sortedSessions = Array.from(sessionMap.values()).sort(
        (a, b) =>
          new Date(b.last_message_at).getTime() -
          new Date(a.last_message_at).getTime()
      );

      sortedSessions.forEach((session) => {
        session.messages.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      });

      setChatSessions(sortedSessions);
    } catch {
      // Silently fail in production
    }
  }, []);

  // Send reply to a chat session
  const sendReply = useCallback(
    async (chatId: string, content: string) => {
      if (!content.trim()) return;

      // Stop typing indicator when sending
      setIsAdminTyping(false);
      broadcastAdminTyping(false, chatId);
      if (adminTypingTimeoutRef.current) {
        clearTimeout(adminTypingTimeoutRef.current);
      }

      try {
        const res = await fetch("/api/chat/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chatId,
            sender: "admin",
            content: content.trim(),
          }),
        });

        if (res.ok) {
          setReplyInput("");
          fetchMessages();
        }
      } catch {
        // Silently fail in production
      }
    },
    [fetchMessages, broadcastAdminTyping]
  );

  // Realtime subscription for new messages AND typing indicators
  useEffect(() => {
    fetchMessages();

    const supabase = createClient();

    // Channel for new messages
    const messagesChannel = supabase
      .channel("admin_messages_realtime")
      .on(
        "postgres_changes",
        {
          event: "*", // Listen for all events (INSERT, UPDATE, DELETE)
          schema: "public",
          table: "chat_messages",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newMsg = payload.new as ChatMessage;

            // Show alert for new visitor messages
            if (newMsg.sender === "visitor") {
              setNewMessageAlert(true);
              setTimeout(() => setNewMessageAlert(false), 3000);
            }
          }

          // Refresh messages for any change
          fetchMessages();
        }
      )
      .subscribe();

    // Channel for typing indicators (broadcast)
    const typingChannel = supabase
      .channel("typing_indicators")
      .on("broadcast", { event: "typing" }, (payload) => {
        const { chatId, isTyping } = payload.payload;
        setTypingSessions((prev) => {
          const newSet = new Set(prev);
          if (isTyping) {
            newSet.add(chatId);
          } else {
            newSet.delete(chatId);
          }
          return newSet;
        });
      })
      .subscribe();

    // Also poll as backup every 15 seconds
    const interval = setInterval(fetchMessages, 15000);

    return () => {
      supabase.removeChannel(messagesChannel);
      supabase.removeChannel(typingChannel);
      clearInterval(interval);
    };
  }, [fetchMessages]);

  const toggleOnlineStatus = useCallback(async () => {
    if (!userIsAdmin) return;

    const newStatus = !isOnline;
    setIsOnline(newStatus);

    try {
      const res = await fetch("/api/admin/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isOnline: newStatus }),
      });

      if (!res.ok) {
        setIsOnline(!newStatus);
      }
    } catch {
      setIsOnline(!newStatus);
    }
  }, [isOnline, userIsAdmin]);

  // Redirect if not signed in
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/sign-in");
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!userIsAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HiShieldExclamation className="text-red-600" size={40} />
          </div>
          <h1 className="font-heading text-2xl font-bold text-gray-900 mb-3">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">
            This admin dashboard is restricted. Only authorized administrators
            can access this page.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Signed in as:{" "}
            <span className="text-gray-700 font-medium">{userEmail}</span>
          </p>
          <button
            onClick={() => router.push("/")}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Chat Status",
      value: isOnline ? "Online" : "Offline",
      icon: HiChat,
      color: isOnline ? "emerald" : "gray",
      badge: isOnline,
    },
    {
      label: "Total Messages",
      value: messages.length.toString(),
      icon: HiUserGroup,
      color: "blue",
    },
    {
      label: "Active Sessions",
      value: chatSessions.length.toString(),
      icon: HiGlobe,
      color: "purple",
    },
    {
      label: "Session Time",
      value: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      icon: HiClock,
      color: "amber",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      emerald: { bg: "bg-emerald-100", text: "text-emerald-600" },
      gray: { bg: "bg-gray-100", text: "text-gray-600" },
      blue: { bg: "bg-blue-100", text: "text-blue-600" },
      purple: { bg: "bg-purple-100", text: "text-purple-600" },
      amber: { bg: "bg-amber-100", text: "text-amber-600" },
    };
    return colors[color] || colors.gray;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* New Message Alert */}
      {newMessageAlert && (
        <div className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-4 py-3 rounded-xl shadow-lg animate-pulse">
          <div className="flex items-center gap-2">
            <HiChat size={20} />
            <span className="font-medium">New message received!</span>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold">J</span>
                </div>
                <div>
                  <h1 className="font-heading font-bold text-gray-900">
                    Admin
                  </h1>
                  <p className="text-xs text-gray-500">Dashboard</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
              >
                <HiX size={20} />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === "overview"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <HiChartBar size={20} />
              <span className="font-medium">Overview</span>
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === "messages"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <HiChat size={20} />
              <span className="font-medium">Messages</span>
              {messages.length > 0 && (
                <span className="ml-auto px-2 py-0.5 text-xs bg-blue-600 text-white rounded-full">
                  {messages.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === "settings"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <HiCog size={20} />
              <span className="font-medium">Settings</span>
            </button>
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <HiHome size={20} />
              <span className="font-medium">Back to Site</span>
            </Link>
            <button
              onClick={() => signOut()}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <HiLogout size={20} />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
              >
                <HiMenuAlt2 size={24} />
              </button>
              <div>
                <h2 className="font-heading text-xl font-bold text-gray-900">
                  Welcome back, {user?.full_name?.split(" ")[0] || "Admin"}
                </h2>
                <p className="text-sm text-gray-500">
                  Manage your portfolio and chat settings
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Status Toggle */}
              <button
                onClick={toggleOnlineStatus}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  isOnline
                    ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                    : "bg-gray-100 text-gray-600 border border-gray-200"
                }`}
              >
                {isOnline ? (
                  <>
                    <HiStatusOnline size={18} />
                    <span className="hidden sm:inline">Online</span>
                  </>
                ) : (
                  <>
                    <HiStatusOffline size={18} />
                    <span className="hidden sm:inline">Offline</span>
                  </>
                )}
              </button>

              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900 bg-gray-100 rounded-xl">
                <HiBell size={20} />
                {messages.filter((m) => m.sender === "visitor").length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {messages.filter((m) => m.sender === "visitor").length > 9
                      ? "9+"
                      : messages.filter((m) => m.sender === "visitor").length}
                  </span>
                )}
              </button>

              {/* User Avatar */}
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {user?.full_name?.[0] || "A"}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => {
                  const colors = getColorClasses(stat.color);
                  return (
                    <div
                      key={stat.label}
                      className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-2.5 rounded-xl ${colors.bg}`}>
                          <stat.icon className={colors.text} size={22} />
                        </div>
                        {stat.badge !== undefined && (
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${
                              stat.badge
                                ? "bg-emerald-500 animate-pulse"
                                : "bg-gray-400"
                            }`}
                          />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                      <p className="font-heading text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-heading text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <button
                    onClick={toggleOnlineStatus}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                      isOnline
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                        : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {isOnline ? (
                      <HiStatusOnline size={24} />
                    ) : (
                      <HiStatusOffline size={24} />
                    )}
                    <span className="text-sm font-medium">
                      {isOnline ? "Go Offline" : "Go Online"}
                    </span>
                  </button>
                  <button
                    onClick={fetchMessages}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all"
                  >
                    <HiRefresh size={24} />
                    <span className="text-sm font-medium">Refresh</span>
                  </button>
                  <Link
                    href="/"
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all"
                  >
                    <HiGlobe size={24} />
                    <span className="text-sm font-medium">View Site</span>
                  </Link>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all"
                  >
                    <HiCog size={24} />
                    <span className="text-sm font-medium">Settings</span>
                  </button>
                </div>
              </div>

              {/* Recent Messages Preview */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-lg font-semibold text-gray-900">
                    Recent Messages
                  </h3>
                  <button
                    onClick={() => setActiveTab("messages")}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View All →
                  </button>
                </div>
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <HiChat className="text-gray-400" size={28} />
                    </div>
                    <p className="text-gray-500">No messages yet</p>
                    <p className="text-sm text-gray-400">
                      Messages from visitors will appear here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.slice(0, 5).map((message) => (
                      <div
                        key={message.id}
                        className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl"
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            message.sender === "visitor"
                              ? "bg-blue-100"
                              : "bg-emerald-100"
                          }`}
                        >
                          <span
                            className={`text-sm font-bold ${
                              message.sender === "visitor"
                                ? "text-blue-600"
                                : "text-emerald-600"
                            }`}
                          >
                            {message.sender === "visitor" ? "V" : "A"}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-900">
                              {message.sender === "visitor" ? "Visitor" : "You"}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(message.created_at).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {message.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "messages" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sessions List */}
              <div className="bg-white rounded-2xl border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-lg font-semibold text-gray-900">
                      Chat Sessions
                    </h3>
                    <button
                      onClick={fetchMessages}
                      className="p-2 text-gray-500 hover:text-gray-700 bg-gray-100 rounded-lg transition-colors"
                    >
                      <HiRefresh size={16} />
                    </button>
                  </div>
                </div>
                <div className="max-h-[600px] overflow-y-auto">
                  {chatSessions.length === 0 ? (
                    <div className="text-center py-12 px-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <HiChat className="text-gray-400" size={28} />
                      </div>
                      <p className="text-gray-500">No chat sessions yet</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {chatSessions.map((session) => (
                        <button
                          key={session.chat_id}
                          onClick={() => setSelectedSession(session.chat_id)}
                          className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                            selectedSession === session.chat_id
                              ? "bg-blue-50 border-l-2 border-blue-600"
                              : ""
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-900">
                                {session.email || session.phone || "Anonymous"}
                              </span>
                              {typingSessions.has(session.chat_id) && (
                                <span className="text-xs text-blue-600 font-medium">
                                  typing...
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-gray-500">
                              {new Date(
                                session.last_message_at
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 truncate">
                            {session.messages[session.messages.length - 1]
                              ?.content || "No messages"}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {session.messages.length} message
                            {session.messages.length !== 1 ? "s" : ""}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Messages */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 flex flex-col min-h-[500px]">
                {selectedSession ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {chatSessions.find(
                              (s) => s.chat_id === selectedSession
                            )?.email ||
                              chatSessions.find(
                                (s) => s.chat_id === selectedSession
                              )?.phone ||
                              "Anonymous Visitor"}
                          </h3>
                          <p className="text-xs text-gray-500">
                            Chat ID: {selectedSession.slice(0, 20)}...
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedSession(null)}
                          className="p-2 text-gray-500 hover:text-gray-700"
                        >
                          <HiX size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-3">
                      {chatSessions
                        .find((s) => s.chat_id === selectedSession)
                        ?.messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.sender === "admin"
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-[80%] rounded-2xl p-3 ${
                                message.sender === "admin"
                                  ? "bg-blue-600 text-white rounded-br-none"
                                  : "bg-gray-100 text-gray-900 rounded-bl-none"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  message.sender === "admin"
                                    ? "text-blue-200"
                                    : "text-gray-500"
                                }`}
                              >
                                {new Date(
                                  message.created_at
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                        ))}

                      {/* Typing Indicator */}
                      {typingSessions.has(selectedSession) && (
                        <TypingIndicator />
                      )}

                      <div ref={messagesEndRef} />
                    </div>

                    {/* Reply Input */}
                    <div className="p-4 border-t border-gray-200">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          sendReply(selectedSession, replyInput);
                        }}
                        className="flex gap-2"
                      >
                        <input
                          type="text"
                          value={replyInput}
                          onChange={(e) =>
                            handleReplyInputChange(e.target.value)
                          }
                          placeholder="Type your reply..."
                          className="flex-1 px-4 py-2 bg-gray-100 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="submit"
                          disabled={!replyInput.trim()}
                          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          <HiPaperAirplane size={16} className="rotate-90" />
                          <span className="hidden sm:inline">Send</span>
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <HiReply className="text-gray-400" size={36} />
                      </div>
                      <p className="text-gray-600 mb-2">
                        Select a conversation
                      </p>
                      <p className="text-sm text-gray-400">
                        Choose a chat session from the list to view and reply
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              {/* Chat Settings */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-heading text-lg font-semibold text-gray-900 mb-6">
                  Chat Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        Enable Live Chat
                      </h4>
                      <p className="text-sm text-gray-500">
                        When enabled, visitors can chat with you in real-time
                      </p>
                    </div>
                    <button
                      onClick={toggleOnlineStatus}
                      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                        isOnline ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${
                          isOnline ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Info Card */}
              <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
                <h3 className="font-heading text-lg font-semibold text-gray-900 mb-3">
                  💡 Quick Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    Toggle your online status to show the chat widget to
                    visitors
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    Your status is synced in real-time across all devices
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    Messages are stored securely and persist across sessions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    You&apos;ll see a typing indicator when visitors are
                    composing messages
                  </li>
                </ul>
              </div>

              {/* Danger Zone */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-heading text-lg font-semibold text-red-600 mb-4">
                  Danger Zone
                </h3>
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        Clear All Messages
                      </h4>
                      <p className="text-sm text-gray-500">
                        This action cannot be undone
                      </p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 border border-red-200 rounded-xl hover:bg-red-200 transition-colors">
                      <HiTrash size={18} />
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
