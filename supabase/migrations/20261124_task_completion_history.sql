-- Persist the exact moment a task first enters the Done state.
-- Existing completed tasks remain NULL because their true completion date is unknown.
alter table public.tasks
  add column if not exists completed_at timestamptz;

create index if not exists tasks_user_completed_at_idx
  on public.tasks (user_id, completed_at desc)
  where completed_at is not null;
