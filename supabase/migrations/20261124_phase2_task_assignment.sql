-- Phase 2: assign tasks to a named helper and flag owner approval requirements.
-- Existing tasks table RLS policies continue to restrict rows to the signed-in owner.
alter table public.tasks
  add column if not exists assigned_to text;

alter table public.tasks
  add column if not exists approval_required boolean not null default false;

comment on column public.tasks.assigned_to is 'Named helper role responsible for the task; informational assignment only.';
comment on column public.tasks.approval_required is 'True when the owner must approve before execution; this flag does not grant execution authority.';
