# Star Portable Restrooms

A responsive, call-first local SEO website for `starportablerestrooms.com`, built with HTML, CSS, JavaScript, and Vite.

## Deployment: read this first

Cloudflare Pages serves **this repository's root directly**. There is no Vite build step in the deployment.

This has two consequences that are easy to get wrong:

- Anything that only exists in `public/` is **invisible in production**. `scripts/sync-static-root.mjs` copies the static files (favicons, manifest, `llms.txt`, `robots.txt`, `_redirects`) from `public/` to the root on every `npm run generate`, so both copies stay identical. `public/` still exists because `vite build` needs it.
- `npm run build` and `dist/` are useful for local verification but are **not what ships**. Committed root HTML is what ships.

Automatic deployments are enabled on the `main` branch. Production is `main`; pushing to it deploys.

## URL structure

Every indexable URL ends in a trailing slash. Cloudflare normalises URLs in two directions, which previously produced a mix of conventions:

- `/about.html` → 301 → `/about/` (via `_redirects`)
- `/service` → 308 → `/service/` (Cloudflare adds the slash for directories)

All content pages are therefore directories with an `index.html`, including About, Blog, and Contact. Canonicals, sitemap entries, and internal links all point at the trailing-slash form, so no internal link passes through a redirect.

`404.html` is served with a real 404 status for unmatched URLs and is `noindex`. It is deliberately excluded from the sitemap.

## Design system

Use [STYLE.md](STYLE.md) as the source of truth for typography, spacing, CTA treatment, responsive behavior, and cross-page consistency. Shared font families and type sizes are defined as tokens in `:root` in `styles.css`; avoid adding page-specific values for the same content role.

## Primary conversion

- Customer-facing phone number: `+1 (833) 920-1299`
- Telephone link: `tel:+18339201299`
- Calls are the primary conversion path; forms are not required for rental inquiries.

## Pages

| Section | URL pattern | Count | Source |
| --- | --- | --- | --- |
| Homepage | `/` | 1 | `index.html` (hand-maintained) |
| About | `/about/` | 1 | `about/index.html` (hand-maintained) |
| Contact | `/contact/` | 1 | `contact/index.html` (hand-maintained) |
| Blog hub | `/blog/` | 1 | `blog/index.html` — prose hand-maintained, card grid and ItemList synced by `scripts/sync-blog-hub.mjs` |
| Rental guides | `/blog/{slug}/` | 17 | `scripts/generate-blog-pages.mjs` |
| Service hub | `/service/` | 1 | `scripts/generate-service-pages.mjs` |
| Service pages | `/service/{slug}/` | 4 | `scripts/generate-service-pages.mjs` |
| Location hub | `/location/` | 1 | `scripts/generate-location-pages.mjs` |
| State pages | `/location/{state}/` | 48 | `scripts/generate-location-pages.mjs` |

**75 indexable pages.** Update the generators rather than editing generated HTML by hand — a regeneration will overwrite manual edits.

Shared header, footer, nav, icons, and schema partials live in `scripts/lib/site.mjs` so every generator emits identical chrome.

Guide content is split across `scripts/lib/blog-posts.mjs` and `blog-posts-extra{,2,3}.mjs`, combined and sorted by `order` in the first file. The combined array must remain a valid topological order.

## Programmatic location pages

The 48 state pages are programmatic (Alaska and Hawaii are not currently serviced), and their value depends on being genuinely differentiated rather than name-swapped boilerplate. Per-state substance comes from `scripts/lib/state-data.mjs`:

- **OSHA jurisdiction.** 21 states run their own OSHA-approved State Plan enforcing construction sanitation (Cal/OSHA, MIOSHA, TOSHA and so on); 6 have State Plans covering public employees only; the remaining 23 are federal OSHA. Each page states which applies and what it means for `29 CFR 1926.51`.
- **Seasonal profile.** Six profiles (deep-freeze, cold-winter, humid-south, storm-coast, arid-heat, island-remote) drive the demand and servicing narrative.
- **Metro coverage.** Five named markets per state, each with a distinct framing.

