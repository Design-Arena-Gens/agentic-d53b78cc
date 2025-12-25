-- AMZ-Resurrect AI Database Schema for Supabase (PostgreSQL)

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table: Stores user information and subscription status
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    subscription_status VARCHAR(50) DEFAULT 'trial' CHECK (subscription_status IN ('trial', 'pro', 'cancelled')),
    trial_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Appeals table: Stores all POA generation requests and results
CREATE TABLE IF NOT EXISTS appeals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    seller_name VARCHAR(255) NOT NULL,
    asin VARCHAR(50) NOT NULL,
    violation_type VARCHAR(100) NOT NULL,
    root_cause_input TEXT NOT NULL,
    generated_poa TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'generated', 'submitted', 'approved', 'rejected')),
    marketplace VARCHAR(10) DEFAULT 'SA' CHECK (marketplace IN ('SA', 'AE')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_appeals_user_id ON appeals(user_id);
CREATE INDEX IF NOT EXISTS idx_appeals_status ON appeals(status);
CREATE INDEX IF NOT EXISTS idx_appeals_created_at ON appeals(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to profiles table
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Apply updated_at trigger to appeals table
CREATE TRIGGER update_appeals_updated_at BEFORE UPDATE ON appeals
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE appeals ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only read/update their own profile
CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Appeals: Users can only access their own appeals
CREATE POLICY "Users can view own appeals"
    ON appeals FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own appeals"
    ON appeals FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own appeals"
    ON appeals FOR UPDATE
    USING (auth.uid() = user_id);

-- Sample data for testing (optional - remove in production)
-- INSERT INTO profiles (id, email, full_name, subscription_status)
-- VALUES
--     ('11111111-1111-1111-1111-111111111111', 'test@example.com', 'Test User', 'trial');
