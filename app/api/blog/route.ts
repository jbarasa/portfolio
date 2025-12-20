import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { isAdmin } from "@/lib/constants";

// GET - Get all blog posts (published only for public, all for admin)
export async function GET(request: Request) {
  try {
    const supabase = await createServerClient();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const all = searchParams.get("all");

    // Check if user is admin for fetching all posts
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userIsAdmin = user && isAdmin(user.email);

    if (slug) {
      // Get single post by slug
      let query = supabase.from("blog_posts").select("*").eq("slug", slug);

      // Only allow unpublished posts for admin
      if (!userIsAdmin) {
        query = query.eq("published", true);
      }

      const { data, error } = await query.single();

      if (error) {
        return NextResponse.json({ post: null });
      }

      return NextResponse.json({ post: data });
    }

    // Get all posts
    let query = supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    // Only show published posts to non-admins
    if (!userIsAdmin || all !== "true") {
      query = query.eq("published", true);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ posts: [] });
    }

    return NextResponse.json({ posts: data || [] });
  } catch {
    return NextResponse.json({ posts: [] });
  }
}

// POST - Create or update a blog post (admin only)
export async function POST(request: Request) {
  try {
    const supabase = await createServerClient();

    // Check if user is authenticated and is admin
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !isAdmin(user.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, title, slug, excerpt, content, cover_image, published } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Generate slug from title if not provided
    const postSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    if (id) {
      // Update existing post
      const { data, error } = await supabase
        .from("blog_posts")
        .update({
          title,
          slug: postSlug,
          excerpt: excerpt || null,
          content,
          cover_image: cover_image || null,
          published: published ?? false,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return NextResponse.json(
          { error: "Failed to update post" },
          { status: 500 }
        );
      }

      return NextResponse.json({ post: data, success: true });
    } else {
      // Create new post
      const { data, error } = await supabase
        .from("blog_posts")
        .insert({
          title,
          slug: postSlug,
          excerpt: excerpt || null,
          content,
          cover_image: cover_image || null,
          published: published ?? false,
        })
        .select()
        .single();

      if (error) {
        if (error.code === "23505") {
          return NextResponse.json(
            { error: "A post with this slug already exists" },
            { status: 400 }
          );
        }
        return NextResponse.json(
          { error: "Failed to create post" },
          { status: 500 }
        );
      }

      return NextResponse.json({ post: data, success: true });
    }
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a blog post (admin only)
export async function DELETE(request: Request) {
  try {
    const supabase = await createServerClient();

    // Check if user is authenticated and is admin
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !isAdmin(user.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", parseInt(id));

    if (error) {
      return NextResponse.json(
        { error: "Failed to delete post" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
