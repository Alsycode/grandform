# Grand Form Restaurant — Build Tracker

> **Resume protocol:** if you're a new Claude Code session picking this up, read this whole file first, then check "Current status" at the bottom before doing anything.

## Goal
Rebuild the Grand Form Restaurant landing page (pixel-close to `assets/landingpageui.jpeg`) in Next.js, then build an admin panel (matching `assets/adminapanelui.jpeg`) backed by Supabase, deployable on Hostinger's single hosting plan.

## Tech stack (decided)
- Next.js 16 (App Router, `src/` dir), React 19, TypeScript, Tailwind CSS v4 — already scaffolded at repo root.
- Supabase (Postgres + Storage + Auth) for menu items, gallery images, specials, testimonials, reservations, admin users — **not yet wired up**.
- Target host: Hostinger (single/shared plan) — Next.js needs Node hosting; if Hostinger's plan is static-only, we'll need `next export`/static-friendly approach or a Node-capable Hostinger tier. **Flag to revisit before deploy** — shared/static Hostinger plans do not run a Node server, so either upgrade the plan, deploy the frontend elsewhere (Vercel) and point the domain, or confirm the plan includes Node.js app hosting.

## Hotel info (source: assets/hoteinfoimage.jpeg — WhatsApp forward)
- Name: **Hotel Grand Form** (branded on-site as "Grand Form Restaurant")
- Address: Grand Form, Iringalakuda, Kator Bypass Road, 680121
- Phone: 9961 80 80 70, 8086 908 909
- Email: hotelgrandform@gmail.com
- Website: www.hotelgrandform.com
- Hours: Open 12:00 PM – 12:00 AM (daily, "12 to 12")
- Instagram: instagram.com/hotel.grandform

## Brand assets
- Logo extracted from `assets/Grand Form Hotel  Font change.pdf` (vector, page 1) via PyMuPDF at 4x res, cropped:
  - `public/images/logo-icon.png` — circular monogram only (maroon/gold), transparent bg
  - `public/images/logo-full.png` — full lockup (icon + "GRAND FORM" wordmark), transparent bg
- Brand colors (sampled from reference UI, `assets/landingpageui.jpeg`):
  - Near-black header/footer: `#141110`
  - Gold accent: `#C9993D` (buttons, links, highlights)
  - Deep maroon (from logo): `#7A1620`
  - Cream section bg: `#F7F1E7`
  - Body text dark: `#1A1A1A`

## Asset inventory & mapping (all in `assets/`, copied/derived into `public/images/`)
| Source file | Used as | Notes |
|---|---|---|
| `hero-bg.png` | Hero section background (string-light dining area) | |
| `hero-food.png` | Hero foreground plate (grilled chicken + fries + mojito) | has transparent-ish dark bg, floats over hero-bg |
| `storefront.png` | About section image ("A Place For Food Lovers") | night exterior, "GRAND FORM RESTAURANT" signage |
| `contact-interior.png` | duplicate of storefront.png (same source shot) | reused for Contact section right-side image OR swap w/ gallery-3 if needed |
| `menu-biryani.png`, `menu-tandoori.png`, `menu-pasta.png`, `menu-burger.png`, `menu-shake.png` | 5 "Our Popular Picks" menu cards | matches Chicken Biryani ₹220, Tandoori Chicken ₹280, Alfredo Pasta ₹200, Crispy Chicken Burger ₹150, Chocolate Shake ₹120 (prices from reference UI) |
| `specials-bg.png` | "Today's Special" dark banner background | |
| `gallery-1.jpg to gallery-4.png` (renamed `gallery-neon.png`) | Ambience gallery — "Good Food Great Moments" neon shot | only 1 unique extra ambience photo provided |
| **derived:** `public/images/gallery-1.jpg` / `gallery-2.jpg` | left/right crops of `hero-bg.png` | stand-ins to fill the 4-photo gallery grid since only 2 unique ambience shots exist |
| **derived:** `public/images/gallery-3.jpg` | = gallery-neon.png | |
| **derived:** `public/images/gallery-4.jpg` | crop of storefront.png (interior glass portion) | |
| `Grand Form Hotel  Font change.pdf` | logo source | extracted, see Brand assets above |
| `adminapanelui.jpeg` | reference only, for Phase 2 admin panel | not yet built |
| `landingpageui.jpeg` | reference only, for landing page | pixel reference for this build |

