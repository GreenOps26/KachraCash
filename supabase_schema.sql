-- Enable PostGIS for location features
create extension if not exists postgis;

-- 1. Profiles Table (extends auth.users)
create type user_role as enum ('user', 'recycler');

create table public.profiles (
  id uuid not null references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  role user_role default 'user',
  credits_balance int default 0,
  created_at timestamptz default now()
);

-- 2. Listings Table
create type listing_status as enum ('OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

create table public.listings (
  id uuid default gen_random_uuid() primary key,
  creator_id uuid references public.profiles(id) not null,
  image_url text not null,
  ai_label jsonb, -- Stores Roboflow data
  description text,
  est_weight float,
  address_text text,
  location geography(POINT), -- PostGIS Point
  status listing_status default 'OPEN',
  created_at timestamptz default now()
);

-- 3. Bids Table
create type bid_status as enum ('PENDING', 'ACCEPTED', 'REJECTED');

create table public.bids (
  id uuid default gen_random_uuid() primary key,
  listing_id uuid references public.listings(id) not null,
  recycler_id uuid references public.profiles(id) not null,
  amount decimal(10,2) not null,
  status bid_status default 'PENDING',
  created_at timestamptz default now()
);

-- 4. Transactions Table
create table public.transactions (
  id uuid default gen_random_uuid() primary key,
  listing_id uuid references public.listings(id) not null,
  recycler_id uuid references public.profiles(id) not null,
  user_id uuid references public.profiles(id) not null,
  final_amount decimal(10,2),
  final_weight float,
  user_confirmed boolean default false,
  recycler_confirmed boolean default false,
  started_at timestamptz default now(),
  completed_at timestamptz
);

-- 5. RLS Policies (Basic Draft)
alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.bids enable row level security;
alter table public.transactions enable row level security;

-- Profiles: Public Read, Self Write
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- Listings: Public Read, Creator Write
create policy "Listings are viewable by everyone." on listings for select using (true);
create policy "Users can create listings." on listings for insert with check (auth.uid() = creator_id);
create policy "Creator can update listing." on listings for update using (auth.uid() = creator_id);

-- Bids: Visible to Creator and Bidder
create policy "Bids viewable by creator or bidder." on bids for select using (
  auth.uid() = recycler_id or
  auth.uid() in (select creator_id from listings where id = listing_id)
);
create policy "Recyclers can create bids." on bids for insert with check (auth.uid() = recycler_id);

-- Transactions: Visible to Participants
create policy "Transactions viewable by participants." on transactions for select using (
  auth.uid() = recycler_id or auth.uid() = user_id
);
