"use client";

import React from "react";
import { HiMail, HiReply, HiRefresh } from "react-icons/hi";
import { ContactSubmission } from "./types";

interface ContactsTabProps {
  contactSubmissions: ContactSubmission[];
  fetchContactSubmissions: () => void;
}

export default function ContactsTab({
  contactSubmissions,
  fetchContactSubmissions,
}: ContactsTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-semibold text-gray-900">
          Contact Form Submissions
        </h3>
        <button
          onClick={fetchContactSubmissions}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
        >
          <HiRefresh size={18} />
          Refresh
        </button>
      </div>

      {contactSubmissions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <HiMail className="text-gray-400" size={36} />
          </div>
          <p className="text-gray-600 mb-2">No contact submissions yet</p>
          <p className="text-sm text-gray-400">
            When visitors submit the contact form, their messages will appear
            here
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {contactSubmissions.map((submission) => (
            <div
              key={submission.id}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <span className="text-green-600 font-bold">
                      {submission.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {submission.name}
                    </h4>
                    <a
                      href={`mailto:${submission.email}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {submission.email}
                    </a>
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(submission.created_at).toLocaleDateString([], {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  {new Date(submission.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-xl">
                {submission.message}
              </p>
              <div className="mt-4 flex gap-2">
                <a
                  href={`mailto:${submission.email}?subject=Re: Your message on jbarasa.com`}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm"
                >
                  <HiReply size={16} />
                  Reply via Email
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
