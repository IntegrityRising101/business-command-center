# Social Media Manager Bot — Integration & Approval Specification

**Status:** Approved product direction; implementation not yet started  
**Owner:** Integrity Rising  
**Platforms in scope:** Facebook, Instagram, LinkedIn, TikTok, YouTube, and X  
**Default business timezone:** America/Chicago  
**Cost policy:** Free-first. No paid tool, API tier, subscription, advertising spend, or usage charge may be activated without the owner's explicit approval.

## 1. Mission and responsibilities

The Social Media Manager Bot prepares, organizes, schedules, and (only after the required approvals and account connections) publishes Integrity Rising content across the six selected platforms.

Core responsibilities:
- Build a weekly content calendar and daily publishing suggestions.
- Draft platform-specific captions, hooks, calls to action, hashtags, and accessible alt text.
- Prepare image, short-video, long-video, and text-post briefs.
- Adapt each approved campaign to each platform's format and character/media limits.
- Track approval state, scheduled time, publication result, post URL, and errors.
- Produce weekly performance summaries from authorized platform analytics.
- Maintain a reusable campaign library for books, Academy courses, the Wellness & Growth App, Integrity Rising community, merchandise, and approved awareness campaigns.

The bot must not imply that accounts are connected or that content has been published until the platform confirms the action.

## 2. Platform integration plan

Use official platform APIs and OAuth wherever possible. Store access/refresh tokens only in secure server-side secrets or a protected server-side token store; never in browser local storage, source code, GitHub commits, or client-visible configuration.

| Platform | Planned official integration | Key prerequisites / constraints |
|---|---|---|
| Facebook | Meta Graph API / Pages publishing | Facebook Page access, Meta app, OAuth, required Page permissions and any applicable app review. Personal-profile publishing is not assumed. |
| Instagram | Instagram Graph API publishing | Eligible professional account connected to a Facebook Page (or currently supported Meta login path), OAuth, publishing permissions, media-hosting requirements, and applicable review. |
| LinkedIn | LinkedIn API for organization/person posts as permitted | OAuth, approved products/scopes, organization role where posting as a Page, and LinkedIn app review/partner access where required. |
| TikTok | TikTok Content Posting API | Developer app, OAuth scopes, content-posting approval/audit requirements, creator/account authorization, and media requirements. |
| YouTube | YouTube Data API v3 video upload and metadata | Google OAuth consent, channel authorization, API quota; uploads from unverified API projects may be restricted/private until audit. |
| X | X API post creation | Developer project/app, user-context OAuth and write permissions; API access tier, quotas, and potential fees must be checked and approved before activation. |

**Integration rule:** API availability, scopes, review requirements, quotas, and prices can change. Verify current official documentation and display any cost or access restriction before connecting or enabling a platform. If a platform requires a paid tier or approval the owner does not have, leave that platform in **Not Connected / Blocked**, and continue using draft/export workflows.

## 3. Recommended architecture

1. **Content Studio (dashboard):** campaign brief, content drafts, media attachments, platform variants, preview, and calendar.
2. **Approval Queue:** owner review of each platform-specific version, including its exact text, media, destination account, and scheduled time.
3. **Publishing Queue:** only approved items enter the queue. A server-side scheduler invokes platform-specific publishing adapters.
4. **Secure connection service:** OAuth authorization and token refresh handled server-side. Tokens are encrypted and access is restricted by business tenant and owner/admin role.
5. **Publishing adapters:** separate modules for Meta, LinkedIn, TikTok, YouTube, and X. One platform failure must not silently mark other platform posts as published.
6. **Audit log:** record who drafted, edited, approved, scheduled, published, retried, cancelled, or rejected each item, with timestamps and provider response IDs.
7. **Analytics importer:** read only authorized metrics and show source, reporting period, and last successful sync.

For the current React/Vite + Supabase application, use Supabase Edge Functions or another approved server-side service for OAuth callbacks, token handling, scheduling, and API calls. Never place provider secrets in Vite environment variables exposed to the browser. Add Row Level Security and server-side tenant authorization before enabling customer workspaces.

## 4. Content lifecycle and approval workflow

Statuses:
- **Idea** — campaign or topic captured.
- **Draft** — bot-generated or owner-written content, not publishable.
- **Needs Owner Review** — complete platform preview awaiting approval.
- **Changes Requested** — owner feedback must be addressed.
- **Approved** — exact version approved for the named platform/account and time window.
- **Scheduled** — approved item placed in the publishing queue.
- **Publishing** — request sent to the platform.
- **Published** — confirmed by platform response; store post ID and URL when available.
- **Failed** — publish attempt failed; show error and retry guidance.
- **Cancelled / Rejected** — removed from the active queue.

