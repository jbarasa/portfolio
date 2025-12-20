"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { HiCalendar, HiArrowRight, HiBookOpen } from "react-icons/hi";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  cover_image?: string;
  published: boolean;
  created_at: string;
}

const BlogCard = ({ post }: { post: BlogPost }) => {
  const [imageError, setImageError] = useState(false);
  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Get excerpt from content if not provided
  const displayExcerpt = post.excerpt || post.content.slice(0, 150) + "...";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
        {post.cover_image && !imageError ? (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/50 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <HiBookOpen className="text-blue-500" size={32} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <HiCalendar size={16} />
          <span>{formattedDate}</span>
        </div>

        <h3 className="font-heading text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {displayExcerpt}
        </p>

        <div className="flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all">
          <span>Read More</span>
          <HiArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
};

export function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        setPosts(data.posts || []);
      } catch {
        // Silently fail
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <section id="blog" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tech Blog
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Thoughts, tutorials, and insights from my journey in tech
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null; // Don't show section if no posts
  }

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            Tech Blog
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Latest Articles
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sharing my thoughts, tutorials, and insights from the world of
            software development
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 6).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {posts.length > 6 && (
          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              View All Posts
              <HiArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
