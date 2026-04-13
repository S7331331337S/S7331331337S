-- Create profiles table for Sprout plant community app
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  bio text,
  location text,
  avatar_url text,
  plants_shared integer default 0,
  rating numeric(2,1) default 5.0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- RLS Policies
-- Everyone can view profiles (needed for marketplace)
create policy "profiles_select_all" on public.profiles 
  for select using (true);

-- Users can insert their own profile
create policy "profiles_insert_own" on public.profiles 
  for insert with check (auth.uid() = id);

-- Users can update their own profile
create policy "profiles_update_own" on public.profiles 
  for update using (auth.uid() = id);

-- Users can delete their own profile
create policy "profiles_delete_own" on public.profiles 
  for delete using (auth.uid() = id);

-- Create badges table
create table if not exists public.badges (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  icon text
);

-- Insert default badges
insert into public.badges (name, description, icon) values
  ('Green Thumb', 'Successfully shared 5+ plants', 'sprout'),
  ('Community Helper', 'Helped 10+ gardeners', 'heart'),
  ('Seed Saver', 'Shared 20+ seed varieties', 'leaf'),
  ('Local Legend', 'Top contributor in your area', 'star'),
  ('Propagation Pro', 'Shared 50+ cuttings', 'scissors')
on conflict (name) do nothing;

-- Create user_badges junction table
create table if not exists public.user_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  badge_id uuid references public.badges(id) on delete cascade,
  earned_at timestamp with time zone default now(),
  unique(user_id, badge_id)
);

alter table public.user_badges enable row level security;

-- Everyone can view user badges
create policy "user_badges_select_all" on public.user_badges
  for select using (true);

-- Only system can insert badges (handled server-side)
create policy "user_badges_insert_system" on public.user_badges
  for insert with check (auth.uid() = user_id);
