"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { HiChat, HiX, HiPaperAirplane, HiMail, HiPhone } from "react-icons/hi";
import { useChat } from "@/lib/context/ChatContext";
import { createClient } from "@/lib/supabase/client";

const ChatWidget: React.FC = () => {
  const {
    isOnline,
    isChatOpen,
    setIsChatOpen,
    messages,
    addMessage,
    visitorInfo,
    setVisitorInfo,
    startChat,
    chatId,
    unreadCount,
  } = useChat();
  const [inputValue, setInputValue] = useState("");
  const [contactInput, setContactInput] = useState({
    email: visitorInfo?.email || "",
    phone: visitorInfo?.phone || "",
  });
  // Initialize showContactForm based on visitorInfo
  const [showContactForm, setShowContactForm] = useState(!visitorInfo);
  const [contactError, setContactError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [adminIsTyping, setAdminIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Broadcast typing indicator
  const broadcastTyping = useCallback(
    (typing: boolean) => {
      if (!chatId) return;

      const supabase = createClient();
      supabase.channel("typing_indicators").send({
        type: "broadcast",
        event: "typing",
        payload: { chatId, isTyping: typing },
      });
    },
    [chatId]
  );

  // Handle input change with typing indicator
  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (!isTyping && value.length > 0) {
      setIsTyping(true);
      broadcastTyping(true);
    }

    // Reset typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Stop typing indicator after 2 seconds of no input
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      broadcastTyping(false);
    }, 2000);
  };

  // Clean up typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  // Subscribe to admin typing indicators
  useEffect(() => {
    if (!chatId) return;

    const supabase = createClient();
    const channel = supabase
      .channel("admin_typing")
      .on("broadcast", { event: "admin_typing" }, (payload) => {
        if (payload.payload.chatId === chatId) {
          setAdminIsTyping(payload.payload.isTyping);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, phone } = contactInput;

    // Validate at least one contact method
    if (!email && !phone) {
      setContactError("Please provide email or phone number");
      return;
    }

    // Basic email validation
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setContactError("Please enter a valid email address");
      return;
    }

    // Basic phone validation (at least 10 digits)
    if (phone && !/^[\d\s+()-]{10,}$/.test(phone)) {
      setContactError("Please enter a valid phone number");
      return;
    }

    setContactError("");
    const info = { email: email || undefined, phone: phone || undefined };
    setVisitorInfo(info);

    // Start chat session immediately with the visitor info
    await startChat(info);
    setShowContactForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Stop typing indicator when sending
    setIsTyping(false);
    broadcastTyping(false);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    addMessage(inputValue.trim(), "user");
    setInputValue("");
  };

  return (
    <>
      {/* Chat Button - Always visible with online/offline status */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-blue-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 flex items-center gap-2"
          aria-label="Open chat"
        >
          <HiChat size={20} className="sm:w-6 sm:h-6" />
          <span className="hidden sm:inline text-sm font-medium">
            {isOnline ? "Chat Now" : "Leave Message"}
          </span>
          {/* Unread count badge */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
          {/* Online/Offline indicator (only show if no unread) */}
          {unreadCount === 0 && (
            <span
              className={`absolute top-0 right-0 w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full border-2 border-white ${
                isOnline ? "bg-green-500 animate-pulse" : "bg-gray-400"
              }`}
            />
          )}
        </button>
      )}

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-80 md:w-96 bg-white sm:rounded-2xl shadow-2xl border border-gray-200 flex flex-col h-[85vh] sm:h-auto sm:max-h-[500px]">
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 sm:p-4 sm:rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <div className="w-8 sm:w-10 h-8 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <HiChat size={16} className="sm:w-5 sm:h-5" />
                </div>
                <span
                  className={`absolute bottom-0 right-0 w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full border-2 border-blue-600 ${
                    isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-sm sm:text-base">
                  Live Chat
                </h3>
                <p className="text-xs text-blue-100">
                  {isOnline ? "I'm online now" : "I'm currently offline"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1.5 sm:p-1 hover:bg-blue-500 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <HiX size={20} />
            </button>
          </div>

          {/* Contact Form - Show if no visitor info */}
          {showContactForm ? (
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Start a conversation
                </h4>
                <p className="text-sm text-gray-600">
                  {isOnline
                    ? "Enter your contact info to chat with me directly."
                    : "Leave your contact info and message. I'll get back to you soon!"}
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <HiMail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      type="email"
                      value={contactInput.email}
                      onChange={(e) =>
                        setContactInput((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="your@email.com"
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="text-center text-xs text-gray-400">or</div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <HiPhone
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      type="tel"
                      value={contactInput.phone}
                      onChange={(e) =>
                        setContactInput((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      placeholder="+1 234 567 8900"
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {contactError && (
                  <p className="text-xs text-red-500">{contactError}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Start Chat
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 p-3 sm:p-4 overflow-y-auto min-h-[150px] sm:min-h-[200px] space-y-3">
                {/* Intro message */}
                <div className="flex gap-2">
                  <div className="w-7 sm:w-8 h-7 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <HiChat
                      size={12}
                      className="text-blue-600 sm:w-3.5 sm:h-3.5"
                    />
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-none p-2.5 sm:p-3 max-w-[85%]">
                    <p className="text-xs sm:text-sm text-gray-700">
                      {isOnline
                        ? "Hi! I'm available right now. Tell me about your project or issue, and I'll respond shortly."
                        : "Hi! I'm currently offline, but feel free to leave a message and I'll get back to you as soon as possible."}
                    </p>
                  </div>
                </div>

                {/* Chat messages */}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${
                      message.sender === "user" ? "justify-end" : ""
                    }`}
                  >
                    {message.sender === "admin" && (
                      <div className="w-7 sm:w-8 h-7 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                        <HiChat
                          size={12}
                          className="text-blue-600 sm:w-3.5 sm:h-3.5"
                        />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl p-2.5 sm:p-3 max-w-[85%] ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white rounded-tr-none"
                          : "bg-gray-100 text-gray-700 rounded-tl-none"
                      }`}
                    >
                      <p className="text-xs sm:text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}

                {/* Admin typing indicator */}
                {adminIsTyping && (
                  <div className="flex gap-2">
                    <div className="w-7 sm:w-8 h-7 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                      <HiChat
                        size={12}
                        className="text-blue-600 sm:w-3.5 sm:h-3.5"
                      />
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-none p-2.5 sm:p-3">
                      <div className="flex items-center gap-1">
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
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="p-3 sm:p-4 border-t border-gray-100 pb-safe"
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-3 sm:px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    <HiPaperAirplane
                      size={16}
                      className="rotate-90 sm:w-4.5 sm:h-4.5"
                    />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;
