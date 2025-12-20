import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { createServerClient } from "@/lib/supabase";
import { isAdmin } from "@/lib/constants";

// GET - Check if admin is online (public)
export async function GET() {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "admin_online")
      .single();

    if (error || !data) {
      return NextResponse.json({ isOnline: false });
    }

    return NextResponse.json({ isOnline: data.value === "true" });
  } catch (error) {
    console.error("Error getting admin status:", error);
    return NextResponse.json({ isOnline: false });
  }
}

// POST - Toggle admin online status (admin only)
export async function POST(request: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = user.emailAddresses[0]?.emailAddress;

    if (!isAdmin(userEmail)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { isOnline } = body;

    const supabase = await createServerClient();
    const { error } = await supabase.from("settings").upsert(
      {
        key: "admin_online",
        value: isOnline ? "true" : "false",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "key" }
    );

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to update status" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, isOnline });
  } catch (error) {
    console.error("Error updating admin status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
