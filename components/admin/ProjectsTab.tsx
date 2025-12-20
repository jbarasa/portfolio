"use client";

import React, { useState } from "react";
import {
  HiPlus,
  HiRefresh,
  HiPencil,
  HiTrash,
  HiExternalLink,
  HiEye,
  HiEyeOff,
  HiX,
  HiCollection,
} from "react-icons/hi";
import { Project } from "./types";

interface ProjectsTabProps {
  projects: Project[];
  fetchProjects: () => void;
  onSaveProject: (project: Partial<Project>) => Promise<void>;
  onDeleteProject: (id: number) => Promise<void>;
}

export default function ProjectsTab({
  projects,
  fetchProjects,
  onSaveProject,
  onDeleteProject,
}: ProjectsTabProps) {
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    image_url: "",
    tech_stack: "",
    show_tech: true,
  });
  const [isSaving, setIsSaving] = useState(false);

  const openModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        url: project.url,
        image_url: project.image_url || "",
        tech_stack: project.tech_stack.join(", "),
        show_tech: project.show_tech,
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        description: "",
        url: "",
        image_url: "",
        tech_stack: "",
        show_tech: true,
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const projectData: Partial<Project> = {
      ...(editingProject && { id: editingProject.id }),
      title: formData.title,
      description: formData.description,
      url: formData.url,
      image_url: formData.image_url || undefined,
      tech_stack: formData.tech_stack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      show_tech: formData.show_tech,
    };

    await onSaveProject(projectData);
    setIsSaving(false);
    closeModal();
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await onDeleteProject(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-semibold text-gray-900">
          Projects ({projects.length})
        </h3>
        <div className="flex gap-2">
          <button
            onClick={fetchProjects}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
          >
            <HiRefresh size={18} />
            Refresh
          </button>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <HiPlus size={18} />
            Add Project
          </button>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <HiCollection className="text-gray-400" size={36} />
          </div>
          <p className="text-gray-600 mb-2">No projects yet</p>
          <p className="text-sm text-gray-400 mb-4">
            Add your projects to showcase them on your portfolio
          </p>
          <button
            onClick={() => openModal()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <HiPlus size={18} />
            Add Your First Project
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Project Image */}
              {project.image_url && (
                <div className="h-40 bg-gray-100">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">
                      {project.title}
                    </h4>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                    >
                      {project.url.replace(/^https?:\/\//, "").slice(0, 30)}
                      <HiExternalLink size={14} />
                    </a>
                  </div>
                  <div className="flex items-center gap-1">
                    {project.show_tech ? (
                      <span className="text-xs text-green-600 flex items-center gap-1">
                        <HiEye size={14} />
                        Tech visible
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <HiEyeOff size={14} />
                        Tech hidden
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                {project.show_tech && project.tech_stack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech_stack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => openModal(project)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors text-sm"
                  >
                    <HiPencil size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors text-sm"
                  >
                    <HiTrash size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-heading text-lg font-semibold text-gray-900">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <HiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  placeholder="TalkSpinChat"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project URL *
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  required
                  placeholder="https://talkspinchat.com"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  rows={3}
                  placeholder="Brief description of the project..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL (optional)
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) =>
                    setFormData({ ...formData, image_url: e.target.value })
                  }
                  placeholder="https://example.com/screenshot.png"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tech_stack}
                  onChange={(e) =>
                    setFormData({ ...formData, tech_stack: e.target.value })
                  }
                  placeholder="Next.js, TypeScript, Supabase, Tailwind CSS"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">Show Tech Stack</p>
                  <p className="text-sm text-gray-500">
                    Display technologies used on the portfolio
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, show_tech: !formData.show_tech })
                  }
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                    formData.show_tech ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${
                      formData.show_tech ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSaving
                    ? "Saving..."
                    : editingProject
                    ? "Update"
                    : "Add Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
