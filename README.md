# Hulog · Hermes Academy

React 18, TypeScript, Tailwind, Vite and Supabase. Three daily Filipino financial-literacy cards, a bamboo coin bank, persistent player accounts, five collection shelves, wearable Hestia costumes, and a database-protected admin panel.

## Run locally

1. Run `npm ci`.
2. Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (publishable or legacy anon key).
3. Run `npm run dev`.

Never put GitHub tokens, service-role keys, or passwords in a `VITE_` variable. Vite includes those variables in the browser bundle. The supplied project public configuration is saved only in the ignored `.env.local` for this checkout.

## Initialize Supabase

The connected account must have access to the target project. The public key cannot initialize the database.

1. Inspect the existing schema first. Apply `supabase/migrations/202610160001_hulog.sql` to a fresh project, or reconcile it with an existing schema before applying it. The migration is intentionally not a destructive reset.
2. In Supabase Auth settings, enable email/password signup and disable **Confirm email**. Players only enter a username/password; the app maps usernames to internal identifiers such as `name@players.hulog.internal`. There is no email recovery flow for these identifiers. Set appropriate Auth rate limits for public signup.
3. Set server environment variables `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `HULOG_ADMIN_PASSWORD` in a secure terminal. Use the requested initial administrator password for the last variable. Do not store it in source control.
4. Run `npm run seed`. It imports 112 curriculum cards and 48 collectibles, then creates or verifies the reserved `hermeshulog` account with an administrator role. Existing seeded accounts are verified without resetting their passwords. The script refuses to promote an unmarked pre-existing identity.
5. Verify login, registration, refresh persistence, player isolation, and administrator access against the live project.

The seed is idempotent and preserves edits to existing questions. Run `node scripts/build-seed.mjs` to regenerate its input after changing the source curriculum or collection catalog. Collection rewards rotate across shelves, including wearables, instead of exhausting one shelf first.

For an interactive local administrator setup, run `npm run setup:admin`. It prompts for the server secret key and initial administrator password with hidden input, runs the same idempotent seed, and clears those values from its environment afterward. It does not write credentials to a file. It uses the URL in `.env.local`, or the supplied Hulog project URL if that file is absent.

## Authorization and persistence

Supabase Auth owns password hashes in `auth.users`; there is deliberately no public `profiles.password_hash` column. Profiles contain account identity, role, coin/streak summaries, equipped outfit, and validated progress JSON.

All exposed tables have RLS. Players can read their own profile, answers, and unlocks. Administrators can read player metrics and edit questions. Client code cannot directly update profiles, roles, coins, answer history, or unlocks. Validated SQL functions score today's scheduled questions, prevent duplicate rewards, save daily completion, award Sunday collectibles, verify wearable ownership, and change roles. Self-demotion is blocked.

Saving waits for the server before confirming completion. Guest play is gated by login. Credentials and demo users from the former browser-only prototype are not imported or reused. Sessions persist through the Supabase client, and account switching reloads account-specific progress.

## Game and administration

- `/`: Daily drop, total coins, forgiving streak, weekly tracker, and Sunday reward reveal.
- `/play`: Three scheduled cards. Questions and choices use Filipino, with optional English context. Sorting submissions are graded on the server. Coin feedback uses Web Audio synthesis and local CSS animation; there are no external audio assets.
- `/koleksyon`: Aparador with Philippine money, national/cultural symbols, farm life, traditional attire, and mythology forms. Unlocked wearable layers visibly change the official Hestia artwork.
- `/admin/questions`: Create/edit/delete questions, set a specific date or recurring weekday, assign slots 1–3, and inspect the calendar. One card per date/weekday and slot prevents ambiguous schedules. Exact dates take priority over recurrence, then the seeded rotation fills remaining slots.
- `/admin/users`: Registered usernames, creation dates, coins, streaks, collection counts, and promote/demote controls.
- `/admin`: Accuracy, daily activity in Philippine time, and commonly missed questions, computed from actual answer records.

Admin navigation and routes require `profiles.is_admin = true`; the database independently checks permissions. Legacy calendar/statistics URLs redirect to the consolidated tabs.

## Checks

- `npm run typecheck`: strict TypeScript checks.
- `npm run build`: TypeScript plus production Vite build.
- `npm run test:db`: applies the migration to embedded PostgreSQL with test Auth roles, imports the curriculum/catalog, and tests isolation, scoring, replay prevention, role changes, reserved-admin protection, reward idempotency, scheduling overrides, and anonymous denial. This does not replace live Supabase Auth integration tests.

## Deploy on Vercel

Import the repository using Vercel's Vite framework preset. Set the two public Supabase environment variables in **Preview** and **Production**. Build command: `npm run build`. Output: `dist`. `vercel.json` supplies SPA rewrites so direct route visits resolve correctly. Initialize the database and Auth settings before sending players to the preview.

The local checkout is implemented and build/database-tested. Live migration, Auth/admin seeding, authenticated browser testing, GitHub publication, and Vercel deployment require authorized access and are not implied by a passing local build.
