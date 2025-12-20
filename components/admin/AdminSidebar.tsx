"use client";

import React from "react";
import Link from "next/link";
import {
  HiChartBar,
  HiChat,
  HiMail,
  HiCog,
  HiHome,
  HiLogout,
  HiX,
  HiCollection,
  HiBookOpen,
} from "react-icons/hi";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  messagesCount: number;
  contactsCount: number;
  projectsCount: number;
  blogPostsCount: number;
  onSignOut: () => void;
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
  messagesCount,
  contactsCount,
  projectsCount,
  blogPostsCount,
  onSignOut,
}: AdminSidebarProps) {
  const navItems = [
    { id: "overview", label: "Overview", icon: HiChartBar, count: 0 },
    {
      id: "messages",
      label: "Messages",
      icon: HiChat,
      count: messagesCount,
      countColor: "bg-blue-600",
    },
    {
      id: "contacts",
      label: "Contacts",
      icon: HiMail,
      count: contactsCount,
      countColor: "bg-green-600",
    },
    {
      id: "projects",
      label: "Projects",
      icon: HiCollection,
      count: projectsCount,
      countColor: "bg-purple-600",
    },
    {
      id: "blog",
      label: "Blog",
      icon: HiBookOpen,
      count: blogPostsCount,
      countColor: "bg-orange-600",
    },
    { id: "settings", label: "Settings", icon: HiCog, count: 0 },
  ];

  return (
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
                <h1 className="font-heading font-bold text-gray-900">Admin</h1>
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
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === item.id
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
              {item.count > 0 && (
                <span
                  className={`ml-auto px-2 py-0.5 text-xs ${item.countColor} text-white rounded-full`}
                >
                  {item.count}
                </span>
              )}
            </button>
          ))}
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
            onClick={onSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <HiLogout size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
