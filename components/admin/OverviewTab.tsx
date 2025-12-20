"use client";

import React from "react";
import Link from "next/link";
import {
  HiChat,
  HiClock,
  HiUserGroup,
  HiGlobe,
  HiStatusOnline,
  HiStatusOffline,
  HiRefresh,
  HiCog,
} from "react-icons/hi";
import { ChatMessage } from "./types";

interface OverviewTabProps {
  isOnline: boolean;
  messagesCount: number;
  sessionsCount: number;
  messages: ChatMessage[];
  toggleOnlineStatus: () => void;
  fetchMessages: () => void;
  setActiveTab: (tab: string) => void;
}

export default function OverviewTab({
  isOnline,
  messagesCount,
  sessionsCount,
  messages,
  toggleOnlineStatus,
  fetchMessages,
  setActiveTab,
}: OverviewTabProps) {
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
      value: messagesCount.toString(),
      icon: HiUserGroup,
      color: "blue",
    },
    {
      label: "Active Sessions",
      value: sessionsCount.toString(),
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
                      {new Date(message.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
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
  );
}
