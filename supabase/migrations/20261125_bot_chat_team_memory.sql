-- Individual bot conversations, team inbox, and owner-approved memory.
-- Every row is scoped to the signed-in owner. Apply in Supabase SQL Editor.
create table if not exists public.bot_conversations (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 bot_name text not null,
 title text not null default 'Bot conversation',
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create index if not exists bot_conversations_owner_updated_idx on public.bot_conversations(user_id, updated_at desc);

create table if not exists public.bot_messages (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 conversation_id uuid not null references public.bot_conversations(id) on delete cascade,
 sender_type text not null check (sender_type in ('owner','bot','system')),
 sender_name text not null,
 body text not null check (char_length(body) between 1 and 12000),
 created_at timestamptz not null default now()
);
create index if not exists bot_messages_thread_created_idx on public.bot_messages(user_id, conversation_id, created_at);

create table if not exists public.bot_memories (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 bot_name text not null,
 content text not null check (char_length(content) between 1 and 4000),
 status text not null default 'pending' check (status in ('pending','approved','rejected')),
 source_message_id uuid references public.bot_messages(id) on delete set null,
 created_at timestamptz not null default now(),
 approved_at timestamptz
);
create index if not exists bot_memories_owner_bot_status_idx on public.bot_memories(user_id, bot_name, status);

alter table public.bot_conversations enable row level security;
alter table public.bot_messages enable row level security;
alter table public.bot_memories enable row level security;

drop policy if exists "Owners manage their bot conversations" on public.bot_conversations;
create policy "Owners manage their bot conversations" on public.bot_conversations
 for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "Owners manage their bot messages" on public.bot_messages;
create policy "Owners manage their bot messages" on public.bot_messages
 for all to authenticated using ((select auth.uid()) = user_id) with check (
  (select auth.uid()) = user_id and exists (
   select 1 from public.bot_conversations c
   where c.id = conversation_id and c.user_id = (select auth.uid())
  )
);

drop policy if exists "Owners manage their bot memories" on public.bot_memories;
create policy "Owners manage their bot memories" on public.bot_memories
 for all to authenticated using ((select auth.uid()) = user_id) with check (
  (select auth.uid()) = user_id and (source_message_id is null or exists (
   select 1 from public.bot_messages m where m.id = source_message_id and m.user_id = (select auth.uid())
  ))
);

grant select, insert, update, delete on public.bot_conversations to authenticated;
grant select, insert, update, delete on public.bot_messages to authenticated;
grant select, insert, update, delete on public.bot_memories to authenticated;
