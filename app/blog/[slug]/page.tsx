import { notFound } from "next/navigation";
import { Footer } from "@/components/layout";
import { createServerClient } from "@/lib/supabase";
import Link from "next/link";
import { HiArrowLeft, HiCalendar } from "react-icons/hi";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createServerClient();

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !post) {
    notFound();
  }

  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <article className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-linear-to-br from-blue-50 to-purple-50 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Link
              href="/#blog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8"
            >
              <HiArrowLeft size={18} />
              Back to Blog
            </Link>

            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <HiCalendar size={16} />
              <span>{formattedDate}</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-gray-600 leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </div>
        </div>

        {/* Cover Image */}
        {post.cover_image && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl -mt-6">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-64 sm:h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>
        )}

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12">
          <div
            className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
            dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
          />
        </div>

        {/* Back Link */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl pb-12">
          <div className="border-t border-gray-200 pt-8">
            <Link
              href="/#blog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <HiArrowLeft size={18} />
              Back to all posts
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}

// Simple markdown-like content formatter
function formatContent(content: string): string {
  return (
    content
      // Headers
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      // Bold
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      // Code blocks
      .replace(/```(\w+)?\n([\s\S]*?)```/gim, "<pre><code>$2</code></pre>")
      // Inline code
      .replace(/`(.*?)`/gim, "<code>$1</code>")
      // Links
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/gim,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
      )
      // Line breaks
      .replace(/\n\n/gim, "</p><p>")
      .replace(/\n/gim, "<br />")
      // Wrap in paragraphs
      .replace(/^(.+)$/gim, "<p>$1</p>")
      // Clean up empty paragraphs
      .replace(/<p><\/p>/gim, "")
      .replace(/<p><h/gim, "<h")
      .replace(/<\/h(\d)><\/p>/gim, "</h$1>")
      .replace(/<p><pre>/gim, "<pre>")
      .replace(/<\/pre><\/p>/gim, "</pre>")
  );
}
