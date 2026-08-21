# Star Portable Restrooms — Homepage Image Prompts

These prompts are designed to look like genuine photographs taken for a local portable-restroom rental company—not luxury advertising or cinematic AI artwork. Generate images without company logos or readable text, then add the real Star Portable Restrooms logo during website editing.

Use `STYLE.md` as the visual-system reference. Images should support the documented typography, spacing, contrast, and call-first hierarchy rather than compete with headings or phone CTAs.

## Current Website Delivery Requirements

- Export production images as optimized WebP or AVIF files at the rendered dimensions whenever practical.
- Keep the homepage hero composition readable beneath the dark overlay and leave clear space for the call-first headline and phone CTA.
- Do not embed phone numbers, calls to action, logos, or other readable text inside generated images; HTML provides the accessible content.
- Preserve existing asset paths and descriptive alt text when replacing an image, or update the corresponding HTML references.
- **Keep every file under 200KB.** Six current assets exceed 250KB and `assets/homepage/festival.webp` is 424KB; the homepage LCP image is 332KB. Image weight is now the largest remaining Core Web Vitals cost on the site.
- Do not hand-write `width`/`height` attributes. `scripts/add-image-dimensions.mjs` reads them from the file header during `npm run generate`, so a replacement image is picked up automatically — but a replacement at different dimensions must be regenerated, not just dropped in.
- Decorative images take `alt=""`; images carrying meaning take a descriptive `alt`. Both are correct, and the audit distinguishes them — an empty `alt` on a decorative image is not a defect.
- Blog guides use `assets/blog/{slug-topic}.webp` at 16:9 for the article hero. State and service pages reuse the shared `assets/homepage/` set rather than needing per-page art.
- Keep the hero image lightweight because it is the homepage Largest Contentful Paint candidate; avoid oversized source files and unnecessary transparency.
- Use lazy loading for below-the-fold images. The hero image should remain eagerly discoverable and preloaded by the page.

## Best Method for Realistic Results

Whenever possible, begin with a real photograph of a local venue, construction site, service yard, or event setup and use image editing to add or replace only the portable restroom. Generating both the location and equipment from scratch is more likely to produce an artificial result.

## General Realism Rules

Add these requirements to every image generation:

- Photorealistic documentary photography, not an illustration, 3D render, luxury campaign, or cinematic advertisement.
- Prefer neutral overcast daylight or ordinary midday daylight. Avoid golden hour, sunset, blue hour, dramatic sun rays, and stylized cinematic lighting.
- Correct portable-restroom proportions, hinges, doors, vents, handles, wheels, plumbing, and materials.
- Include ordinary real-world imperfections: uneven gravel, patchy grass, tire marks, utility vehicles, safety cones, temporary fencing, extension cords, minor scuffs, dust near the base, fingerprints, and natural reflections where appropriate.
- People must have natural posture, skin texture, clothing folds, hands, and facial proportions.
- Do not repeat the same restroom color across the homepage. Rotate through graphite, deep olive, warm sand, muted terracotta, forest green, charcoal, and restrained burgundy.
- Treat the website colors as surrounding design accents only. The restroom itself does not need to be blue or white.
- Use ordinary American event venues, parks, construction sites, service yards, parking areas, and community spaces—not luxury resorts, vineyards, fantasy gardens, or perfectly landscaped estates.
- Frame images as if taken by a rental-company employee or local photographer using a normal DSLR or modern phone: standing eye level, 28–50mm equivalent lens, neutral exposure, moderate depth of field, and slightly imperfect composition.
- Keep background details recognizable. Avoid excessive bokeh or hiding AI mistakes behind heavy blur.
- Use different camera angles and settings, but keep the lighting ordinary and believable across the complete set.
- No generated logos, readable text, watermarks, exaggerated HDR, neon colors, plastic-looking surfaces, perfect symmetry, artificial blur, duplicate objects, warped architecture, malformed hands, or floating equipment.
- Every prompt should include: “The result must look like an unedited real photograph taken on location, not an AI-generated advertisement.”

---

## 1. Homepage Hero Image