**Known gap:** only 2 truly unique ambience/interior photos exist (`hero-bg`, the neon shot). Gallery section currently fakes 4 with crops. If the user provides 2 more distinct ambience photos later, swap into `gallery-1.jpg`/`gallery-2.jpg`.

## Page sections (from landingpageui.jpeg, top to bottom)
1. Sticky header: logo + wordmark, nav (Home/About Us/Menu/Specials/Gallery/Location/Contact), "Book a Table" gold-outline button
2. Hero: "GOOD FOOD. GREAT MOMENTS." headline, tagline, address/phone/email block, "View Menu" button, food photo overlapping right side
3. About: "A Place For Food Lovers" — copy + 3 icon features (Delicious Food / Hygienic Kitchen / Great Ambience) + storefront photo
4. Menu highlights: "Our Popular Picks" — 5 dish cards (image, name, blurb, price, View button) + "View Full Menu" CTA
5. Specials banner: dark full-width band, "Great Food. Great Offers.", 3 icon points, CTA button
6. Gallery: "A Feast For Your Senses" — 4-photo grid + "View Gallery" CTA
7. Location + Contact split: map embed/placeholder + "We're Here To Serve You" contact block + interior photo
8. Footer: logo blurb, Quick Links, Useful Links, Contact Info, socials, copyright

