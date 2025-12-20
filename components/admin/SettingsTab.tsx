"use client";

import React from "react";
import { HiTrash } from "react-icons/hi";

interface SettingsTabProps {
  isOnline: boolean;
  toggleOnlineStatus: () => void;
}

export default function SettingsTab({
  isOnline,
  toggleOnlineStatus,
}: SettingsTabProps) {
  return (
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
            Toggle your online status to show the chat widget to visitors
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
            You&apos;ll see a typing indicator when visitors are composing
            messages
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
  );
}
