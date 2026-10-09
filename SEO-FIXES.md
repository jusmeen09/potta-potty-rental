# SEO fixes — October 9, 2026

Changes are prepared locally. Production has not been deployed or re-audited with these changes.

## Completed in the repository

- Corrected the business representation: Star receives inquiries that may be passed or sold to local rental providers. Removed invented fleet, delivery performance, operator experience, and availability guarantees. Updated About, Contact, Privacy, Terms, shared disclosures, and Organization/Service descriptions. Existing phone number and hours are preserved.
- Repaired the four broken inline image references. Generated responsive, compressed WebP variants; retained originals and representative-photo disclosures. Added matching responsive hero preloads, self-hosted licensed fonts, minified versioned CSS/JS, and cache rules.
- Removed artificial build dates from sitemap modification fields. Sitemap, schema, and local build now include all 77 indexable pages, including Privacy and Terms. The noindex 404 remains excluded.
- Added vendor specification/utility/access/service/quote checklists to the four equipment pages, corrected mismatched helper labels, and linked relevant planning guides.
- Replaced chronological related articles with explicit topical links and removed the two-word anchor limit. Improved search titles for the service hub, sizing guide, and equipment comparison.
- Added attributed Northeast price examples to daily/monthly guides, clearly distinguished from Star rates. No Star prices or verified quotes were invented.
- Added manufacturer-specific weight evidence and qualified operating-load guidance; clarified local permission/permit checks, indoor-placement responsibilities, and the limitations of the BLS salary category.
- Added an attributed event-sizing table with stated assumptions and a worked example, separate from workplace sanitation rules. Added a printable rental checklist.
- Replaced arbitrary city-route claims with neutral planning questions. Corrected California weather guidance and linked official jurisdiction resources. State listings explicitly do not imply a staffed office or verified vendor coverage.
- Improved footer/button contrast and first-viewport content visibility. Phone clicks now reach the existing Clarity integration and dataLayer with page context. A click does not establish that a call was answered or a lead sold.
- Added validation for metadata, internal links/fragments, stylesheet and inline image references, image attributes, responsive variants, schema, disclosures, and sitemap coverage. Updated generation/development documentation.

## Validation

`npm run build` regenerates the served root, validates all 77 sitemap pages, and produces the local Vite build successfully. Root pages are the actual deployment input; `dist/` is only a local verification artifact.

Browser checks cover the home, About, Contact, location directory, California, restroom trailer, and daily-price pages at 375px and 1440px, plus the short desktop viewport. Checked overflow, heading hierarchy, image loading, local asset responses, menu/FAQ interactions, and call-click event dispatch. No broken images, local missing resources, or horizontal overflow were detected.

The latest local homepage Lighthouse run scored 96 performance, 100 accessibility, and 100 SEO (mobile simulation: LCP 2.55 seconds, CLS 0.002, TBT 12 ms). Local Lighthouse is a lab check, not a live Core Web Vitals measurement. Recheck production after deploying. Title-length warnings on five states are preview opportunities; a 60-character title limit is not a Google requirement.

## Cloudflare action still needed: www HTTPS

The original audit observed HTTPS failure on `www.starportablerestrooms.com`. A redirect in repository `_redirects` cannot repair a TLS handshake failure. Cloudflare dashboard access is needed; these settings have not been changed.

Follow [Cloudflare's www-to-apex instructions](https://developers.cloudflare.com/pages/how-to/www-redirect/):

1. Confirm the apex custom domain works on the Pages project.
2. Create a Bulk Redirect list: source `www.starportablerestrooms.com`, target `https://starportablerestrooms.com`, permanent status 301. Preserve query strings, enable subpath matching, and preserve the path suffix.
3. Create and enable the Bulk Redirect rule using that list.
4. Configure the proxied `www` DNS record according to the documented setup (A record to `192.0.2.1`). Review existing records first; do not create a conflicting duplicate. Confirm Cloudflare has an active certificate covering the hostname.
5. Verify HTTPS on both root and nested www URLs redirects to the equivalent apex URL with its path and query intact. Check HTTP as well. Recheck sitemap and canonical URLs on the apex.

## Measurement and content work that needs real inputs

- GA4 is not installed because no measurement ID was supplied. Existing Clarity phone-click events can be checked after deployment. Connecting answered-call, qualified-lead, vendor acceptance, and lead-sale outcomes needs a real call-tracking/CRM workflow.
- State pages retain shared planning material. Prioritize markets with actual vendor agreements and useful local information. Add dated, official city/venue permit and access sources where relevant. Do not create more city pages through name substitution alone.
- Publish actual model sheets, quote examples, supplier coverage, team credentials, reviews, original photos, or case studies only when verified and authorized. These are remaining content opportunities, not data that can responsibly be fabricated for this lead-selling site.
- Keep new comparison, use-case, and local guides tied to customer questions and Search Console evidence. Search Console access is required to assess impressions, rankings, query overlap, and which pages Google actually indexes.
- After deployment, verify live redirects/assets/schema, sitemap submission and indexing, tracking receipt, and mobile performance. The fixes do not guarantee rankings or lead volume.
