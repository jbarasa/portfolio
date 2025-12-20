import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

// GET - Get messages (optionally by chat ID)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const chatId = searchParams.get("chatId");

    const supabase = await createServerClient();

    let query = supabase
      .from("chat_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (chatId) {
      query = query.eq("chat_id", chatId);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ messages: [] });
    }

    return NextResponse.json({ messages: data || [] });
  } catch {
    return NextResponse.json({ messages: [] });
  }
}

// POST - Save a new message
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { chatId, sender, content, email, phone } = body;

    if (!chatId || !sender || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = await createServerClient();

    // Check if session exists, create if not (for visitor messages)
    if (sender === "visitor") {
      const { data: existingSession } = await supabase
        .from("chat_sessions")
        .select("id")
        .eq("chat_id", chatId)
        .single();

      if (!existingSession) {
        // Create session automatically
        await supabase.from("chat_sessions").insert({
          chat_id: chatId,
          email: email || null,
          phone: phone || null,
        });
      } else {
        // Update last_message_at
        await supabase
          .from("chat_sessions")
          .update({ last_message_at: new Date().toISOString() })
          .eq("chat_id", chatId);
      }
    } else {
      // For admin messages, just update last_message_at
      await supabase
        .from("chat_sessions")
        .update({ last_message_at: new Date().toISOString() })
        .eq("chat_id", chatId);
    }

    const { error } = await supabase.from("chat_messages").insert({
      chat_id: chatId,
      sender,
      content,
    });

    if (error) {
      return NextResponse.json(
        { error: "Failed to save message" },
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
