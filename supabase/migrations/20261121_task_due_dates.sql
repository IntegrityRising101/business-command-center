-- Run once in the Supabase SQL Editor for the Business Command Center project.
-- Adds optional due dates to existing tasks; safe to run more than once.
alter table public.tasks
  add column if not exists due_date date;
