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

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
    id BIGSERIAL PRIMARY KEY,
    session_id TEXT NOT NULL,
    sender TEXT NOT NULL CHECK (
        sender IN ('visitor', 'admin')
    ),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages (session_id);

CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_settings_key ON settings (key);

-- Insert default admin_online setting
INSERT INTO
    settings (key, value)
VALUES ('admin_online', 'false') ON CONFLICT (key) DO NOTHING;

-- =============================================
-- Row Level Security (RLS) Policies
-- =============================================

-- Enable RLS
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

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

-- Chat messages policies: Anyone can read and insert
CREATE POLICY "Public read access to chat_messages" ON chat_messages FOR
SELECT TO public USING (true);

CREATE POLICY "Public insert access to chat_messages" ON chat_messages FOR
INSERT
    TO public
WITH
    CHECK (true);

-- =============================================
-- Enable Realtime for tables
-- =============================================
ALTER PUBLICATION supabase_realtime ADD TABLE settings;

ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;

-- =============================================
-- Done! Your database is ready.
-- =============================================