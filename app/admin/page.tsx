"use client";

import React, { useEffect, useState, useCallback } from "react";
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
}

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

  const userEmail = user?.email;
  const userIsAdmin = isAdmin(userEmail);

  // Fetch admin status from API
  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch("/api/admin/status");
        const data = await res.json();
        setIsOnline(data.isOnline);
      } catch (error) {
        console.error("Error fetching status:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStatus();
  }, []);

  // Fetch messages and sessions from API
  const fetchMessages = useCallback(async () => {
    try {
      // Fetch messages and sessions in parallel
      const [messagesRes, sessionsRes] = await Promise.all([
        fetch("/api/chat/messages"),
        fetch("/api/chat/session"),
      ]);

      const messagesData = await messagesRes.json();
      const sessionsData = await sessionsRes.json();

      const fetchedMessages = messagesData.messages || [];
      const fetchedSessions = sessionsData.sessions || [];

      setMessages(fetchedMessages);

      // Create a map of session info (email, phone) by chat_id
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

      // Group messages by chat_id to create sessions with contact info
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

      // Sort sessions by last message time (most recent first)
      const sortedSessions = Array.from(sessionMap.values()).sort(
        (a, b) =>
          new Date(b.last_message_at).getTime() -
          new Date(a.last_message_at).getTime()
      );

      // Sort messages within each session by created_at (oldest first)
      sortedSessions.forEach((session) => {
        session.messages.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      });

      setChatSessions(sortedSessions);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, []);

  // Send reply to a chat session
  const sendReply = useCallback(
    async (chatId: string, content: string) => {
      if (!content.trim()) return;

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
          fetchMessages(); // Refresh messages
        }
      } catch (error) {
        console.error("Error sending reply:", error);
      }
    },
    [fetchMessages]
  );

  useEffect(() => {
    fetchMessages();

    // Subscribe to realtime messages for instant updates
    const supabase = createClient();
    const channel = supabase
      .channel("admin_messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
        },
        () => {
          // Refresh messages when a new message is inserted
          fetchMessages();
        }
      )
      .subscribe();

    // Also poll as backup every 10 seconds
    const interval = setInterval(fetchMessages, 10000);

    return () => {
      supabase.removeChannel(channel);
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
        console.error("Failed to update status");
      }
    } catch (error) {
      setIsOnline(!newStatus);
      console.error("Error updating status:", error);
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
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Show access denied for non-admin users
  if (!userIsAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-8 text-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HiShieldExclamation className="text-red-500" size={40} />
          </div>
          <h1 className="font-heading text-2xl font-bold text-white mb-3">
            Access Denied
          </h1>
          <p className="text-gray-400 mb-6">
            This admin dashboard is restricted. Only authorized administrators
            can access this page.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Signed in as: <span className="text-gray-300">{userEmail}</span>
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
    const colors: Record<string, { bg: string; text: string; badge: string }> =
      {
        emerald: {
          bg: "bg-emerald-500/10",
          text: "text-emerald-500",
          badge: "bg-emerald-500",
        },
        gray: {
          bg: "bg-gray-500/10",
          text: "text-gray-400",
          badge: "bg-gray-500",
        },
        blue: {
          bg: "bg-blue-500/10",
          text: "text-blue-500",
          badge: "bg-blue-500",
        },
        purple: {
          bg: "bg-purple-500/10",
          text: "text-purple-500",
          badge: "bg-purple-500",
        },
        amber: {
          bg: "bg-amber-500/10",
          text: "text-amber-500",
          badge: "bg-amber-500",
        },
      };
    return colors[color] || colors.gray;
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-white font-bold">J</span>
                </div>
                <div>
                  <h1 className="font-heading font-bold text-white">Admin</h1>
                  <p className="text-xs text-gray-500">Dashboard</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 text-gray-400 hover:text-white"
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
                  ? "bg-blue-500/10 text-blue-500"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <HiChartBar size={20} />
              <span className="font-medium">Overview</span>
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === "messages"
                  ? "bg-blue-500/10 text-blue-500"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <HiChat size={20} />
              <span className="font-medium">Messages</span>
              {messages.length > 0 && (
                <span className="ml-auto px-2 py-0.5 text-xs bg-blue-500 text-white rounded-full">
                  {messages.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === "settings"
                  ? "bg-blue-500/10 text-blue-500"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <HiCog size={20} />
              <span className="font-medium">Settings</span>
            </button>
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-gray-800 space-y-2">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-xl transition-colors"
            >
              <HiHome size={20} />
              <span className="font-medium">Back to Site</span>
            </Link>
            <button
              onClick={() => signOut()}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
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
        <header className="sticky top-0 z-30 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-400 hover:text-white"
              >
                <HiMenuAlt2 size={24} />
              </button>
              <div>
                <h2 className="font-heading text-xl font-bold text-white">
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
                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                    : "bg-gray-800 text-gray-400 border border-gray-700"
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
              <button className="relative p-2 text-gray-400 hover:text-white bg-gray-800 rounded-xl">
                <HiBell size={20} />
                {messages.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {messages.length > 9 ? "9+" : messages.length}
                  </span>
                )}
              </button>

              {/* User Avatar */}
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
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
                      className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-5 hover:border-gray-700 transition-colors"
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
                                : "bg-gray-600"
                            }`}
                          />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                      <p className="font-heading text-2xl font-bold text-white">
                        {stat.value}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-6">
                <h3 className="font-heading text-lg font-semibold text-white mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <button
                    onClick={toggleOnlineStatus}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                      isOnline
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                        : "bg-gray-800 border-gray-700 text-gray-400 hover:text-white"
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
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-400 hover:text-white transition-all"
                  >
                    <HiRefresh size={24} />
                    <span className="text-sm font-medium">Refresh</span>
                  </button>
                  <Link
                    href="/"
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-400 hover:text-white transition-all"
                  >
                    <HiGlobe size={24} />
                    <span className="text-sm font-medium">View Site</span>
                  </Link>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-400 hover:text-white transition-all"
                  >
                    <HiCog size={24} />
                    <span className="text-sm font-medium">Settings</span>
                  </button>
                </div>
              </div>

              {/* Recent Messages Preview */}
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-lg font-semibold text-white">
                    Recent Messages
                  </h3>
                  <button
                    onClick={() => setActiveTab("messages")}
                    className="text-sm text-blue-500 hover:text-blue-400"
                  >
                    View All →
                  </button>
                </div>
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <HiChat className="text-gray-600" size={28} />
                    </div>
                    <p className="text-gray-500">No messages yet</p>
                    <p className="text-sm text-gray-600">
                      Messages from visitors will appear here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.slice(0, 5).map((message) => (
                      <div
                        key={message.id}
                        className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-xl"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-500 text-sm font-bold">
                            {message.sender === "visitor" ? "V" : "A"}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-sm font-medium text-white">
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
                          <p className="text-sm text-gray-400 truncate">
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
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800">
                <div className="p-4 border-b border-gray-800">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-lg font-semibold text-white">
                      Chat Sessions
                    </h3>
                    <button
                      onClick={fetchMessages}
                      className="p-2 text-gray-400 hover:text-white bg-gray-800 rounded-lg transition-colors"
                    >
                      <HiRefresh size={16} />
                    </button>
                  </div>
                </div>
                <div className="max-h-[600px] overflow-y-auto">
                  {chatSessions.length === 0 ? (
                    <div className="text-center py-12 px-4">
                      <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <HiChat className="text-gray-600" size={28} />
                      </div>
                      <p className="text-gray-500">No chat sessions yet</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-800">
                      {chatSessions.map((session) => (
                        <button
                          key={session.chat_id}
                          onClick={() => setSelectedSession(session.chat_id)}
                          className={`w-full text-left p-4 hover:bg-gray-800/50 transition-colors ${
                            selectedSession === session.chat_id
                              ? "bg-blue-500/10 border-l-2 border-blue-500"
                              : ""
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-white">
                              {session.email || session.phone || "Anonymous"}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(
                                session.last_message_at
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 truncate">
                            {session.messages[session.messages.length - 1]
                              ?.content || "No messages"}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
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
              <div className="lg:col-span-2 bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 flex flex-col">
                {selectedSession ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-white">
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
                          className="p-2 text-gray-400 hover:text-white"
                        >
                          <HiX size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto max-h-[400px] space-y-3">
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
                                  : "bg-gray-800 text-gray-200 rounded-bl-none"
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
                    </div>

                    {/* Reply Input */}
                    <div className="p-4 border-t border-gray-800">
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
                          onChange={(e) => setReplyInput(e.target.value)}
                          placeholder="Type your reply..."
                          className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
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
                      <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <HiReply className="text-gray-600" size={36} />
                      </div>
                      <p className="text-gray-400 mb-2">
                        Select a conversation
                      </p>
                      <p className="text-sm text-gray-600">
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
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-6">
                <h3 className="font-heading text-lg font-semibold text-white mb-6">
                  Chat Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-white mb-1">
                        Enable Live Chat
                      </h4>
                      <p className="text-sm text-gray-500">
                        When enabled, visitors can chat with you in real-time
                      </p>
                    </div>
                    <button
                      onClick={toggleOnlineStatus}
                      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                        isOnline ? "bg-blue-600" : "bg-gray-700"
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
              <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl border border-blue-500/20 p-6">
                <h3 className="font-heading text-lg font-semibold text-white mb-3">
                  💡 Quick Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Toggle your online status to show the chat widget to
                    visitors
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Your status is synced in real-time across all devices
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Messages are stored securely and persist across sessions
                  </li>
                </ul>
              </div>

              {/* Danger Zone */}
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-6">
                <h3 className="font-heading text-lg font-semibold text-red-400 mb-4">
                  Danger Zone
                </h3>
                <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white mb-1">
                        Clear All Messages
                      </h4>
                      <p className="text-sm text-gray-500">
                        This action cannot be undone
                      </p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-colors">
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
