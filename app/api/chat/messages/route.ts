import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

// GET - Get messages (optionally by session)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    const supabase = await createServerClient();

    let query = supabase
      .from("chat_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (sessionId) {
      query = query.eq("session_id", sessionId);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ messages: [] });
    }

    return NextResponse.json({ messages: data || [] });
  } catch (error) {
    console.error("Error getting messages:", error);
    return NextResponse.json({ messages: [] });
  }
}

// POST - Save a new message
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, sender, content } = body;

    if (!sessionId || !sender || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = await createServerClient();
    const { error } = await supabase.from("chat_messages").insert({
      session_id: sessionId,
      sender,
      content,
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save message" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