## Progress checklist
- [x] Inspect existing Next.js scaffold (already Next 16.3.2 / React 19.2.8 / Tailwind 4 — matches "use latest" instruction)
- [x] Extract logo from PDF → `public/images/logo-icon.png`, `logo-full.png`
- [x] Copy/derive all photo assets into `public/images/`
- [x] Write this tracker file
- [x] Configure Tailwind theme tokens (colors, fonts) in `globals.css` — see `--color-ink/cream/gold/gold-light/maroon/charcoal` tokens
- [x] Add Google Fonts — Playfair Display (`--font-display`, headings) + Jost (`--font-body`, body), wired in `src/app/layout.tsx`
- [x] Build `Header` component (sticky nav, mobile hamburger) — `src/components/Header.tsx`
- [x] Build `Hero` section — `src/components/Hero.tsx`
- [x] Build `About` section — `src/components/About.tsx`
- [x] Build `MenuHighlights` section — `src/components/MenuHighlights.tsx`
- [x] Build `SpecialsBanner` section — `src/components/SpecialsBanner.tsx`
- [x] Build `Gallery` section — `src/components/Gallery.tsx`
- [x] Build `LocationContact` section (incl. live Google Maps embed, geocoded correctly to Iringalakuda) — `src/components/LocationContact.tsx`
- [x] Build `Footer` component — `src/components/Footer.tsx`
- [x] Assemble in `src/app/page.tsx`
- [x] Verify responsive at mobile width (390px) — all sections confirmed via screenshot, look correct
- [x] Verify desktop width (1280/1440px) via DOM measurement (JS `getBoundingClientRect`) — full-width sections confirmed correct. Note: the Claude Code browser preview pane in this session only *visually renders* screenshots up to ~600px wide (a tool/display limitation, not a site bug) — if a new session needs a real desktop screenshot, try `resize_window` with a narrower width, or just trust DOM measurements / open the dev server in a real browser at `localhost:<port>`.
- [x] Site data (hotel name/address/phone/email/hours) centralized in `src/lib/site-data.ts`
- [x] Polish: swapped emoji icons for `lucide-react` throughout (Header, Hero, About, SpecialsBanner, MenuHighlights, Gallery, LocationContact, Footer). Note: lucide-react v1 dropped brand icons — Facebook/Instagram are hand-drawn inline SVGs in `Footer.tsx`, WhatsApp uses lucide's generic `MessageCircle`.
- [x] Polish: added `sizes` prop to all `next/image fill` usages (menu cards, gallery, hero, specials-bg) — Next.js perf warnings resolved.
- [ ] Get 2 more distinct ambience/interior photos from user to replace the cropped `gallery-1.jpg`/`gallery-2.jpg` stand-ins (see "Known gap" above)
- [x] Restructured: `Header`/`Footer` moved into `src/app/layout.tsx` (was duplicated per-page before) so every route gets consistent nav/footer automatically. `src/app/page.tsx` now only holds the homepage sections.
- [x] `navLinks` / `footerLinks` in `site-data.ts` updated to real routes (`/menu`, `/gallery`, `/contact`, `/privacy-policy`, etc.) instead of `#anchor` links; Header uses `next/link` + `usePathname` for active-state highlighting.
- [x] Built `/menu` page — full menu grouped by category (Starters/Main Course/Beverages/Desserts) using `menuHighlights` data (now tagged with `category`); empty categories show a "coming soon" note rather than fabricated items.
- [x] Built `/gallery` page — grid of all 6 available photos (`galleryImages` array in site-data, includes hero-bg and storefront in addition to the 4 home-page tiles).
- [x] Built `/contact` page — contact form (`src/components/ContactForm.tsx`, client component) + info block + map. Form is front-end only: submit opens a pre-filled `mailto:` to hotelgrandform@gmail.com (no backend wired yet — see Phase 2).
- [x] Built `/privacy-policy`, `/terms-and-conditions`, `/refund-policy` — generic legal templates via shared `src/components/LegalPage.tsx`, each with a visible disclaimer that they're templates and should be reviewed by a qualified professional before relying on them legally. Populated with real hotel contact info, not fabricated specifics.
- [x] Added `src/components/PageBanner.tsx` (dark banner + breadcrumb) used by all sub-pages for a consistent look.
- [x] Verified: `npx tsc --noEmit` clean, `npx eslint src --max-warnings=0` clean, all new routes screenshot-verified in the browser preview.
- [ ] Phase 2: Supabase schema (menu_items, gallery_images, specials, testimonials, reservations, admin users) — not started. **Blocked on user**: need a Supabase project URL + anon key (and later a service-role key, server-side only) to wire this up — ask the user for these credentials, or walk them through creating a free Supabase project if they don't have one yet.
- [ ] Phase 2: Admin panel UI matching `assets/adminapanelui.jpeg` — not started. Sidebar nav: Dashboard, Menu Items, Gallery, Specials, Testimonial, Reservations, About Us, Location, Contact Info, General Settings, Users.
- [ ] Phase 2: Wire admin panel CRUD to Supabase, and wire `/contact` form + a reservations flow to Supabase instead of `mailto:` — not started
- [ ] Phase 2: Admin auth (Supabase Auth) — not started, needs credential/approach decision with user
- [ ] Phase 3: Hostinger deploy plan — resolve Node-hosting question above, not started