```text
Use case: photorealistic-natural
Asset type: homepage hero image
Primary request: a deep-olive portable restroom installed at an ordinary outdoor event venue in the United States while workers finish setup
Scene/background: practical community event field with uneven gravel, patchy grass, temporary fencing, folding tables, utility carts, extension cords, trash and recycling bins, and workers completing setup in the distance
Subject: one deep-olive portable restroom with a gray roof positioned right of center, minor scuffs near the base, ordinary molded plastic, accurate door, hinges, vents, handle, and base; placement should look useful rather than decorative
Style/medium: realistic on-location photograph taken by a rental-company employee, not a campaign image
Composition/framing: wide horizontal composition at normal standing eye level, 35mm lens, slightly imperfect framing, generous open space on the left for website headline and buttons, restroom fully visible
Lighting/mood: neutral overcast midday daylight, soft ordinary shadows, natural exposure, no dramatic atmosphere
Color palette: deep olive, gray, faded green grass, gravel brown, practical black equipment, small muted red safety detail
Materials/textures: molded plastic with minor scuffs, dry and patchy grass, uneven gravel, temporary metal fencing, folded canvas, ordinary utility equipment
Quality: high
Constraints: physically accurate portable restroom; recognizable background details; natural perspective; no people looking at the camera; no logos; no text; no watermark; the result must look like an unedited real photograph taken on location, not an AI-generated advertisement
Avoid: luxury venue, countryside estate, golden hour, sunset, dramatic sun rays, privacy-screen styling, perfect landscaping, cinematic color grading, excessive bokeh, CGI appearance, illustration, excessive cleanliness, fake lens flare, duplicated doors, distorted restroom geometry, stock-photo posing
Aspect ratio: 4:3 or 3:2
```

## 2. Standard Portable Restroom Product Image

```text
Use case: product-mockup
Asset type: rental product card
Primary request: realistic environmental product photograph of a graphite portable restroom with a muted terracotta door panel
Scene/background: ordinary contractor storage yard with a chain-link fence, stacked lumber, pallets, traffic cones, a parked pickup truck, and weathered concrete
Subject: one standard graphite restroom with a terracotta door, dark roof, and physically accurate hardware, complete unit visible from roof to base
Style/medium: straightforward equipment photograph taken by a local rental-company employee
Composition/framing: off-center three-quarter angle at normal standing eye level, 45mm lens, full unit visible, slightly imperfect but useful framing
Lighting/mood: ordinary overcast afternoon daylight with neutral exposure and natural shadow detail
Materials/textures: matte molded polyethylene, lightly scuffed base, brushed metal hardware, weathered brick, dusty concrete, natural door seams and vents
Quality: high
Constraints: accurate proportions and hardware; recognizable background; no branding; no readable labels; no people; no watermark; the result must look like an unedited real photograph taken on location, not an AI-generated advertisement
Avoid: luxury location, dramatic lighting, heavy background blur, centered studio composition, glossy toy-like plastic, showroom reflections, impossible door shape, extra handles, floating product, seamless CGI background, excessive sharpening
Aspect ratio: 4:3
```

## 3. ADA-Accessible Portable Restroom Image

```text
Use case: product-mockup
Asset type: ADA-accessible rental product card
Primary request: realistic photograph of a wide warm-sand ADA-accessible portable restroom with a dark forest-green door
Scene/background: ordinary public park or county-fair entrance with a level paved path, temporary fencing, directional cones without readable text, patchy landscaping, and visitors naturally moving in the distance
Subject: one wide sand-colored accessible unit with a forest-green extra-wide door, charcoal roof, ground-level threshold, and accurate wider footprint
Style/medium: practical location photograph documenting an accessible rental setup
Composition/framing: diagonal three-quarter front view from normal standing height, 40mm lens, accessible route clearly visible, entire unit shown without staged symmetry
Lighting/mood: neutral midday daylight with ordinary soft shadows
Materials/textures: matte warm-sand plastic, dark green molded door, rubber threshold, metal hinges, textured paving, natural foliage
Quality: high
Constraints: believable accessible proportions and entry clearance; no generated text; no logo; no watermark; the result must look like an unedited real photograph taken on location, not an AI-generated advertisement
Avoid: luxury garden, perfect landscaping, golden-hour light, excessive bokeh, stairs, narrow doorway, incorrect wheelchair geometry, hospital-like setting, CGI, overly glossy plastic, warped walls, duplicated handles
Aspect ratio: 4:3
```

