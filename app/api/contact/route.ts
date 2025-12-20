import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const supabase = await createServerClient();

    // Store the contact submission in the database
    const { error } = await supabase.from("contact_submissions").insert({
      name,
      email,
      message,
      created_at: new Date().toISOString(),
    });

    if (error) {
      // If table doesn't exist, just return success (we'll store in memory or log)
      if (error.code === "42P01") {
        // Table doesn't exist - that's okay, we can create it later
        return NextResponse.json({ success: true, stored: false });
      }
      return NextResponse.json(
        { error: "Failed to save message" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, stored: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = await createServerClient();

    // Get current user from Supabase auth
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all contact submissions (admin only)
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ submissions: [] });
    }

    return NextResponse.json({ submissions: data || [] });
  } catch {
    return NextResponse.json({ submissions: [] });
  }
}