## Supabase project (see CREDENTIALS.md for actual keys — gitignored, never commit)
- Project ref `yatiisevcltpupcwtihr`, keys live in `.env.local` (gitignored) as `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server-only), `SUPABASE_DB_PASSWORD`.
- `@supabase/supabase-js` installed.
- Admin auth decision: single Supabase Auth admin account (per user's answer to AskUserQuestion). Admin email still needed from user before creating the account — the account itself is created in the Supabase dashboard by the user, not by Claude.
- No schema, `src/lib/supabase.ts` client, or admin panel routes exist yet — this is next.

## Maroon rebrand pass (2026-08-21, after user shared an updated reference screenshot)
The user provided a second reference image showing the actual site should use a deep maroon/wine palette (matching the logo) instead of near-black, and asked to match it exactly. Changes made:
- `globals.css`: added `--color-maroon-deep: #3b0d13` (rich wine, used for header/hero/footer/specials/page-banners) alongside existing `--color-maroon: #7a1620` (medium maroon, used for accents/buttons on light backgrounds) and `--color-ink: #211313` (now a maroon-tinted near-black, used for body text).
- **Palette rule now in effect across the whole site:** on dark maroon-deep backgrounds (Header, Hero, Footer, SpecialsBanner, PageBanner), accent color is **gold**. On light/white/cream backgrounds (About, MenuHighlights, Gallery, LocationContact, sub-pages), accent color is **maroon**, and primary buttons are solid **maroon-deep** fill with white text. Follow this rule for any new sections.
- `Header.tsx`, `Hero.tsx`: already updated to `bg-maroon-deep` before this pass started (found already changed on disk — kept as-is, they were correct).
- `Footer.tsx`, `PageBanner.tsx`: `bg-ink` → `bg-maroon-deep`.
- `About.tsx`: icons already maroon (found already correct).
- `MenuHighlights.tsx`: kicker label → maroon; "View" button → solid maroon fill/white text (was gold outline); "View Full Menu" → `bg-maroon-deep` (was `bg-ink`).
- `Gallery.tsx`: kicker → maroon; "View Gallery" button → `bg-maroon-deep`.
- `SpecialsBanner.tsx`: `bg-charcoal` → `bg-maroon-deep`; **added a 4th feature point "Warm & Cozy Ambience" with a `Sparkles` icon** (reference shows 4 points, we only had 3); swapped `Utensils` → `ChefHat` icon for "Fresh & Quality Ingredients" to better match the cloche-like icon in the reference.
- `LocationContact.tsx`: kickers + all icons (Phone/Mail/Globe/MapPin/Clock) → maroon; "Get Directions" button → maroon outline/fill-on-hover (was ink).
- `/menu` page: category underline → maroon; price color reverted to `text-ink` (black) to match how price is styled in the homepage `MenuHighlights` card, not gold/maroon.
- `/contact` page + `ContactForm.tsx`: section underlines and icons → maroon; form input focus ring → maroon; submit button → `bg-maroon-deep` (was gold).
- Verified: `npx tsc --noEmit` clean, `npx eslint src --max-warnings=0` clean, homepage + `/menu` + `/contact` re-screenshotted and visually match the new reference image's maroon theme.

## Phase 2: Supabase + Admin Panel (2026-08-21)
Full backend + admin panel built in this pass. Summary:

**Database** — `supabase/schema.sql` (idempotent, re-runnable) creates: `menu_items`, `gallery_images`, `specials`, `testimonials`, `reservations`, `site_content` (singleton row, id=1, holds About/Location/Contact/Hours text), `admin_profiles` (maps a Supabase Auth user → admin role). RLS enabled on every table: `anon` role can SELECT only "live" rows (`status='Active'`, `active=true`, `approved=true`) and can INSERT into `reservations` only; `authenticated` role (i.e. the logged-in admin) has full CRUD on everything. A public `site-images` Storage bucket holds uploaded photos, with public read + authenticated-only write policies.

- Applied via `npm run db:migrate` (`scripts/migrate.mjs`), which connects directly over Postgres using the Supavisor pooler — **this project's pooler region is `ap-south-1`** (`aws-0-ap-south-1.pooler.supabase.com:6543`); the direct `db.<ref>.supabase.co` host is IPv6-only and unreachable from this network, don't bother trying it again.
- Seeded via `npm run db:seed` (`scripts/seed.mjs`) — uploaded all current site photos (menu dishes, gallery shots, hero-bg, storefront) to the `site-images` bucket and inserted them as real rows in `menu_items` / `gallery_images` / `site_content`, matching what's already live on the public site. **Re-running `db:seed` deletes and re-inserts `menu_items`/`gallery_images`** — don't run it again casually once the admin has edited real data through the panel, or their edits will be wiped.

