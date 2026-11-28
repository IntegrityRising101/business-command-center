-- Writing Studio / Planner cloud workspace storage.
-- Per-user rows enforced by RLS. No service-role client access is needed.
create table if not exists public.writing_planner_items (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  item_type text not null check (item_type in ('draft','planner_event')),
  item_data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.writing_planner_items enable row level security;
create policy "Users manage their own writing planner items"
  on public.writing_planner_items
  for all
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create index if not exists writing_planner_items_owner_type_updated
  on public.writing_planner_items (user_id, item_type, updated_at desc);
