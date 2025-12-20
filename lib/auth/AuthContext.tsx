"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export interface User {
  id: string;
  email: string;
  phone?: string;
  full_name?: string;
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signUp: (
    email: string,
    password: string,
    fullName?: string,
    phone?: string
  ) => Promise<{ error: string | null }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  // Fetch user profile from users table
  const fetchUserProfile = useCallback(
    async (supabaseUser: SupabaseUser): Promise<User | null> => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", supabaseUser.id)
          .single();

        if (error) {
          // Return basic user info if profile not found
          return {
            id: supabaseUser.id,
            email: supabaseUser.email || "",
            created_at: supabaseUser.created_at || new Date().toISOString(),
          };
        }

        return data;
      } catch {
        return null;
      }
    },
    [supabase]
  );

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          const profile = await fetchUserProfile(session.user);
          setUser(profile);
        }
      } catch {
        // Silently fail
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        const profile = await fetchUserProfile(session.user);
        setUser(profile);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      } else if (event === "TOKEN_REFRESHED" && session?.user) {
        // Session was refreshed, update user if needed
        const profile = await fetchUserProfile(session.user);
        setUser(profile);
      } else if (event === "USER_UPDATED" && session?.user) {
        const profile = await fetchUserProfile(session.user);
        setUser(profile);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, fetchUserProfile]);

  const signUp = useCallback(
    async (
      email: string,
      password: string,
      fullName?: string,
      phone?: string
    ): Promise<{ error: string | null }> => {
      try {
        // Sign up with Supabase Auth
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              phone: phone,
            },
          },
        });

        if (error) {
          return { error: error.message };
        }

        if (data.user) {
          // Create user profile in users table
          const { error: profileError } = await supabase.from("users").insert({
            id: data.user.id,
            email: email,
            full_name: fullName || null,
            phone: phone || null,
          });

          // Profile creation errors are non-fatal
          void profileError;
        }

        return { error: null };
      } catch {
        return { error: "An unexpected error occurred" };
      }
    },
    [supabase]
  );

  const signIn = useCallback(
    async (
      email: string,
      password: string
    ): Promise<{ error: string | null }> => {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          return { error: error.message };
        }

        return { error: null };
      } catch {
        return { error: "An unexpected error occurred" };
      }
    },
    [supabase]
  );

  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      // Redirect to home page after sign out
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    } catch {
      // Silently fail
    }
  }, [supabase]);

  const refreshUser = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.user) {
      const profile = await fetchUserProfile(session.user);
      setUser(profile);
    }
  }, [supabase, fetchUserProfile]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signUp,
        signIn,
        signOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