## 4. Luxury Restroom Trailer Image

```text
Use case: product-mockup
Asset type: restroom trailer product card
Primary request: a clean two-door restroom trailer prepared for a real outdoor wedding or corporate event
Scene/background: ordinary event venue with a rented tent, gravel parking area, folding chairs, utility cables, delivery van, and staff completing setup
Subject: a charcoal two-door restroom trailer with simple dark trim, practical steps, black handrails, realistic wheels, hitch, leveling supports, and standard exterior lights
Style/medium: realistic equipment photograph taken during event setup, not luxury hospitality advertising
Composition/framing: three-quarter side angle at normal standing height, complete trailer, wheels, steps, hitch, and surrounding setup visible, 35mm lens
Lighting/mood: neutral bright-overcast daytime light with realistic ground shadows and no dramatic reflections
Color palette: charcoal, dark gray, weathered timber, faded grass, ordinary event-tent fabric, small muted burgundy detail
Materials/textures: painted metal panels, rubber tires, brushed handrails, real grass, fabric tent material
Quality: high
Constraints: mechanically believable trailer; correct wheel placement; safe stairs and handrails; no logo; no readable text; no watermark; the result must look like an unedited real photograph taken on location, not an AI-generated advertisement
Avoid: vineyard, estate, mansion, cinematic rain, golden hour, decorative foreground foliage, luxury styling, impossible trailer length, missing hitch, floating stairs, excessive decorations, fake reflections, CGI rendering
Aspect ratio: 4:3
```

## 5. Portable Handwashing Station Image

```text
Use case: product-mockup
Asset type: handwashing station product card
Primary request: realistic photograph of a portable handwashing station ready for event use
Scene/background: ordinary outdoor food-event service area with pop-up canopies, folding tables, coolers, cardboard boxes, trash bins, and vendors working naturally in the background
Subject: one freestanding forest-green handwashing station with graphite basins, soap dispensers, paper towel holders, foot pumps, water tank body, and realistic plumbing details
Style/medium: straightforward candid photograph taken during event preparation
Composition/framing: three-quarter view from standing height, 50mm lens, full station visible with ordinary event activity around it
Lighting/mood: neutral diffused daylight under pop-up canopies with realistic mixed light and natural shadows
Color palette: forest green, graphite, warm timber, muted produce colors, small burgundy towel detail
Materials/textures: molded plastic, stainless fixtures, paper towels, rubber foot pumps, gravel and grass
Quality: high
Constraints: physically functional design; correct number of basins and pedals; no logo; no readable instructions; no watermark; the result must look like an unedited real photograph taken on location, not an AI-generated advertisement
Avoid: styled food-market advertisement, decorative herb foreground, cinematic mixed lighting, kitchen sink appearance, indoor bathroom, floating faucets, impossible plumbing, glossy CGI, sterile laboratory setting
Aspect ratio: 4:3
```

## 6. Construction Site Rental Image

```text
Use case: photorealistic-natural
Asset type: construction use-case card
Primary request: portable restrooms positioned safely at an active commercial construction site
Scene/background: realistic mid-size construction project with framing, safety fencing, stacked materials, gravel access road, and utility vehicles in the distance
Subject: two portable restrooms in contrasting muted colors—one clay-orange and one charcoal—placed on level ground near the worker access area, with one construction worker walking naturally nearby in proper safety gear
Style/medium: ordinary construction-progress photograph taken by a site superintendent or contractor
Composition/framing: wide horizontal image at normal standing height, restrooms beside the worker access area, active construction clearly visible behind them, 28mm lens
Lighting/mood: neutral midday or overcast daylight, ordinary shadows, productive working atmosphere
Materials/textures: dusty gravel, weathered lumber, concrete, safety vest fabric, molded plastic with light realistic dust near the base
Quality: high
Constraints: correct safety equipment; realistic work site; worker not posing; no logos; no readable signs; no watermark; the result must look like an unedited real photograph taken on location, not an AI-generated advertisement
Avoid: architecture-magazine polish, foreground framing tricks, dramatic long shadows, perfect organization, unsafe behavior, spotless construction site, dramatic action pose, deformed machinery, duplicated workers, fake hard hats, CGI, oversaturated colors
Aspect ratio: 16:10
```

