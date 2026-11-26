# Private Community Rooms — Proposed Design

**Product:** Integrity Rising — The Wellness & Growth App  
**Owner decision:** Support both public rooms and private rooms restricted to approved members.  
**Priority:** High — Public Launch Security  
**Status:** Proposed design only — not implemented or approved for database changes  
**Prepared:** November 26, 2026

## 1. Goals and safety constraints

- Preserve the existing seven community rooms and their current open-room behavior during planning.
- Allow a room to be explicitly public or private.
- Allow private-room access only for approved members, plus authorized community moderators.
- Enforce access in Supabase Row Level Security (RLS), not only in React/client-side filtering.
- Prevent unauthorized users from reading private-room messages, listing private rooms, or posting to private rooms.
- Keep room reporting and moderator workflows working.
- Do not expose message bodies, private-room names, or membership lists to non-members.
- Do not run migrations or change live policies until the owner reviews and explicitly approves the final implementation plan.

## 2. Current-state evidence (owner-run live read-only checks, Nov. 26, 2026)

- `public.community_rooms` currently has: `id`, `name`, `description`, `guidelines`, `sort_order`, `is_active`, `created_at`. No visibility field was found.
- `public.community_room_messages` currently has: `id`, `room_id`, `user_id`, `body`, `created_at`.
- The room-message SELECT policy checks only that the parent room is active; it does not check room membership.
- The room-message INSERT policy requires the sender's `user_id` to equal `auth.uid()` and the parent room to be active.
- The room-message DELETE policy permits a member to delete their own messages.
- The inspected room-related foreign keys connect messages to rooms and reports to messages. No room-membership relationship was found in the inspected results.
- The reviewed app component currently loads active rooms for signed-in users and does not enforce a private-room membership check.
- No database or application changes were made during this review.

## 3. Proposed data model (for review; names are provisional)

### A. Add room visibility

Add a non-null `visibility` field to `public.community_rooms` with allowed values `public` and `private`, defaulting existing and newly created rooms to `public`.

**Migration safety:** Existing seven rooms must remain public after migration. Confirm actual room records and migration history before applying any DDL. Do not assume a default alone is sufficient without checking the existing data and constraints.

### B. Add explicit membership records

Proposed table: `public.community_room_members`

| Field | Purpose |
|---|---|
| `room_id` | References `community_rooms.id` |
| `user_id` | References the member's auth user ID |
| `status` | `pending`, `approved`, `declined`, or `revoked` |
| `invited_by` | Member/moderator who initiated the invitation, if applicable |
| `approved_by` | Moderator who approved access, if applicable |
| `created_at` | Membership request/invitation timestamp |
| `updated_at` | Last status-change timestamp |

Use a composite unique key on (`room_id`, `user_id`) and foreign keys to the actual referenced tables. Final field types and delete behavior must be checked against the live schema before implementation. Avoid adding a member-controlled `approved` flag: approval must be authorized by a moderator or a separately verified room administrator.

### C. Membership lifecycle

- A moderator may invite a member or approve a request.
- A member may request access if the product chooses to support requests.
- A member may leave a room.
- A moderator may revoke access.
- Pending, declined, and revoked memberships do not grant access.
- Only an approved membership grants private-room access.
- Do not assume an invitation is approved merely because it exists.

For the first safe release, prefer moderator-controlled invitations/approval. Add self-service requests only if the UI and abuse-handling workflow are defined.

## 4. Proposed authorization rules

| Resource/action | Public room | Private room |
|---|---|---|
| Discover/list room | Any signed-in member, if active | Approved members and authorized moderators only |
| Read messages | Any signed-in member, if active | Approved members and authorized moderators only |
| Send messages | Signed-in member as self, if active | Approved members and authorized moderators only |
| Delete own message | Author, subject to active product rules | Author, subject to active product rules |
| Manage membership | Authorized moderators | Authorized moderators |
| View membership roster | Do not expose by default | Do not expose by default; restrict to self and authorized moderators |

RLS must enforce the same access rule on both room rows and message rows. The message policies must independently verify the parent room's visibility and approved membership; hiding a room in the UI is not security.

Use carefully reviewed helper functions or policy subqueries to avoid recursive RLS. If a SECURITY DEFINER helper is proposed, explicitly review its owner, EXECUTE grants, empty/fixed search_path, schema-qualified references, and caller identity handling. Do not rely on a helper function merely because another moderator helper exists.

## 5. Application changes required after database design approval

- Show public rooms to signed-in members.
- Show private rooms only when the member has approved access.
- Add clear private-room labels and access-denied/empty states without revealing private room details.
- Add moderator-only invite/approve/revoke controls.
- Ensure room lists, message queries, realtime subscriptions, and any cached data all respect the same access rules.
- Handle revoked access immediately: stop displaying messages and unsubscribe from the private room.
- Keep report and moderation flows available without broadening message access.
- Update the privacy notice/community guidelines to explain private-room membership and moderation access.

## 6. Required tests before release

Use at least three separate test identities: ordinary member A, ordinary member B, and moderator C.

1. Public room: A and B can discover, read, and post.
2. Private room: approved A can discover, read, and post.
3. Private room: unapproved B cannot list the room, fetch its messages, post, or access it through direct API calls.
4. Pending, declined, and revoked members cannot read or post.
5. Moderator C can perform only the intended membership-management actions.
6. A cannot approve their own membership or alter another member's status.
7. Revocation blocks subsequent reads/posts and realtime delivery.
8. Message reports and own-message deletion still work as intended.
9. Existing seven rooms remain public and existing public-room messages remain accessible.
10. Test direct Supabase queries/API requests, not just the rendered UI.

Record date, environment, test identity/role, expected result, actual result, and evidence. Do not mark the security item verified until all required tests pass.

## 7. Rollout sequence

1. Inspect current live room rows, full table constraints, grants, triggers, policies, realtime configuration, and app queries.
2. Resolve the repository's duplicate migration number 005 and confirm the target project's migration history. Do not reorder or rerun migrations blindly.
3. Finalize the schema and RLS design, including moderator membership-management authority and delete behavior.
4. Review the exact migration and policy SQL with the owner.
5. Obtain explicit owner approval before applying any database migration or policy change.
6. Apply to a non-production/test environment first, if available.
7. Run the separate-account test matrix.
8. Deploy the app UI only after database enforcement is confirmed.
9. Re-test existing public rooms and moderation/reporting workflows.
10. Record evidence in the app repository and Business Command Center checklist.

## 8. Explicitly out of scope for this proposal

- No SQL migration has been generated or applied.
- No RLS policy has been changed.
- No existing room or message data has been modified.
- No member has been added, removed, or invited.
- No public launch approval is implied.

## 9. Related privacy item: member goals

The owner separately decided that `profiles.member_goals` must remain private unless a member chooses to share. Because the current profile SELECT policy grants row access to authenticated members, a column-level privacy design is also required. Keep this as a separate security work item; do not solve it by assuming room membership or by broadening profile access.
