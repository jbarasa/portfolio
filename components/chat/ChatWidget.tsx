"use client";

import React, { useState, useRef, useEffect } from "react";
import { HiChat, HiX, HiPaperAirplane } from "react-icons/hi";
import { useChat } from "@/lib/context/ChatContext";

const ChatWidget: React.FC = () => {
  const { isOnline, isChatOpen, setIsChatOpen, messages, addMessage } =
    useChat();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && isOnline) {
      addMessage(inputValue.trim(), "user");
      setInputValue("");
    }
  };

  // Don't show widget if not online
  if (!isOnline) {
    return null;
  }

  return (
    <>
      {/* Chat Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-blue-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 flex items-center gap-2"
          aria-label="Open chat"
        >
          <HiChat size={20} className="sm:w-6 sm:h-6" />
          <span className="hidden sm:inline text-sm font-medium">Chat Now</span>
          {/* Online indicator */}
          <span className="absolute top-0 right-0 w-2.5 sm:w-3 h-2.5 sm:h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
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
                <span className="absolute bottom-0 right-0 w-2.5 sm:w-3 h-2.5 sm:h-3 bg-green-500 rounded-full border-2 border-blue-600" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-sm sm:text-base">
                  Live Chat
                </h3>
                <p className="text-xs text-blue-100">I&apos;m online now</p>
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

          {/* Messages */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto min-h-[150px] sm:min-h-[200px] space-y-3">
            {/* Intro message */}
            <div className="flex gap-2">
              <div className="w-7 sm:w-8 h-7 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                <HiChat size={12} className="text-blue-600 sm:w-3.5 sm:h-3.5" />
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-tl-none p-2.5 sm:p-3 max-w-[85%]">
                <p className="text-xs sm:text-sm text-gray-700">
                  Hi! I&apos;m available right now. Tell me about your project
                  or issue, and I&apos;ll respond shortly.
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
                onChange={(e) => setInputValue(e.target.value)}
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
        </div>
      )}
    </>
  );
};

export default ChatWidget;
