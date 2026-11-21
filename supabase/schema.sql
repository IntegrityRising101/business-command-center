-- Business Command Center: private per-user workspace data
-- Run this script in Supabase SQL Editor for the Business Command Center project.

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  category text not null default 'Operations',
  status text not null default 'Planned'
    check (status in ('Planned', 'In Progress', 'Done')),
  priority text not null default 'medium'
    check (priority in ('high', 'medium', 'low')),
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.tasks add column if not exists due_date date;

create table if not exists public.daily_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  entry_date date not null default current_date,
  text text not null,
  created_at timestamptz not null default now()
);

create index if not exists tasks_user_id_idx on public.tasks(user_id);
create index if not exists daily_logs_user_id_idx on public.daily_logs(user_id);

alter table public.tasks enable row level security;
alter table public.daily_logs enable row level security;

drop policy if exists "Users can view their own tasks" on public.tasks;
create policy "Users can view their own tasks"
  on public.tasks for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert their own tasks" on public.tasks;
create policy "Users can insert their own tasks"
  on public.tasks for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own tasks" on public.tasks;
create policy "Users can update their own tasks"
  on public.tasks for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own tasks" on public.tasks;
create policy "Users can delete their own tasks"
  on public.tasks for delete to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can view their own daily logs" on public.daily_logs;
create policy "Users can view their own daily logs"
  on public.daily_logs for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert their own daily logs" on public.daily_logs;
create policy "Users can insert their own daily logs"
  on public.daily_logs for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own daily logs" on public.daily_logs;
create policy "Users can update their own daily logs"
  on public.daily_logs for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own daily logs" on public.daily_logs;
create policy "Users can delete their own daily logs"
  on public.daily_logs for delete to authenticated
  using ((select auth.uid()) = user_id);

grant select, insert, update, delete on public.tasks to authenticated;
grant select, insert, update, delete on public.daily_logs to authenticated;
