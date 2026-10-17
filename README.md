# Hulog · Hermes Academy

React 18, TypeScript, Tailwind, Vite and Supabase. Three daily Filipino financial-literacy cards, a bamboo coin bank, persistent player accounts, seven collection shelves, wearable Hestia costumes, and a database-protected admin panel.

Each player follows a personal 365-day curriculum. Their current day is `(completed drops excluding today % 365) + 1`; missing calendar days never skips lessons, and saving today never changes today's cards. Stages progress from FRP 101 Foundational to FRP 108 Advanced, with Sweldo Hulog Special every 15th learning day. Daily completion limits and Sunday rewards still use Asia/Manila calendar dates. Existing completed drops count toward the sequence; administrator practice remains unrecorded.

## Run locally

1. Run `npm ci`.
2. Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (publishable or legacy anon key).
3. Run `npm run dev`.

Never put GitHub tokens, service-role keys, or passwords in a `VITE_` variable. Vite includes those variables in the browser bundle. The supplied project public configuration is saved only in the ignored `.env.local` for this checkout.

## Initialize Supabase

The connected account must have access to the target project. The public key cannot initialize the database.

1. Inspect the existing schema first. Apply `supabase/migrations/202610160001_hulog.sql` and `supabase/migrations/20261017174213_admin_collection_unlocks.sql` to a fresh project, or reconcile them with an existing schema before applying. The migrations are intentionally not a destructive reset.
2. Apply `supabase/migrations/20261017200030_alkansya_economy.sql` after the existing migrations. It preserves Wallet balances, retires placeholder catalog entries, maps duplicate ownership to canonical items, and installs the validated economy RPCs.
3. In Supabase Auth settings, enable email/password signup and disable **Confirm email**. Players only enter a username/password; the app maps usernames to internal identifiers such as `name@players.hulog.internal`. There is no email recovery flow for these identifiers. Set appropriate Auth rate limits for public signup.
4. Set server environment variables `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `HULOG_ADMIN_PASSWORD` in a secure terminal. Use the requested initial administrator password for the last variable. Do not store it in source control.
5. Apply `supabase/migrations/20261017213731_player_sequential_curriculum.sql`, then run `npm run seed`. It imports 1,095 sequential curriculum cards (365 days × 3 slots across FRP 101–108) and 58 collectibles, retires the former generated calendar IDs while preserving answer history and custom overrides, verifies the reserved `hermeshulog` administrator, and unlocks all collectibles for administrators. Existing seeded accounts are verified without resetting their passwords. The script refuses to promote an unmarked pre-existing identity.
6. Verify login, registration, refresh persistence, player isolation, and administrator access against the live project.

The seed idempotently replaces the known curriculum IDs with generated content; custom question IDs remain untouched. Run `node scripts/build-seed.mjs` to regenerate its input after changing the source curriculum or collection catalog. Catalog IDs, names, bilingual choices, and daily calendar coverage are checked by the database test suite.

For an interactive local administrator setup, run `npm run setup:admin`. It prompts for the server secret key and initial administrator password with hidden input, runs the same idempotent seed, and clears those values from its environment afterward. It does not write credentials to a file. It uses the URL in `.env.local`, or the supplied Hulog project URL if that file is absent.

## Authorization and persistence

Supabase Auth owns password hashes in `auth.users`; there is deliberately no public `profiles.password_hash` column. Profiles contain account identity, role, coin/streak summaries, equipped outfit, and validated progress JSON.

All exposed tables have RLS. Players can read their own profile, answers, and unlocks. Administrators can read player metrics, edit questions, and automatically have all 58 collectibles unlocked and equippable. Client code cannot directly update profiles, roles, coins, answer history, or unlocks. Validated SQL functions score today's scheduled questions, prevent duplicate rewards, save daily completion, bank daily coins, collect Sunday payouts, purchase catalog items, verify wearable ownership, and change roles. Self-demotion is blocked.

Saving waits for the server before confirming completion. Guest play is gated by login. Credentials and demo users from the former browser-only prototype are not imported or reused. Sessions persist through the Supabase client, and account switching reloads account-specific progress.

## Game and administration

- `/`: Daily drop, Alkansya savings, spendable Wallet, pinned savings goal, forgiving streak, and Sunday coin payout.
- `/play`: Three scheduled cards. English questions, choices, and feedback lead; Filipino translations appear underneath. A perfect 3/3 adds one banked coin. The standalone Isang Hakbang step adds five banked coins. Sorting submissions are graded on the server. Coin feedback uses Web Audio synthesis and local CSS animation; there are no external audio assets.
- `/koleksyon`: Aparador with Philippine money, national treasures, ancient artifacts, livelihood assets, merienda, national costumes, and mythical looks. Items cost 15/30/50/80 Wallet coins by rarity. Unlocked wearable layers visibly change the official Hestia artwork.
- `/admin/questions`: Browse Day 1–365 with course, level, and three ordered slots. Edit a sequence assignment or configure a date/weekday override. One card per sequence day/date/weekday and slot prevents ambiguous assignments. Exact dates take priority over recurrence, then the player's sequence fills remaining slots.
- `/admin/users`: Registered usernames, creation dates, coins, streaks, collection counts, and promote/demote controls.
- `/admin`: Responsive SVG activity/accuracy trends, six-tier mastery bars, format/difficulty accuracy rings, and commonly missed questions, computed from actual answer records.

Admin navigation and routes require `profiles.is_admin = true`; the database independently checks permissions. Legacy calendar/statistics URLs redirect to the consolidated tabs.

## Weekly economy

Correct answers drop +1 coin into `progress.alkansyaCoins` (up to 3/day). Saving a perfect daily drop adds +1, and Isang Hakbang adds +5 once/day. After completing Sunday's three cards, `open_alkansya()` transfers the entire bank plus +1 per owned Asset (maximum +6) into the Wallet. It stores an idempotent weekly receipt; nothing is granted automatically. Missed Sundays carry all banked savings forward. Actions completed after collecting remain banked until the next Sunday.

`purchase_item(p_item)` locks the profile and uses the server catalog price; clients cannot supply balances, bonuses, or ownership. Reserve purchases build Heritage Net Worth (Explorer <100, Steward ≥100, Keeper ≥300, Guardian ≥600) and award a Pahinga shield at every third owned Reserve, capped at three held shields. Wearable Wants fit around Hestia in separate back/body/head layers. Merienda Wants remain cabinet treats. A pinned goal includes Wallet plus bank savings; only Wallet coins can be spent.

## Checks

- `npm run typecheck`: strict TypeScript checks.
- `npm run build`: TypeScript plus production Vite build.
- `node scripts/test-browser.mjs`: browser integration checks with isolated mocked Supabase responses at 390px and 1280px; never creates live users. Requires Playwright (`HULOG_PLAYWRIGHT_MODULE` may name its module URL) and Edge, or `HULOG_BROWSER_PATH`. Screenshots go to ignored `artifacts/qa`.
- `npm run test:art`: render all 58 collectible SVGs and check that every illustration is nonempty and unique.
- `npm run test:db`: applies the migration to embedded PostgreSQL with test Auth roles, imports the curriculum/catalog, and tests isolation, scoring, replay prevention, role changes, reserved-admin protection, reward idempotency, scheduling overrides, and anonymous denial. This does not replace live Supabase Auth integration tests.

## Deploy on Vercel

Import the repository using Vercel's Vite framework preset. Set the two public Supabase environment variables in **Preview** and **Production**. Build command: `npm run build`. Output: `dist`. `vercel.json` supplies SPA rewrites so direct route visits resolve correctly. Initialize the database and Auth settings before sending players to the preview.

Apply the economy migration and regenerate/import the seed before releasing this client; the older RPCs pay rewards differently. The local checkout is implemented and build/database-tested. Live migration, Auth/admin seeding, authenticated browser testing, GitHub publication, and Vercel deployment require authorized access and are not implied by a passing local build.