**Auth** — single admin account (per user's choice), email `hotelgrandform@gmail.com`. Created + invited via `npm run admin:invite -- <email>` (`scripts/create-admin.mjs`), which calls Supabase's `auth.admin.inviteUserByEmail` (creates the user, no password set yet, sends an invite email with a link) and creates the matching `admin_profiles` row. **The user needs to check that inbox and click the invite link to set their password** — I never see or set it. The invite's redirect currently points at `http://localhost:3000/admin/set-password` (from `NEXT_PUBLIC_SITE_URL`, which isn't set yet) — **update this before the user tries the real invite link if the dev server isn't on port 3000, or once deployed, set `NEXT_PUBLIC_SITE_URL` and re-invite.**

**Supabase client code:**
- `src/lib/supabase/client.ts` — browser client (anon key), for Client Components.
- `src/lib/supabase/server.ts` — server client (anon key, cookie-based session), for Server Components.
- `src/lib/supabase/admin.ts` — service-role client, server-only, bypasses RLS. Only used by the one-off `scripts/*.mjs`, not by any app route yet.
- `src/middleware.ts` — protects everything under `/admin/*` except `/admin/login` and `/admin/set-password`; redirects unauthenticated visitors to login, and redirects already-logged-in visitors away from `/admin/login`. Verified: hitting `/admin` or `/admin/menu-items` unauthenticated correctly redirects to `/admin/login`.

**Route restructure (bug fix):** the public pages were all direct children of the root layout, which also (at the time) rendered `Header`/`Footer` — so `/admin/login` was inheriting the public site's nav and footer. Fixed by moving every public page into a `(site)` route group with its own `src/app/(site)/layout.tsx` that renders `Header`/`Footer`, and stripping them back out of the bare root `src/app/layout.tsx` (which now only sets up fonts/html/body). `/admin/*` routes are outside the `(site)` group so they render clean, with their own sidebar layout instead. **If adding new public pages, put them under `src/app/(site)/`, not directly under `src/app/`.**

