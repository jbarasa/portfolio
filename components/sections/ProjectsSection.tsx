"use client";

import React, { useEffect, useState } from "react";
import { HiExternalLink, HiCode } from "react-icons/hi";

interface Project {
  id: number;
  title: string;
  description: string;
  url: string;
  image_url?: string;
  tech_stack: string[];
  show_tech: boolean;
}

// Link Preview Card with hover effect
const ProjectCard = ({ project }: { project: Project }) => {
  const [imageError, setImageError] = useState(false);
  const displayUrl = project.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Preview Image */}
      <div className="relative h-48 bg-linear-to-br from-blue-50 to-purple-50 overflow-hidden">
        {project.image_url && !imageError ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/50 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <HiCode className="text-blue-500" size={32} />
              </div>
              <p className="text-gray-500 text-sm font-medium">{displayUrl}</p>
            </div>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900">
              Visit Site
            </span>
            <HiExternalLink size={16} className="text-blue-600" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-heading text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <HiExternalLink
            size={20}
            className="text-gray-400 group-hover:text-blue-600 shrink-0 transition-colors"
          />
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        {project.show_tech && project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.slice(0, 5).map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.tech_stack.length > 5 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                +{project.tech_stack.length - 5}
              </span>
            )}
          </div>
        )}

        {/* URL Badge */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-400">{displayUrl}</span>
        </div>
      </div>
    </a>
  );
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data.projects || []);
      } catch {
        // Silently fail
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // Don't render if no projects
  if (!isLoading && projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            <HiCode size={16} />
            My Work
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Here are some of the projects I&apos;ve built. Click on any project
            to explore it live.
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-100" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-100 rounded w-3/4" />
                  <div className="h-4 bg-gray-100 rounded w-full" />
                  <div className="h-4 bg-gray-100 rounded w-2/3" />
                  <div className="flex gap-2 pt-2">
                    <div className="h-6 bg-gray-100 rounded-full w-16" />
                    <div className="h-6 bg-gray-100 rounded-full w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
