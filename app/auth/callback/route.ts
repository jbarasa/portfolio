import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const next = searchParams.get("next") ?? "/";
  const type = searchParams.get("type");

  const supabase = await createServerClient();

  // Handle token_hash based verification (email confirmation, password reset)
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as "signup" | "recovery" | "email",
    });

    if (!error) {
      // Password reset - redirect to reset password page
      if (type === "recovery") {
        return NextResponse.redirect(`${origin}/auth/reset-password`);
      }
      // Email confirmation - redirect to verified page
      if (type === "signup" || type === "email") {
        return NextResponse.redirect(`${origin}/auth/verified?success=true`);
      }
      return NextResponse.redirect(`${origin}${next}`);
    }

    return NextResponse.redirect(`${origin}/auth/verified?error=true`);
  }

  // Handle code based verification (OAuth, magic link)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      if (type === "signup" || type === "email") {
        return NextResponse.redirect(`${origin}/auth/verified?success=true`);
      }
      if (type === "recovery") {
        return NextResponse.redirect(`${origin}/auth/reset-password`);
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return to error page if verification failed
  return NextResponse.redirect(`${origin}/auth/verified?error=true`);
}