**Admin panel** (`src/app/admin/`), sidebar/topbar styled from `assets/adminapanelui.jpeg`:
- `(panel)/layout.tsx` — server-side auth check (redundant with middleware, but also renders `AdminSidebar` with the real logged-in email) + `AdminSidebar` (dark maroon-deep, gold active state, grouped nav: Dashboard / MANAGE (Menu Items, Gallery, Specials, Testimonial, Reservations) / CONTENT (About Us, Location, Contact Info) / SETTINGS (General Settings, Users) / Logout).
- `(panel)/page.tsx` — Dashboard: live stat cards (menu item count, gallery count, today's reservation count, active specials count) + recent menu items + recent reservations, all queried server-side from Supabase.
- `(panel)/menu-items/page.tsx` — full CRUD: category tabs, add/edit modal with image upload (to `site-images` bucket), status toggle (Active/Hidden), delete.
- `(panel)/gallery/page.tsx` — grid view with category tabs, upload-to-add, delete.
- `(panel)/specials/page.tsx` — add/edit modal, active/inactive toggle, delete.
- `(panel)/testimonials/page.tsx` — approve/pending toggle (for testimonials submitted by customers — no public submission form exists yet, this just manages rows however they get in, e.g. added manually for now), delete.
- `(panel)/reservations/page.tsx` — table with inline status dropdown (Pending/Confirmed/Cancelled). **Note: the public `/contact` page still uses `mailto:` and does NOT write to the `reservations` table** — hooking up an actual reservation form to insert into Supabase is still open, see below.
- `(panel)/about/page.tsx`, `location/page.tsx`, `contact-info/page.tsx`, `settings/page.tsx` — simple forms bound to the `site_content` singleton row.
- `(panel)/users/page.tsx` — shows the current admin's email/role; since it's single-admin by design, this is read-only for now with a note on how to add more staff later via the Supabase dashboard.
- All admin data pages are Client Components using the browser Supabase client directly (RLS's `authenticated` policies handle authorization, no server actions needed for this scope).
- `src/app/admin/login/page.tsx`, `src/app/admin/set-password/page.tsx` — standalone (no sidebar), full-page maroon/gold-branded forms.
- `src/components/admin/AdminSidebar.tsx`, `AdminTopbar.tsx`, `StatCard.tsx`, `Badge.tsx` — shared admin UI pieces.

**Verified:** `npx tsc --noEmit` clean, `npx eslint src --max-warnings=0` clean, unauthenticated middleware redirects confirmed in-browser, public site pages confirmed still correct after the route-group restructure. **Not yet verified end-to-end:** actually logging into the admin panel and using the CRUD screens — I generated a Supabase magic link to self-test this but the browser tool blocked navigating to the external `supabase.co` verify URL in this session. The user should verify this themselves once they've set their password via the invite email — if anything's broken, the likely places to look are `src/middleware.ts` cookie handling or `src/lib/supabase/server.ts`.

**Still open in Phase 2:**
- [ ] Public `/contact` form still uses `mailto:` — wire it to insert into the `reservations` table instead (or alongside).
- [ ] Public homepage/menu/gallery pages still read from the static `src/lib/site-data.ts`, not from Supabase — the admin panel edits a database that the live site doesn't actually display yet. Next step: replace `site-data.ts` reads in `MenuHighlights`, `Gallery`, `LocationContact`, `/menu`, `/gallery` with Supabase queries (server components, using the anon-key server client, reading only the "live" rows the RLS policies expose).
- [ ] No public testimonial submission form exists — testimonials table has no way to receive real customer input yet.
- [ ] `NEXT_PUBLIC_SITE_URL` not set in `.env.local` — needed for the invite/password-reset email redirect to work correctly once this isn't running on localhost.
- [ ] Admin panel has no image size/type validation on upload — fine for a single trusted admin, but worth adding basic guards if this ever opens up to more users.

## Phase 2b: Public site connected to Supabase (2026-08-22)
Per user confirmation, went ahead and connected the public-facing site to the live database instead of the static `site-data.ts`, so admin panel edits now actually show up for visitors.

- **New:** `src/lib/data.ts` — three `cache()`-wrapped server-side fetchers: `getMenuItems()` (active items only), `getGalleryImages()` (all), `getSiteContent()` (the `site_content` singleton, with a hardcoded `DEFAULT_SITE_CONTENT` fallback if the row is ever missing). `cache()` dedupes repeated calls within one request (e.g. both `Hero` and `Footer` calling `getSiteContent()` only hits the DB once per page render).
- Converted to async Server Components reading from `lib/data.ts`: `Hero`, `About`, `MenuHighlights`, `Gallery`, `LocationContact`, `Footer`, `/menu`, `/gallery`, `/contact`, `/privacy-policy`, `/terms-and-conditions`, `/refund-policy`.
- `ContactForm.tsx` now takes `restaurantEmail`/`restaurantPhone` as props from the parent Server Component instead of importing static data (renamed from `email`/`phone` to avoid colliding with the form's own input state).
- `src/lib/site-data.ts` trimmed down to just `navLinks` and `footerLinks` (nav structure, not admin-managed) — the old `hotel`, `menuHighlights`, `menuCategories`, `galleryImages` exports were deleted since nothing reads them anymore.
- `next.config.ts` — added `images.remotePatterns` allowing `*.supabase.co/storage/v1/object/public/**`, required for `next/image` to load the Supabase-hosted photos. **Remember: changes to `next.config.ts` need a dev server restart, they don't hot-reload.**

**Bug found & fixed — PostreSQL/PostgREST batched-insert gotcha:** `scripts/seed.mjs`'s `gallery_images` insert had rows with inconsistent keys (some had `caption`, some didn't, relying on the column's `default ''`). PostgREST does **not** apply column defaults per-row for keys absent from only *some* objects in a single batched insert array — it sends `NULL` for the missing key on those rows instead, which violated the `not null` constraint and silently failed the whole insert (table ended up with 0 rows, no visible error at seed-script call site since the error wasn't checked). Fixed by making every row in a batched insert include the exact same keys explicitly (`caption: ""` added to every row), and added error-checking (`throw` on error) to both the `menu_items` and `gallery_images` insert calls in `seed.mjs` so this class of bug can't silently pass again. **Takeaway for any future bulk-insert code (admin panel or scripts): always pass identical keys across every row in one batched Supabase insert, or do per-row inserts if the shape genuinely varies.**

**Verified:** `npx tsc --noEmit` and `npx eslint src --max-warnings=0` both clean. Confirmed via `get_page_text`/`read_page` in-browser (not just curl) that the homepage, `/menu`, and `/gallery` all render the real seeded Supabase content — menu items, prices, gallery photos (including captions "Good Food Great Moments" and "Storefront"), address/phone/email/hours all match the database, not the old static file.

**Also fixed in this pass:** an ESLint `react-hooks/set-state-in-effect` error across 5 admin CRUD pages (`menu-items`, `gallery`, `specials`, `testimonials`, `reservations`) — all use the same `useEffect(() => { load() }, [load])` fetch-on-mount pattern where `load` is an async `useCallback` that calls `setState`. This is a legitimate, standard pattern (data needs re-fetching after CRUD ops too, not just on mount), so each was fixed with a targeted `// eslint-disable-next-line react-hooks/set-state-in-effect` rather than restructuring — don't "fix" these by removing the comment without addressing why the rule fires.

**Noted but not fixed:** Next's dev-mode image optimizer occasionally threw transient 500s (`TimeoutError`) on the *first* cold-cache request for a Supabase-hosted image, self-healing once cached. Root cause looks like slow `sharp` resize of the large (~2–2.6MB) source PNGs combined with several concurrent first-time fetches in this sandboxed dev network — not a code bug, but worth compressing the source images (or at least the ones served through `next/image`) before a real production deploy, since a similar cold-cache moment will happen on every deploy/redeploy in production too until the CDN/image cache warms up.

## Current status
**Last completed step:** Phase 1 (public landing page + all pages, maroon-rebranded) + Phase 2 (Supabase schema + admin panel) + Phase 2b (public site now reads live from Supabase, not static data) are all done. Fully verified: typecheck clean, lint clean, and actual in-browser rendering confirmed for home/menu/gallery showing real database content, images included.

**Next action for resuming session, in priority order:**
1. **Still not personally verified: the admin login → dashboard → CRUD flow end-to-end.** I could not click through Supabase's external auth verify URL from this session's browser tool. Ask the user: did they get the invite email, set a password, and can they log into `/admin`? If something's broken, check `src/middleware.ts` cookie handling or `src/lib/supabase/server.ts` first.
2. Wire the `/contact` form to actually create a `reservations` row — right now it only opens a `mailto:` link, and the `reservations` table (which the admin panel's Reservations page reads from) has no way to receive real submissions yet. Note the schema mismatch to solve: `reservations` requires `reservation_date`/`reservation_time`/`people`, which the current generic contact form doesn't collect — this really wants a proper "Book a Table" form, not just a repurposed contact form.
3. No public testimonial submission path exists either — same gap as reservations, lower priority.
4. `NEXT_PUBLIC_SITE_URL` still not set in `.env.local` — needed so admin invite/password-reset emails redirect correctly once this isn't running on localhost.
5. Phase 3: Hostinger deploy — still fully unresolved, see the Tech Stack note near the top of this file about Node hosting requirements.
6. Minor polish: compress the source images used via Supabase Storage (~2–2.6MB PNGs) before real deploy — see the image-optimizer note above.

Run `npm run dev` from `D:\grandformhotel` to preview (default port 3000 may be occupied by a stale process — dev server auto-picks another port via `autoPort` in `.claude/launch.json`, check terminal output for the actual port; **if you change `next.config.ts`, restart the dev server** — it doesn't hot-reload). Useful scripts: `npm run db:migrate` (re-apply `supabase/schema.sql`, idempotent), `npm run db:seed` (⚠️ destructive — deletes and re-inserts `menu_items`/`gallery_images`, don't run casually once real admin edits exist), `npm run admin:invite -- <email>` (invite a new admin).
