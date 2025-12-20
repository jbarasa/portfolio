-- =============================================
-- Supabase Database Schema for Jbarasa Portfolio
-- Run this in the Supabase SQL Editor
-- =============================================

-- Settings table for storing app configurations
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users table for authentication (linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat sessions table to store visitor contact info
CREATE TABLE IF NOT EXISTS chat_sessions (
    id BIGSERIAL PRIMARY KEY,
    chat_id TEXT UNIQUE NOT NULL,
    email TEXT,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_message_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
    id BIGSERIAL PRIMARY KEY,
    chat_id TEXT NOT NULL REFERENCES chat_sessions (chat_id) ON DELETE CASCADE,
    sender TEXT NOT NULL CHECK (
        sender IN ('visitor', 'admin')
    ),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);

CREATE INDEX IF NOT EXISTS idx_chat_sessions_chat_id ON chat_sessions (chat_id);

CREATE INDEX IF NOT EXISTS idx_chat_sessions_created_at ON chat_sessions (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_chat_messages_chat_id ON chat_messages (chat_id);

CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_settings_key ON settings (key);

-- Projects table for portfolio showcase
CREATE TABLE IF NOT EXISTS
    projects (
        id BIGSERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        url TEXT NOT NULL,
        image_url TEXT,
        tech_stack TEXT[] DEFAULT '{}',
        show_tech BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );

CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects (created_at DESC);

-- Insert default admin_online setting
INSERT INTO
    settings (key, value)
VALUES ('admin_online', 'false') ON CONFLICT (key) DO NOTHING;

-- =============================================
-- Row Level Security (RLS) Policies
-- =============================================

-- Enable RLS
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Settings policies: Anyone can read, anyone can update (app handles auth)
CREATE POLICY "Public read access to settings" ON settings FOR
SELECT TO public USING (true);

CREATE POLICY "Public update access to settings" ON settings FOR
UPDATE TO public USING (true);

CREATE POLICY "Public insert access to settings" ON settings FOR
INSERT
    TO public
WITH
    CHECK (true);

-- Users policies: Users can read/update their own profile, insert on signup
CREATE POLICY "Users can read own profile" ON users FOR
SELECT TO authenticated USING (auth.uid () = id);

CREATE POLICY "Users can update own profile" ON users FOR
UPDATE TO authenticated USING (auth.uid () = id);

CREATE POLICY "Users can insert own profile" ON users FOR
INSERT
    TO authenticated
WITH
    CHECK (auth.uid () = id);

-- Allow service role to manage all users (for admin operations)
CREATE POLICY "Service role can manage users" ON users FOR ALL TO service_role USING (true);

-- Chat sessions policies: Anyone can read and insert/update
CREATE POLICY "Public read access to chat_sessions" ON chat_sessions FOR
SELECT TO public USING (true);

CREATE POLICY "Public insert access to chat_sessions" ON chat_sessions FOR
INSERT
    TO public
WITH
    CHECK (true);

CREATE POLICY "Public update access to chat_sessions" ON chat_sessions FOR
UPDATE TO public USING (true);

-- Chat messages policies: Anyone can read and insert
CREATE POLICY "Public read access to chat_messages" ON chat_messages FOR
SELECT TO public USING (true);

CREATE POLICY "Public insert access to chat_messages" ON chat_messages FOR
INSERT
    TO public
WITH
    CHECK (true);

-- Projects policies: Anyone can read, only authenticated users can modify
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access to projects" ON projects FOR
SELECT TO public USING (true);

CREATE POLICY "Authenticated users can insert projects" ON projects FOR
INSERT
    TO authenticated
WITH
    CHECK (true);

CREATE POLICY "Authenticated users can update projects" ON projects FOR
UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete projects" ON projects FOR DELETE TO authenticated USING (true);

-- =============================================
-- Enable Realtime for tables
-- =============================================
ALTER PUBLICATION supabase_realtime ADD TABLE settings;

ALTER PUBLICATION supabase_realtime ADD TABLE chat_sessions;

ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;

-- =============================================
-- Function to handle new user signup
-- Automatically creates a user profile when someone signs up
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name, phone)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'phone'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- Contact Form Submissions Table
-- =============================================
CREATE TABLE IF NOT EXISTS contact_submissions (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for contact_submissions
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Contact submissions policies: Anyone can insert, only service role can read
CREATE POLICY "Public insert access to contact_submissions" ON contact_submissions FOR
INSERT
    TO public
WITH
    CHECK (true);

CREATE POLICY "Service role can read contact_submissions" ON contact_submissions FOR
SELECT TO service_role USING (true);

-- =============================================
-- Blog Posts Table
-- =============================================
CREATE TABLE IF NOT EXISTS blog_posts (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts (slug);

CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts (published);

CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts (created_at DESC);

-- Enable RLS for blog_posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Blog policies: Anyone can read published posts, only authenticated users can modify
CREATE POLICY "Public read access to published blog posts" ON blog_posts FOR
SELECT TO public USING (published = true);

CREATE POLICY "Authenticated users can read all blog posts" ON blog_posts FOR
SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert blog posts" ON blog_posts FOR
INSERT
    TO authenticated
WITH
    CHECK (true);

CREATE POLICY "Authenticated users can update blog posts" ON blog_posts FOR
UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete blog posts" ON blog_posts FOR DELETE TO authenticated USING (true);

-- =============================================
-- Done! Your database is ready.
-- =============================================