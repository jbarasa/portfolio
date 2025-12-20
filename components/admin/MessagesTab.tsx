"use client";

import React, { useRef, useEffect } from "react";
import {
  HiChat,
  HiReply,
  HiPaperAirplane,
  HiExternalLink,
} from "react-icons/hi";
import { ChatSession } from "./types";

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

// Link Preview Component
const LinkPreview = ({ url }: { url: string }) => {
  const displayUrl =
    url.replace(/^https?:\/\//, "").slice(0, 30) +
    (url.length > 30 ? "..." : "");

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 mt-2 p-2 bg-white/50 rounded-lg border border-gray-200 hover:bg-white transition-colors text-sm"
    >
      <HiExternalLink size={14} className="text-blue-500 shrink-0" />
      <span className="text-blue-600 truncate">{displayUrl}</span>
    </a>
  );
};

// Extract URLs from text
const extractUrls = (text: string): string[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex) || [];
};

// Render message content with link previews
const MessageContent = ({
  content,
  isUser,
}: {
  content: string;
  isUser: boolean;
}) => {
  const urls = extractUrls(content);

  return (
    <div>
      <p className={`text-sm ${isUser ? "text-white" : "text-gray-700"}`}>
        {content}
      </p>
      {urls.map((url, index) => (
        <LinkPreview key={index} url={url} />
      ))}
    </div>
  );
};

interface MessagesTabProps {
  chatSessions: ChatSession[];
  selectedSession: string | null;
  setSelectedSession: (id: string | null) => void;
  replyInput: string;
  handleReplyInputChange: (value: string) => void;
  sendReply: (chatId: string, content: string) => void;
  typingSessions: Set<string>;
}

export default function MessagesTab({
  chatSessions,
  selectedSession,
  setSelectedSession,
  replyInput,
  handleReplyInputChange,
  sendReply,
  typingSessions,
}: MessagesTabProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedSession, chatSessions]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
      {/* Sessions List */}
      <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-heading font-semibold text-gray-900">
            Chat Sessions ({chatSessions.length})
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chatSessions.length === 0 ? (
            <div className="p-8 text-center">
              <HiChat className="mx-auto text-gray-300 mb-2" size={32} />
              <p className="text-sm text-gray-500">No chat sessions yet</p>
            </div>
          ) : (
            chatSessions.map((session) => (
              <button
                key={session.chat_id}
                onClick={() => setSelectedSession(session.chat_id)}
                className={`w-full p-4 text-left border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  selectedSession === session.chat_id ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span className="text-blue-600 font-bold">
                      {session.email?.[0]?.toUpperCase() || "V"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900 truncate">
                        {session.email || session.phone || "Visitor"}
                      </p>
                      {typingSessions.has(session.chat_id) && (
                        <span className="text-xs text-green-600 animate-pulse">
                          typing...
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {session.messages[session.messages.length - 1]?.content ||
                        "No messages"}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(session.last_message_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat View */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col">
        {selectedSession ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-blue-600 font-bold">
                    {chatSessions
                      .find((s) => s.chat_id === selectedSession)
                      ?.email?.[0]?.toUpperCase() || "V"}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {chatSessions.find((s) => s.chat_id === selectedSession)
                      ?.email ||
                      chatSessions.find((s) => s.chat_id === selectedSession)
                        ?.phone ||
                      "Visitor"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {chatSessions.find((s) => s.chat_id === selectedSession)
                      ?.phone || "No phone"}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {chatSessions
                .find((s) => s.chat_id === selectedSession)
                ?.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "admin" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                        msg.sender === "admin"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-gray-100 text-gray-700 rounded-bl-none"
                      }`}
                    >
                      <MessageContent
                        content={msg.content}
                        isUser={msg.sender === "admin"}
                      />
                      <p
                        className={`text-xs mt-1 ${
                          msg.sender === "admin"
                            ? "text-blue-200"
                            : "text-gray-400"
                        }`}
                      >
                        {new Date(msg.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}

              {/* Typing Indicator */}
              {typingSessions.has(selectedSession) && <TypingIndicator />}

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
                  onChange={(e) => handleReplyInputChange(e.target.value)}
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
              <p className="text-gray-600 mb-2">Select a conversation</p>
              <p className="text-sm text-gray-400">
                Choose a chat session from the list to view and reply
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
