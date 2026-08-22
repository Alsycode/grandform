-- Grand Form Restaurant — initial schema
-- Run once via scripts/migrate.mjs (or paste into the Supabase SQL editor).
-- Idempotent: safe to re-run.

create extension if not exists pgcrypto;

-- ── menu_items ──────────────────────────────────────────────
create table if not exists menu_items (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('Starters', 'Main Course', 'Beverages', 'Desserts')),
  name text not null,
  description text not null default '',
  price numeric(10, 2) not null,
  image_url text,
  status text not null default 'Active' check (status in ('Active', 'Hidden')),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── gallery_images ──────────────────────────────────────────
create table if not exists gallery_images (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  category text not null default 'Ambience' check (category in ('Ambience', 'Food', 'Beverage', 'Events', 'Others')),
  caption text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ── specials ────────────────────────────────────────────────
create table if not exists specials (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  image_url text,
  active boolean not null default true,
  starts_at date,
  ends_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── testimonials ────────────────────────────────────────────
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  rating smallint not null default 5 check (rating between 1 and 5),
  approved boolean not null default false,
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table testimonials add column if not exists avatar_url text;

-- ── reservations ────────────────────────────────────────────
create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  reservation_date date not null,
  reservation_time time not null,
  people int not null default 2,
  status text not null default 'Pending' check (status in ('Pending', 'Confirmed', 'Cancelled')),
  notes text,
  created_at timestamptz not null default now()
);

-- ── site_content (singleton row: About/Location/Contact/General settings) ──
create table if not exists site_content (
  id int primary key default 1 check (id = 1),
  about_text text not null default '',
  hours text not null default 'Open 12:00 PM – 12:00 AM',
  phone_1 text not null default '',
  phone_2 text not null default '',
  email text not null default '',
  website text not null default '',
  address_line_1 text not null default '',
  address_line_2 text not null default '',
  map_query text not null default '',
  instagram_url text,
  facebook_url text,
  whatsapp_number text,
  updated_at timestamptz not null default now()
);

insert into site_content (id) values (1) on conflict (id) do nothing;

-- ── admin_profiles (maps a Supabase Auth user to an admin identity) ────────
create table if not exists admin_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

-- ── updated_at triggers ─────────────────────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_menu_items_updated_at on menu_items;
create trigger trg_menu_items_updated_at before update on menu_items
  for each row execute function set_updated_at();

drop trigger if exists trg_specials_updated_at on specials;
create trigger trg_specials_updated_at before update on specials
  for each row execute function set_updated_at();

drop trigger if exists trg_site_content_updated_at on site_content;
create trigger trg_site_content_updated_at before update on site_content
  for each row execute function set_updated_at();

-- ── Row Level Security ──────────────────────────────────────
alter table menu_items enable row level security;
alter table gallery_images enable row level security;
alter table specials enable row level security;
alter table testimonials enable row level security;
alter table reservations enable row level security;
alter table site_content enable row level security;
alter table admin_profiles enable row level security;

-- Public (anon) can read only the "live" rows
drop policy if exists "public read active menu_items" on menu_items;
create policy "public read active menu_items" on menu_items
  for select to anon using (status = 'Active');

drop policy if exists "public read gallery_images" on gallery_images;
create policy "public read gallery_images" on gallery_images
  for select to anon using (true);

drop policy if exists "public read active specials" on specials;
create policy "public read active specials" on specials
  for select to anon using (active = true);

drop policy if exists "public read approved testimonials" on testimonials;
create policy "public read approved testimonials" on testimonials
  for select to anon using (approved = true);

drop policy if exists "public read site_content" on site_content;
create policy "public read site_content" on site_content
  for select to anon using (true);

-- Public (anon) can submit a reservation request, but never read/edit/delete any
drop policy if exists "public insert reservations" on reservations;
create policy "public insert reservations" on reservations
  for insert to anon with check (true);

-- Authenticated (the admin, logged in via Supabase Auth) has full access to everything
drop policy if exists "admin full access menu_items" on menu_items;
create policy "admin full access menu_items" on menu_items
  for all to authenticated using (true) with check (true);

drop policy if exists "admin full access gallery_images" on gallery_images;
create policy "admin full access gallery_images" on gallery_images
  for all to authenticated using (true) with check (true);

drop policy if exists "admin full access specials" on specials;
create policy "admin full access specials" on specials
  for all to authenticated using (true) with check (true);

drop policy if exists "admin full access testimonials" on testimonials;
create policy "admin full access testimonials" on testimonials
  for all to authenticated using (true) with check (true);

drop policy if exists "admin full access reservations" on reservations;
create policy "admin full access reservations" on reservations
  for all to authenticated using (true) with check (true);

drop policy if exists "admin full access site_content" on site_content;
create policy "admin full access site_content" on site_content
  for all to authenticated using (true) with check (true);

drop policy if exists "admin read own profile" on admin_profiles;
create policy "admin read own profile" on admin_profiles
  for select to authenticated using (true);

-- ── Storage bucket for admin-uploaded images (menu/gallery photos) ─────────
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

drop policy if exists "public read site-images" on storage.objects;
create policy "public read site-images" on storage.objects
  for select to public using (bucket_id = 'site-images');

drop policy if exists "admin write site-images" on storage.objects;
create policy "admin write site-images" on storage.objects
  for all to authenticated using (bucket_id = 'site-images') with check (bucket_id = 'site-images');
