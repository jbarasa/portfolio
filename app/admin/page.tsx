"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { HiShieldExclamation, HiChat } from "react-icons/hi";
import { isAdmin } from "@/lib/constants";
import {
  AdminSidebar,
  AdminHeader,
  OverviewTab,
  MessagesTab,
  ContactsTab,
  ProjectsTab,
  BlogTab,
  SettingsTab,
  ChatMessage,
  ChatSession,
  ContactSubmission,
  Project,
  BlogPost,
} from "@/components/admin";

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
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [contactSubmissions, setContactSubmissions] = useState<
    ContactSubmission[]
  >([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [typingSessions, setTypingSessions] = useState<Set<string>>(new Set());
  const [newMessageAlert, setNewMessageAlert] = useState(false);
  const [isAdminTyping, setIsAdminTyping] = useState(false);
  const adminTypingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Fetch contact submissions from API
  const fetchContactSubmissions = useCallback(async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      setContactSubmissions(data.submissions || []);
    } catch {
      // Silently fail in production
    }
  }, []);

  // Fetch projects from API
  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data.projects || []);
    } catch {
      // Silently fail in production
    }
  }, []);

  // Fetch blog posts from API
  const fetchBlogPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/blog?all=true");
      const data = await res.json();
      setBlogPosts(data.posts || []);
    } catch {
      // Silently fail in production
    }
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

  // Save project
  const handleSaveProject = useCallback(
    async (project: Partial<Project>) => {
      try {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(project),
        });

        if (res.ok) {
          fetchProjects();
        }
      } catch {
        // Silently fail
      }
    },
    [fetchProjects]
  );

  // Delete project
  const handleDeleteProject = useCallback(
    async (id: number) => {
      try {
        const res = await fetch(`/api/projects?id=${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          fetchProjects();
        }
      } catch {
        // Silently fail
      }
    },
    [fetchProjects]
  );

  // Save blog post
  const handleSaveBlogPost = useCallback(
    async (post: Partial<BlogPost>): Promise<boolean> => {
      try {
        const res = await fetch("/api/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(post),
        });

        if (res.ok) {
          fetchBlogPosts();
          return true;
        }
        return false;
      } catch {
        return false;
      }
    },
    [fetchBlogPosts]
  );

  // Delete blog post
  const handleDeleteBlogPost = useCallback(
    async (id: number): Promise<boolean> => {
      try {
        const res = await fetch(`/api/blog?id=${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          fetchBlogPosts();
          return true;
        }
        return false;
      } catch {
        return false;
      }
    },
    [fetchBlogPosts]
  );

  // Realtime subscription for new messages AND typing indicators
  useEffect(() => {
    fetchMessages();
    fetchContactSubmissions();
    fetchProjects();
    fetchBlogPosts();

    const supabase = createClient();

    // Channel for new messages
    const messagesChannel = supabase
      .channel("admin_messages_realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
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
  }, [fetchMessages, fetchContactSubmissions, fetchProjects, fetchBlogPosts]);

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

  const visitorMessagesCount = messages.filter(
    (m) => m.sender === "visitor"
  ).length;

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
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        messagesCount={messages.length}
        contactsCount={contactSubmissions.length}
        projectsCount={projects.length}
        blogPostsCount={blogPosts.length}
        onSignOut={signOut}
      />

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <AdminHeader
          user={user}
          isOnline={isOnline}
          toggleOnlineStatus={toggleOnlineStatus}
          setSidebarOpen={setSidebarOpen}
          visitorMessagesCount={visitorMessagesCount}
        />

        {/* Page Content */}
        <main className="p-4 sm:p-6">
          {activeTab === "overview" && (
            <OverviewTab
              isOnline={isOnline}
              messagesCount={messages.length}
              sessionsCount={chatSessions.length}
              messages={messages}
              toggleOnlineStatus={toggleOnlineStatus}
              fetchMessages={fetchMessages}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === "messages" && (
            <MessagesTab
              chatSessions={chatSessions}
              selectedSession={selectedSession}
              setSelectedSession={setSelectedSession}
              replyInput={replyInput}
              handleReplyInputChange={handleReplyInputChange}
              sendReply={sendReply}
              typingSessions={typingSessions}
            />
          )}

          {activeTab === "contacts" && (
            <ContactsTab
              contactSubmissions={contactSubmissions}
              fetchContactSubmissions={fetchContactSubmissions}
            />
          )}

          {activeTab === "projects" && (
            <ProjectsTab
              projects={projects}
              fetchProjects={fetchProjects}
              onSaveProject={handleSaveProject}
              onDeleteProject={handleDeleteProject}
            />
          )}

          {activeTab === "blog" && (
            <BlogTab
              posts={blogPosts}
              onRefresh={fetchBlogPosts}
              onSave={handleSaveBlogPost}
              onDelete={handleDeleteBlogPost}
            />
          )}

          {activeTab === "settings" && (
            <SettingsTab
              isOnline={isOnline}
              toggleOnlineStatus={toggleOnlineStatus}
            />
          )}
        </main>
      </div>
    </div>
  );
}
