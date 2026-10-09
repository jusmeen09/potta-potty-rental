# Star Portable Restrooms

A responsive, call-first local SEO website for `starportablerestrooms.com`, built with HTML, CSS, JavaScript, and Vite.

## Deployment: read this first

Cloudflare Pages serves **this repository's root directly**. There is no Vite build step in the deployment.

This has two consequences that are easy to get wrong:

- Anything that only exists in `public/` is **invisible in production**. `scripts/sync-static-root.mjs` copies the static files (favicons, manifest, `llms.txt`, `robots.txt`, `_redirects`, `_headers`) from `public/` to the root on every `npm run generate`, so both copies stay identical. `public/` still exists because `vite build` needs it.
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

**77 indexable pages, including Privacy and Terms.** Update the generators rather than editing generated HTML by hand — a regeneration will overwrite manual edits.

Shared header, footer, nav, icons, and schema partials live in `scripts/lib/site.mjs` so every generator emits identical chrome.

Guide content is split across `scripts/lib/blog-posts.mjs` and `blog-posts-extra{,2,3}.mjs`, combined and sorted by `order` in the first file. Order controls display; links are selected by relevance.

## Programmatic location pages

The 48 state pages are programmatic (Alaska and Hawaii do not currently have planning pages), and their value depends on being genuinely differentiated rather than name-swapped boilerplate. Per-state substance comes from `scripts/lib/state-data.mjs`:

- **OSHA jurisdiction.** State Plan or federal jurisdiction is explained with links to official OSHA information. Check the source before changing a jurisdiction claim.
- **Seasonal profile.** Six profiles (deep-freeze, cold-winter, humid-south, storm-coast, arid-heat, island-remote) provide weather and placement planning context.
- **Metro planning.** Five named markets per state. These are planning examples, not verified vendor coverage or staffed offices.

State pages still share a template. Add useful, verified local requirements and vendor information as they become available; do not invent local operations or publish more city pages by swapping names.

Compliance figures cite OSHA `29 CFR 1926.51`, `29 CFR 1910.141`, and the 2010 ADA Standards. Keep the "confirm with the authority having jurisdiction" caveat on any page that states a requirement.

## Internal linking rules

In-body article links are enforced at build time by `scripts/generate-blog-pages.mjs`, which **throws** rather than emitting a violation:

- Anchor text is descriptive and must be nonempty.
- The anchor phrase must already exist in the prose, so a link only lands where the sentence genuinely discusses the target.
- No article links the same URL twice.
- Links may point to any relevant existing article, regardless of display order.
- One contextual link per paragraph, so two planned anchors in the same paragraph will fail the build. Anchor matching is case-sensitive.

Service pages link to relevant planning guides. Related article cards use explicit topical relationships, including links back to earlier guides.

## SEO and tracking

- All 78 titles use the full brand, `| Star Portable Restrooms`. Do not shorten it to `| Star`.
- Unique titles, descriptions, canonicals, and one `h1` per page; heading levels never skip.
- Organization, WebSite, WebPage, Service, BlogPosting, Blog, CollectionPage, ItemList, Breadcrumb, and FAQ structured data.
- `llms.txt` describes the inquiry/referral model and distinguishes attributed regional estimates from vendor quotes.
- XML sitemap covering all 77 indexable URLs; page counts are derived from disk by the validators.
- Photos use versioned responsive WebP variants with intrinsic dimensions. `scripts/prepare-assets.mjs` produces minified, versioned CSS/JS, rewrites references, and removes obsolete generated bundles.
- Fonts are self-hosted variable WOFF2 files with `font-display: swap`; licenses are in `assets/fonts/`.
- Google Search Console HTML verification tag on the homepage.
- Microsoft Clarity project: `y3adfg123t`. Phone clicks emit a `phone_click` Clarity event and a dataLayer event with landing-page context. A click measures intent, not an answered or qualified lead.

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

## Business model and remaining external work

Star collects rental inquiries that may be passed or sold to local providers. It does not claim to own equipment or staffed state offices. Providers confirm coverage, prices, specifications, delivery, servicing, and rental contracts. Keep this distinction in copy, metadata, schema, and privacy disclosures.

- Configure the `www` hostname and HTTPS redirect in Cloudflare; repository redirects cannot repair a TLS handshake failure. See [SEO-FIXES.md](SEO-FIXES.md).
- Supply a real GA4 measurement ID if GA4 reporting is wanted. No placeholder tracking ID is installed. Call tracking and vendor outcome reporting are needed to measure qualified leads and sales.
- Add named experts, actual quote data, equipment sheets, reviews, or case studies only when verified and authorized. The editorial team byline does not imply an operator credential.
- Recheck production indexing, redirects, Clarity events, and mobile performance after deployment. Local tests do not verify live hosting or field Core Web Vitals.

## Asset updates

After adding or replacing source photos, run `npm run optimize:images` (Python with Pillow), then `npm run generate`. Commit the manifest and responsive assets so normal generation needs only Node. Use Node 20.19+ or 22.12+; the verification run used Node 24.21.

Do not add build dates as sitemap `lastmod` values. Leave them absent unless actual content modification dates are tracked.