## 7. Wedding and Private Event Image

```text
Use case: photorealistic-natural
Asset type: wedding use-case card
Primary request: a discreet portable restroom setup at a real outdoor wedding venue before the ceremony begins
Scene/background: ordinary rented event tent, folding chairs, simple floral arrangements, parked vendor vehicles, utility cables, grass with foot traffic, and staff completing setup
Subject: a deep-burgundy portable restroom with a charcoal roof placed beside a simple rented privacy screen along a gravel path
Style/medium: candid location photograph taken by an event coordinator, not editorial wedding advertising
Composition/framing: normal standing eye level, 50mm lens, restroom visible in context with the tent and setup activity, slightly imperfect natural composition
Lighting/mood: neutral overcast afternoon daylight, natural exposure, no dusk, lantern glow, or sunset color grading
Color palette: burgundy, charcoal, ordinary tent fabric, natural grass, simple wood, restrained flowers
Materials/textures: real fabric tent, wood signage without readable text, flowers, gravel path, painted trailer panels or molded restroom surface
Quality: high
Constraints: believable working event venue; natural staff or guests; no one looking at camera; no logos; no readable text; no watermark; the result must look like an unedited real photograph taken on location, not an AI-generated advertisement
Avoid: woodland luxury venue, sailcloth canopy, candles, lanterns, dusk, golden hour, fantasy wedding, excessive flowers, perfect symmetry, glowing CGI lights, fake people, distorted faces or hands
Aspect ratio: 4:5 or 3:4
```

## 8. Festival and Community Event Image

```text
Use case: photorealistic-natural
Asset type: festival use-case card
Primary request: an organized row of portable restrooms serving a busy community festival
Scene/background: daytime local festival with food tents, families, event fencing, trash and recycling stations, and a small stage softly visible in the distance
Subject: an organized row of portable restrooms in muted forest green, warm sand, charcoal, and restrained burgundy, including one wider accessible unit, positioned on level ground with clear pedestrian access
Style/medium: realistic local-news or community-event photograph
Composition/framing: normal eye-level diagonal view showing the restroom row, pedestrian route, food tents, fencing, and families in context, 35mm lens, moderate depth of field
Lighting/mood: ordinary midday daylight under light cloud cover, lively but unstaged community atmosphere
Materials/textures: grass with foot traffic, temporary fencing, canvas tents, realistic plastic units, ordinary casual clothing
Quality: high
Constraints: diverse natural crowd; realistic spacing and scale; accessible route visible; no logos; no readable banners; no watermark; the result must look like an unedited real photograph taken on location, not an AI-generated advertisement
Avoid: foreground flags used as cinematic framing, dramatic patches of sunlight, giant concert crowd, empty sterile field, duplicated people, warped faces, floating tents, oversaturated colors, CGI, staged stock-photo smiles
Aspect ratio: 4:5 or 3:4
```

## 9. Cleaning and Service Quality Image

