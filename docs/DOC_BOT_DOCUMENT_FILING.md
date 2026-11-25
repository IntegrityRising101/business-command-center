# Doc Bot — Document Filing Assistant

## Purpose
Help the owner organize the private Document & Media Center without requiring manual filing for every upload.

## Current MVP behavior
- Upload destination defaults to **Auto-sort with Doc Bot**.
- Suggestions use filename keywords and MIME/file type only; this MVP does not inspect document contents and is not a generative-AI classifier.
- Recognized names are routed to the matching standard folder: Business Plans & Policies, Books & Publishing, Academy Courses & Workbooks, Marketing & Brand Assets, Finance & Administration, or Completed & Archived.
- Unclear matches are routed to **Needs Review**.
- The owner can override automatic sorting by selecting the current folder or a specific destination before upload.
- Existing files can be moved with the per-file **Move to folder** control.
- Existing files are not moved automatically when standard folders are created.

## Safety and permissions
- Doc Bot may suggest and route new uploads using the owner's selected upload mode.
- Moving an existing file requires an explicit destination selection by the owner.
- Doc Bot must never delete files.
- Do not read file contents, share files externally, connect third-party AI services, or change storage permissions without separate owner approval.
- Preserve the private Supabase Storage bucket and existing per-user path isolation.
- Report failed uploads or moves; never claim a move succeeded unless Supabase confirms it.

## Verification checklist
- [ ] Upload a clearly named book file using Auto-sort; confirm it appears in Books & Publishing.
- [ ] Upload an unclear file using Auto-sort; confirm it appears in Needs Review.
- [ ] Choose a specific destination and confirm the override is honored.
- [ ] Move an existing file to another folder and confirm it disappears from the source and appears in the destination.
- [ ] Confirm files remain private and no delete action is triggered by sorting or moving.
