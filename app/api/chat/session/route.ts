import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

// POST - Create a new chat session
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { chatId, email, phone } = body;

    if (!chatId) {
      return NextResponse.json(
        { error: "Chat ID is required" },
        { status: 400 }
      );
    }

    if (!email && !phone) {
      return NextResponse.json(
        { error: "Email or phone number is required" },
        { status: 400 }
      );
    }

    const supabase = await createServerClient();

    // Check if session already exists
    const { data: existing } = await supabase
      .from("chat_sessions")
      .select("id")
      .eq("chat_id", chatId)
      .single();

    if (existing) {
      // Update existing session with new contact info
      const { error } = await supabase
        .from("chat_sessions")
        .update({
          email: email || undefined,
          phone: phone || undefined,
        })
        .eq("chat_id", chatId);

      if (error) {
        console.error("Supabase error:", error);
        return NextResponse.json(
          { error: "Failed to update session" },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, updated: true });
    }

    // Create new session
    const { error } = await supabase.from("chat_sessions").insert({
      chat_id: chatId,
      email: email || null,
      phone: phone || null,
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to create session" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, created: true });
  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET - Get chat session info (single session by chatId or all sessions)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const chatId = searchParams.get("chatId");

    const supabase = await createServerClient();

    // If chatId is provided, fetch single session
    if (chatId) {
      const { data, error } = await supabase
        .from("chat_sessions")
        .select("*")
        .eq("chat_id", chatId)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          return NextResponse.json({ session: null });
        }
        console.error("Supabase error:", error);
        return NextResponse.json({ session: null });
      }

      return NextResponse.json({ session: data });
    }

    // Fetch all sessions (for admin dashboard)
    const { data, error } = await supabase
      .from("chat_sessions")
      .select("*")
      .order("last_message_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ sessions: [] });
    }

    return NextResponse.json({ sessions: data || [] });
  } catch (error) {
    console.error("Error getting session:", error);
    return NextResponse.json({ sessions: [] });
  }
}