```text
Use case: photorealistic-natural
Asset type: “Why choose Star” service-quality section
Primary request: a trained portable-restroom service technician carefully cleaning and restocking a unit
Scene/background: organized service yard or quiet event site during daylight, service truck softly blurred in the background
Subject: one technician wearing practical charcoal work clothing and protective gloves, naturally servicing a deep-olive portable restroom, wiping an interior surface and restocking paper supplies, door open enough to show realistic interior details
Style/medium: straightforward service-documentation photograph taken by a coworker
Composition/framing: medium side view at standing eye level, technician shown in profile with hands clearly performing the task, restroom interior and service supplies recognizable, 50mm lens
Lighting/mood: ordinary daylight entering through the open door, realistic interior shadows, no dramatic light falloff
Materials/textures: realistic gloves, cleaning cloth, molded plastic interior, paper supplies, lightly worn work clothing
Quality: high
Constraints: hygienic work practice; believable restroom interior; no visible waste; no logo; no readable chemicals; no watermark; the result must look like an unedited real photograph taken on location, not an AI-generated advertisement
Avoid: reflected truck used as an artistic detail, close cinematic doorway framing, smiling posed worker, medical hazmat suit, spotless CGI interior, excessive cleaning foam, distorted hands, extra fingers, dramatic studio lighting
Aspect ratio: 4:5
```

## 10. Delivery and Setup Process Image

```text
Use case: photorealistic-natural
Asset type: rental-process section
Primary request: portable restrooms being professionally delivered and positioned at an outdoor site
Scene/background: level gravel area beside a park or event venue, delivery truck parked safely with open service area and cones placed appropriately
Subject: two uniformed delivery workers using proper equipment to position a muted terracotta portable restroom, with graphite and olive units secured on the truck behind them
Style/medium: ordinary delivery-documentation photograph taken by a dispatcher or site contact
Composition/framing: normal standing eye-level three-quarter view showing workers, unit, truck, ramp, straps, cones, and placement area clearly, 35mm lens
Lighting/mood: neutral overcast or midday daylight, efficient and calm work atmosphere without stylized warm light
Materials/textures: truck metal, straps, molded plastic, gravel, safety gloves, ordinary work uniforms
Quality: high
Constraints: realistic lifting and transport method; safe behavior; no workers posing; no company logos; no readable license plate or text; no watermark; the result must look like an unedited real photograph taken on location, not an AI-generated advertisement
Avoid: brand-campaign composition, low cinematic angle, foreground straps used artistically, warm sunrise light, carrying the unit by hand unrealistically, floating equipment, unsafe lifting, oversized truck, distorted workers, CGI rendering, dramatic action scene
Aspect ratio: 16:9
```

## 11. Final Call-to-Action Background Image

```text
Use case: photorealistic-natural
Asset type: wide homepage call-to-action background
Primary request: a clean portable restroom rental site at the end of a successful outdoor event setup
Scene/background: ordinary community-event grounds after setup with pop-up tents, folding tables, temporary fencing, patchy grass, gravel service path, utility carts, and a normal tree line
Subject: two portable restrooms—one charcoal and one deep olive—placed on the right near the service path, with a delivery vehicle and setup workers visible in the distance
Style/medium: realistic wide location photograph taken by an event organizer
Composition/framing: extra-wide panoramic frame at normal standing height, large usable open area on the left for website text, complete event setup recognizable, 35mm lens, no artistic foreground framing
Lighting/mood: neutral overcast afternoon daylight with natural cloud detail and ordinary ground shadows
Color palette: charcoal, olive, faded tent colors, gravel gray, patchy green grass, small muted red safety accent
Materials/textures: realistic grass, gravel, canvas tents, molded plastic, natural sky gradients
Quality: high
Constraints: image must remain readable behind website overlay; no logo; no text; no watermark; the result must look like an unedited real photograph taken on location, not an AI-generated advertisement
Avoid: modern architectural venue, sculptural landscaping, pavilions, timber screen, hills arranged for composition, post-rain reflections, dramatic sunset, purple sky, fantasy lighting, excessive bokeh, perfect symmetry, CGI, overprocessed HDR
Aspect ratio: 21:9
```

## Recommended Generation Order

1. Homepage hero image
2. Four rental product images
3. Construction, wedding, and festival use-case images
4. Cleaning and service-quality image
5. Delivery process image
6. Final call-to-action background

Generate two or three variations of each image and select the version with the most accurate equipment geometry, most ordinary lighting, most recognizable real-world background details, and least staged composition. Reject versions that look beautiful but implausible.