Approval rules:
- Approval is per platform-specific version and destination account, not a blanket approval of a campaign.
- Any edit to approved text, media, link, audience, destination, or scheduled time returns that version to **Needs Owner Review**.
- The owner must see the exact preview and proposed publication time before approval.
- Routine evergreen posts may be scheduled in batches only after the owner explicitly approves the exact batch and its schedule.
- Sensitive or high-risk content always requires fresh owner approval: domestic-violence safety information, survivor stories, health/mental-health or recovery claims, legal/financial claims, political or crisis statements, personal data/images, allegations, partnerships, fundraising claims, and content involving children.
- The bot may prepare comment replies and DM responses as drafts. It must not automatically send DMs, reply to sensitive comments, make commitments, delete comments, block users, or moderate disputes without explicit owner approval.
- Paid promotion, boosted posts, ad creation, subscriptions, or any other spend always requires separate explicit approval and a displayed cost.
- Never publish private customer/member information, confidential project details, unpublished app security details, or personal survivor information.

## 5. Owner controls

The owner can:
- Connect/disconnect each platform separately.
- Choose the destination Page, professional account, organization, channel, or X account.
- Set posting days, time windows, and per-platform frequency.
- Approve, reject, edit, reschedule, pause, or cancel queued content.
- Set campaign and topic restrictions.
- View token/connection health without exposing tokens.
- Export drafts for manual posting when API access is unavailable.
- Review a full action and approval history.

Default settings until the owner changes them:
- All six platforms begin **Not Connected**.
- Publishing is **Disabled** until OAuth and test publishing are verified.
- No paid services or ads.
- No autonomous comments, DMs, or moderation.
- Owner approval required for every post.
- Default timezone: **America/Chicago**.

## 6. Rollout phases

### Phase 1 — Free-first content workflow
- [ ] Add Social Media Manager Bot workspace and platform status cards.
- [ ] Add content calendar, campaign library, platform-specific drafts, previews, and export/copy controls.
- [ ] Add approval queue and immutable approved-version snapshots.
- [ ] Add audit history and owner pause/cancel controls.
- [ ] Test persistence, RLS, tenant isolation, accessibility, and mobile layouts.

### Phase 2 — Platform connection foundation
- [ ] Confirm official API access, current terms, scopes, app-review requirements, quotas, and costs for each platform.
- [ ] Create provider apps only when needed and with owner consent.
- [ ] Implement secure OAuth callback and token storage server-side.
- [ ] Add per-platform connection health and disconnect/revoke handling.
- [ ] Verify permissions with test accounts and sandbox/test modes where available.

### Phase 3 — Controlled publishing
- [ ] Implement one platform adapter at a time, beginning with the platform that has approved access and the clearest no-cost path.
- [ ] Test draft-only, owner-approved test post, scheduled publish, failed publish, retry, cancellation, and duplicate prevention.
- [ ] Require platform confirmation before marking a post Published.
- [ ] Add idempotency and per-platform failure isolation.
- [ ] Enable routine batch scheduling only after explicit owner configuration and successful verification.

### Phase 4 — Analytics and optimization
- [ ] Import authorized reach, impressions, engagement, video views, clicks, and follower metrics where available.
- [ ] Add weekly performance report with date range and source timestamps.
- [ ] Recommend content improvements without claiming causation from small samples.

## 7. Acceptance criteria

The feature is not considered live publishing until:
- A platform shows **Connected** only after a successful OAuth flow and verified required permissions.
- Owner approval is stored against the exact content version, account, and scheduled time.
- Editing an approved post invalidates its approval.
- A draft cannot reach the publishing endpoint.
- Every publishing attempt is auditable and duplicate-safe.
- Published status requires a confirmed provider response.
- Failed posts remain visible and do not disappear from the queue.
- Paid costs are disclosed and separately approved.
- RLS and server-side authorization prevent cross-business access.
- No tokens or secrets are exposed in browser code, logs, or Git history.

## 8. Initial owner decisions recorded

- Brand: Integrity Rising.
- Bot: Social Media Manager Bot.
- Selected platforms: Facebook, Instagram, LinkedIn, TikTok, YouTube, X.
- Desired outcome: prepare, schedule, and publish approved social content; report performance.
- Approval boundary: owner approval before publication until a later, explicit standing authorization is configured.
- Budget: $0-first; no spending without explicit approval.
