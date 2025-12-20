import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { isAdmin } from "@/lib/constants";

// GET - Get all projects
export async function GET() {
  try {
    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ projects: [] });
    }

    return NextResponse.json({ projects: data || [] });
  } catch {
    return NextResponse.json({ projects: [] });
  }
}

// POST - Create or update a project
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
    const { id, title, description, url, image_url, tech_stack, show_tech } =
      body;

    if (!title || !description || !url) {
      return NextResponse.json(
        { error: "Title, description, and URL are required" },
        { status: 400 }
      );
    }

    if (id) {
      // Update existing project
      const { data, error } = await supabase
        .from("projects")
        .update({
          title,
          description,
          url,
          image_url: image_url || null,
          tech_stack: tech_stack || [],
          show_tech: show_tech ?? true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return NextResponse.json(
          { error: "Failed to update project" },
          { status: 500 }
        );
      }

      return NextResponse.json({ project: data, success: true });
    } else {
      // Create new project
      const { data, error } = await supabase
        .from("projects")
        .insert({
          title,
          description,
          url,
          image_url: image_url || null,
          tech_stack: tech_stack || [],
          show_tech: show_tech ?? true,
        })
        .select()
        .single();

      if (error) {
        return NextResponse.json(
          { error: "Failed to create project" },
          { status: 500 }
        );
      }

      return NextResponse.json({ project: data, success: true });
    }
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a project
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
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", parseInt(id));

    if (error) {
      return NextResponse.json(
        { error: "Failed to delete project" },
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
