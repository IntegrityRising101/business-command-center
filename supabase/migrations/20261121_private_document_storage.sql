-- Private Document & Media Center storage
-- Each authenticated user can access files only inside their own UUID folder.
insert into storage.buckets (id, name, public, file_size_limit)
values ('private-documents', 'private-documents', false, 262144000)
on conflict (id) do update set public = false, file_size_limit = 262144000;

drop policy if exists "Users can view their own private documents" on storage.objects;
create policy "Users can view their own private documents"
on storage.objects for select to authenticated
using (
  bucket_id = 'private-documents'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users can upload their own private documents" on storage.objects;
create policy "Users can upload their own private documents"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'private-documents'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users can update their own private documents" on storage.objects;
create policy "Users can update their own private documents"
on storage.objects for update to authenticated
using (
  bucket_id = 'private-documents'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'private-documents'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users can delete their own private documents" on storage.objects;
create policy "Users can delete their own private documents"
on storage.objects for delete to authenticated
using (
  bucket_id = 'private-documents'
  and (storage.foldername(name))[1] = auth.uid()::text
);
