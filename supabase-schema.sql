-- ============================================================
-- Tomato Food Ordering App — Supabase Database Schema
-- Run this script once in the Supabase SQL editor to set up
-- all required tables and row-level security policies.
-- ============================================================

-- Enable the uuid extension (already on by default in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------
-- 1. User profiles (extends Supabase Auth)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name   TEXT,
  phone       TEXT,
  address     TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read/update only their own profile
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Auto-create a profile row whenever a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ------------------------------------------------------------
-- 2. Orders
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          UUID REFERENCES auth.users ON DELETE SET NULL,
  items            JSONB        NOT NULL,  -- snapshot of cart items
  subtotal         NUMERIC(10,2) NOT NULL,
  tax              NUMERIC(10,2) NOT NULL DEFAULT 0,
  delivery_fee     NUMERIC(10,2) NOT NULL DEFAULT 0,
  total            NUMERIC(10,2) NOT NULL,
  delivery_name    TEXT,
  delivery_phone   TEXT,
  delivery_address TEXT,
  status           TEXT         NOT NULL DEFAULT 'confirmed',
  created_at       TIMESTAMPTZ  DEFAULT NOW()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Authenticated users can insert their own orders
CREATE POLICY "orders_insert_own" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can read their own orders
CREATE POLICY "orders_select_own" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- ------------------------------------------------------------
-- 3. Table reservations
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reservations (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          UUID REFERENCES auth.users ON DELETE SET NULL,
  reservation_date DATE        NOT NULL,
  reservation_time TIME        NOT NULL,
  num_people       INTEGER     NOT NULL CHECK (num_people >= 1),
  special_request  TEXT,
  status           TEXT        NOT NULL DEFAULT 'pending',
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "reservations_insert_own" ON reservations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "reservations_select_own" ON reservations
  FOR SELECT USING (auth.uid() = user_id);
