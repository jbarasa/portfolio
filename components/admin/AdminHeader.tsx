"use client";

import React from "react";
import {
  HiMenuAlt2,
  HiBell,
  HiStatusOnline,
  HiStatusOffline,
} from "react-icons/hi";
import { AdminUser } from "./types";

interface AdminHeaderProps {
  user: AdminUser | null;
  isOnline: boolean;
  toggleOnlineStatus: () => void;
  setSidebarOpen: (open: boolean) => void;
  visitorMessagesCount: number;
}

export default function AdminHeader({
  user,
  isOnline,
  toggleOnlineStatus,
  setSidebarOpen,
  visitorMessagesCount,
}: AdminHeaderProps) {
  return (
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
            {visitorMessagesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {visitorMessagesCount > 9 ? "9+" : visitorMessagesCount}
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
  );
}