Measured 5-gram similarity across all 1,128 state-page pairs (48 states): **58.2% mean, 68.7% peak**. Average length **1,777 words**. If you add differentiation, re-measure — do not assume.

Compliance figures cite OSHA `29 CFR 1926.51`, `29 CFR 1910.141`, and the 2010 ADA Standards. Keep the "confirm with the authority having jurisdiction" caveat on any page that states a requirement.

## Internal linking rules

In-body article links are enforced at build time by `scripts/generate-blog-pages.mjs`, which **throws** rather than emitting a violation:

- Anchor text is 1–2 words.
- The anchor phrase must already exist in the prose, so a link only lands where the sentence genuinely discusses the target.
- No article links the same URL twice.
- Article-to-article links may only point **forward** through the `order` field in `scripts/lib/blog-posts.mjs`, which makes cycles structurally impossible.
- One contextual link per paragraph, so two planned anchors in the same paragraph will fail the build. Anchor matching is case-sensitive.

Commercial pages are terminal: they never link back into the article set, so link equity flows toward pages that convert.

## SEO and tracking

- All 78 titles use the full brand, `| Star Portable Restrooms`. Do not shorten it to `| Star`.
- Unique titles, descriptions, canonicals, and one `h1` per page; heading levels never skip.
- Organization, WebSite, WebPage, Service, BlogPosting, Blog, CollectionPage, ItemList, Breadcrumb, and FAQ structured data.
- `llms.txt` at the root states the call-first pricing model so assistants cite the phone number instead of inventing figures.
- XML sitemap covering all 75 indexable URLs; page counts are derived from disk by the validators.
- Every `<img>` carries intrinsic `width`/`height`, stamped by `scripts/add-image-dimensions.mjs`, to keep CLS at zero.
- Fonts load via `preconnect` plus a parallel stylesheet link. Do not move them back into a CSS `@import` — that serialises HTML → CSS → font CSS → font files.
- Google Search Console HTML verification tag on the homepage.
- Microsoft Clarity project: `y3adfg123t`.

## Local development

```bash
npm install && npm run dev
```

`predev` regenerates every generated page first. Vite serves on `http://localhost:5173/`.

## Generation and validation

Regenerate service pages, blog guides, location pages, the 404, the static-root sync, and image dimensions:

```bash
npm run generate
```

Validate titles, descriptions, canonicals, headings, schema, FAQ parity, call paths, sitemap URLs, and homepage location links:

```bash
npm run validate
```

Run only the sitewide JSON-LD audit with `npm run validate:schema`, or only the location-page SEO audit with `npm run validate:locations`. Both derive expected page counts from what is on disk, so adding a page cannot silently skip the sitemap or the schema audit.

```bash
npm run build
```

`prebuild` runs generation and validation before writing `dist/`.

## Known gaps

- **Author identity.** Guides are bylined to "Star Portable Restrooms Rental Desk", not a named person. E-E-A-T rewards a real, credentialed author; supply one and the byline plus `author` schema can become a `Person`.
- **No `LocalBusiness` schema.** The site uses `Organization` with nationwide `areaServed`, correct for a national booking desk. If physical depots exist, `LocalBusiness` with geo coordinates would unlock local pack visibility.
- **Analytics.** Clarity only. There is no GA4 property, so call conversions are not attributed to landing pages or organic queries.
- **Image weight.** Six assets exceed 250KB; `assets/homepage/festival.webp` is 424KB and the homepage LCP image is 332KB. Compressing these is the largest remaining LCP win.
- **Node version.** Local builds run Node 20.14.0; Vite 7 wants 20.19+ or 22.12+. It works, but it is unsupported.

## Launch checklist

- Confirm Clarity receives sessions after deployment.
- Keep the verification and Clarity tags in the page `<head>`.
- Confirm the phone number, business email, hours, and coverage statements before launch.
- Replace placeholder social links and publish the required privacy and legal pages.
- Test call links, navigation, responsive layouts, schema, sitemap, and Core Web Vitals after deployment.
