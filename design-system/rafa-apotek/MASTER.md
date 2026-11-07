# Rafa Apotek — Design System (Master)

**Direction:** Modern Editorial Pharmacy: premium, trustworthy, clean, contemporary, product-focused.
**Status:** Revision 3. **Approved** by the project owner with the final decisions recorded in §10. No application component or style code has been modified. The only repo change outside this folder is the approved `@fontsource-variable/inter` dependency in `package.json` and `package-lock.json`.
**Scope:** Visual layer only. All copy, product names, prices and images are frozen (see §11).

> Precedence: if `design-system/rafa-apotek/pages/<page>.md` exists, it overrides this file for that page. Otherwise this file applies. No page overrides exist yet.

---

## 0. Verified Technical Baseline

Everything below was checked against the repository, not assumed.

| Area | Verified fact | Source |
|---|---|---|
| Framework | Next.js `^16.4.5`, App Router, React `^19.3.1`, TypeScript, `reactStrictMode: true` | `package.json`, `next.config.mjs` |
| Styling | Tailwind CSS `^4.3.5` via `@tailwindcss/postcss`; `@import "tailwindcss"` in `globals.css`. No `tailwind.config`, no `@theme` block yet. | `postcss.config.mjs`, `src/app/globals.css` |
| Icons | `lucide-react` only | `package.json` |
| Display font | **PP Museum** (local OTF): Light 300, Regular 400, Ultrabold 800, each with italic. **No 500, 600 or 700.** Loaded through `next/font/local` as `--font-pp-museum` (`src/app/fonts.ts`), and also declared with `@font-face` in `globals.css`. | `public/Fonts/`, `fonts.ts` |
| Body font | **`@fontsource-variable/inter` `^5.3.0` is now installed** (approved) but **not yet imported or used**. CSS family name is `Inter Variable`. The live site still renders the system stack (`-apple-system, …, Roboto, Helvetica, Arial`) until implementation. `globals.css` overrides `.font-sans` and `.font-serif`. | `package.json`, `node_modules/@fontsource-variable/inter/index.css` |
| Mono font | No mono font is loaded. `font-mono` resolves to Tailwind's default system monospace stack. No Geist or other mono package exists. | `node_modules`, `src` |
| Dark mode | No `dark:` variants anywhere. The site uses per-section `data-theme="light\|dark"` attributes, which `Navbar` reads at runtime to switch its own styling. | grep `dark:`, `Navbar.tsx` |
| Routes | `/` (`src/app/page.tsx`), `/katalog-obat`, `/produk/[id]` (id resolves by `number`, `slug`, or number without leading zeros). Only these three. | `src/app/**` |
| Data | 12 products in `src/data/products.ts` (`PRODUCTS_DATA`), static, no backend/API. | `products.ts` |
| Cart | `CartContext` (client): `cartItems`, `cartOpen`, `checkoutOpen`, `addToCart` (also opens the drawer), `updateQuantity`, `removeItem`, `clearCart`, `totalCartCount`. Persists to `localStorage` key `rafa_apotek_cart`. `CartDrawer` and `CheckoutModal` are mounted inside `CartProvider`, so they are global. | `CartContext.tsx` |
| Checkout | **Client-side simulated flow, not WhatsApp.** Steps `shipping → payment → complete`. Form state is pre-filled with demo values. Submit clears the cart. Shipping is Rp 35.000 unless subtotal ≥ Rp 750.000. No payment or order API. | `CheckoutModal.tsx` |
| Overlays | `AssessmentModal`, `VideoModal`, `CheckoutModal` use native `<dialog>` with `showModal()`. `CartDrawer` is a custom fixed overlay with Escape handling and body scroll lock. | components |
| External links | WhatsApp `wa.me/6282308230823` (prefilled text) in Navbar, Hero, CtaBanner and Footer. | components |
| Images | `public/images/`: `apotek.jpg`, `hero-portrait.png`, `service-1/2/3.png`. `next.config` also allows `images.unsplash.com`. | `public/`, `next.config.mjs` |
| In-page anchors | `#products`, `#layanan`, `#tentang` (used by Navbar and Footer; keep these ids). | `Products`, `HowItWorks`, `WhyVerdant` |

**Corrections to Revision 1.** It said checkout was a WhatsApp generator (wrong), recommended Inter and Geist Mono as if they were available (Inter has since been installed with approval; Geist Mono is not used), and used `dark:` classes (the project has none). The skill's auto-generated Neumorphism style, Atkinson Hyperlegible font and cyan palette were also removed. This revision fixes all of these.

---

## 1. Principles

1. **Restraint.** Flat surfaces, 1px borders, almost no shadow, almost no radius, no gradients, no glass.
2. **Typography carries the brand.** PP Museum for statements, Inter for everything functional.
3. **Product first.** Imagery and price are the loudest things on commerce screens. Chrome stays quiet.
4. **One system.** Every surface (page, card, form, modal, drawer) uses the same tokens in §2–§5.
5. **Pharmacy practicality.** Prescription status, price, stock-adjacent info and the cart are always legible and reachable.

**Avoid:** neumorphism, embossed or inset shadows, glassmorphism, gradient buttons, hover-lift animations, pill-everything shapes, neon accents, emoji as icons, decorative blobs.

---

## 2. Color

### 2.1 Tokens (single source of truth)

| Token | Hex | Role |
|---|---|---|
| `--color-brand` | `#0D2B24` | **Primary brand.** Dark bands (hero, "tentang", footer), headings on light, brand mark. |
| `--color-brand-hover` | `#123A31` | Hover on brand-filled surfaces. |
| `--color-bg` | `#FBF9F5` | **Primary page background** (warm alabaster). |
| `--color-surface` | `#FFFFFF` | **Cards, forms, modals, drawer, elevated surfaces.** |
| `--color-surface-sunken` | `#F3EFE6` | Alternate section band, input wells, table headers, inactive chips. |
| `--color-ink` | `#111C18` | Body text and headings on light. 16.6:1 on `--color-bg`. |
| `--color-ink-muted` | `#4B5E57` | Secondary text. 6.57:1 on `--color-bg`, 6.91:1 on white. |
| `--color-ink-faint` | `#6B7C75` | Placeholders, timestamps. 4.19:1 on bg, so use only at ≥18px or non-essential. |
| `--color-interactive` | `#059669` | **Primary interactive.** Primary button fill, links' underline/icon, focus ring, active tab/chip, progress fill, checkbox/radio. |
| `--color-interactive-hover` | `#047857` | Hover/pressed for interactive fills; also **text-safe emerald** on light (5.48:1 on white, 5.22:1 on bg). |
| `--color-on-interactive` | `#111C18` | Label on emerald fill (4.63:1). **White on `#059669` is only 3.77:1 and fails AA for normal text.** |
| `--color-accent-on-dark` | `#34D399` | Emerald used as text/icon on `--color-brand` (7.87:1). `#059669` on brand is only 4.01:1, so do not use it for text there. |
| `--color-ink-on-dark` | `#FBF9F5` | Text on brand bands (14.39:1). |
| `--color-ink-muted-on-dark` | `#A9BDB5` | Secondary text on brand bands (7.66:1). |
| `--color-danger` | `#B91C1C` | **Semantic only:** prescription-required (Rx) badges, form/validation errors, destructive actions. 6.47:1 on white. Never a decorative, brand, hover, or accent color. |
| `--color-danger-bg` | `#FEF2F2` | Background for Rx badge / error summary. |
| `--color-border` | `rgba(13,43,36,0.10)` | Hairlines: cards, dividers, table rules. |
| `--color-border-strong` | `rgba(13,43,36,0.24)` | Inputs, secondary button outlines. |
| `--color-border-on-dark` | `rgba(251,249,245,0.16)` | Hairlines on brand bands. |
| `--color-overlay` | `rgba(13,43,36,0.60)` | Modal/drawer scrim (no backdrop blur). |

Rules:
- Emerald `#059669` is for interaction and verified or positive state only. Never for large decorative areas.
- Red (`--color-danger`, `--color-danger-bg`) is permitted **only** for: (1) prescription-required badges and notices, (2) errors and validation, (3) destructive actions such as removing a cart item. Red must always be paired with text or an icon. It is never used for decoration, section backgrounds, links, or hover states.
- No other hues. No cyan, lime, mint-to-yellow gradients, navy or purple.
- Contrast figures above were computed (WCAG relative luminance), not estimated.

### 2.2 Section rhythm (homepage)

| Section | Band | Notes |
|---|---|---|
| Navbar | `bg` / `brand` (adaptive) | See §5.1. |
| Hero + SocialProof | `brand` (dark) | Existing `data-theme="dark"` wrapper retained. |
| Products | `bg` | `data-theme="light"`. Cards on white. |
| HowItWorks | `surface-sunken` | `data-theme="light"`. |
| WhyVerdant ("tentang") | `brand` | `data-theme="dark"`. |
| CtaBanner | `surface` with top and bottom hairlines | `data-theme="light"`. |
| Footer | `brand` (one step deeper via hairline, not a new hue) | `data-theme="dark"`. |

This replaces five unrelated section colors with three: alabaster, sunken alabaster and botanical.

### 2.3 Old → new mapping (for implementation)

| Currently hard-coded | Replace with |
|---|---|
| `#0e2334`, `#091a24`, `#08141d`, `#0b1c28`, `#0b1c2b`, `#091f2c` | `--color-brand` (or `--color-ink` when used as text on light) |
| `#f5fbdf`, `#daf5f0`, `#e8f5d6` | `--color-bg` / `--color-surface-sunken` |
| `#5beba6`, `#6ae7b8`, `#5eeaa4`, gradient to `#aef773`/`#a4f57c`/`#7beea6` | `--color-interactive` (flat, no gradient) |
| `emerald-*`, `teal-*`, `slate-*`, `rose-*` utilities | the semantic tokens above |

---

## 3. Typography

### 3.1 Families

| Role | Family | Status |
|---|---|---|
| Display headings, editorial statements, pull quote, prices in cards | **PP Museum** | Installed. Use only weights **300, 400, 800** (and italics). Do not specify 500/600/700. |
| Body, navigation, buttons, forms, labels, UI | **Inter** via `@fontsource-variable/inter` (self-hosted, variable weight) | **Installed.** Load with `import '@fontsource-variable/inter';` in `src/app/layout.tsx`. Family: `'Inter Variable'`. Fallback stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`. |
| Pharmaceutical metadata (BPOM no., dosage, storage temp, size, category eyebrows, step numbers) | **System monospace** (`ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`) | Already what `font-mono` renders. No install needed. |

Atkinson Hyperlegible is removed. There is no accessibility requirement specific to it. Accessibility is handled through size, contrast and spacing (§3.2, §9).

### 3.2 Scale

Minimum rendered text is 12px, and only for mono metadata. Body is never below 14px.
(Existing code frequently uses `text-xs` for body copy; the redesign raises it.)

| Token | Family / weight | Size (mobile → desktop) | Line height | Tracking | Use |
|---|---|---|---|---|---|
| `display` | PP Museum 300 | 40px → 64px (`clamp(2.5rem, 5vw, 4rem)`) | 1.05 | -0.02em | Hero h1 |
| `h2` | PP Museum 400 | 32px → 48px | 1.12 | -0.015em | Section titles |
| `h3` | PP Museum 400 | 22px → 28px | 1.2 | -0.01em | Step titles, modal titles, product page h1 |
| `h4` | PP Museum 400 | 18px → 20px | 1.3 | 0 | Product card title |
| `quote` | PP Museum 300 italic | 18px → 22px | 1.5 | 0 | Pharmacist quote only |
| `price` | PP Museum 400 | 18px → 24px (card) / 32px (detail) | 1.1 | 0 | Prices |
| `body-lg` | Inter 400 | 17px → 18px | 1.6 | 0 | Hero subtitle, lead paragraphs |
| `body` | Inter 400 | 15px → 16px | 1.6 | 0 | Default text |
| `body-sm` | Inter 400 | 14px | 1.5 | 0 | Secondary text, card meta |
| `label` | Inter 500 | 13px → 14px | 1.3 | 0.01em | Form labels, nav links, buttons |
| `eyebrow` | Mono 500, uppercase | 12px | 1.3 | 0.14em | Section eyebrows, category tags, BPOM/dosage metadata |

Rules:
- Headings use PP Museum 400, with 300 for `display`. Never faux-bold. Weight 800 is reserved for rare numeric emphasis, not headings.
- Inter 400 for reading text, 500 for labels and buttons, 600 sparingly. No `font-light` body copy; weight 300 on Inter at small sizes reduces legibility.
- Max line length 65ch for paragraphs.
- Uppercase only for `eyebrow`.
- Use `text-wrap: balance` on headings and `pretty` on paragraphs where supported.

---

## 4. Spacing, Radius, Elevation, Motion

### 4.1 Spacing (4px base)

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96`

| Context | Value |
|---|---|
| Container | `max-width: 1280px`, centered |
| Gutters | 20px (<640) · 32px (≥640) · 48px (≥1024) |
| Section vertical padding | 64px (<768) · 96px (≥768) |
| Section header → content | 48px |
| Card padding | 16px mobile · 20px desktop |
| Grid gap | 16px mobile · 24px desktop |
| Min gap between adjacent tap targets | 8px |

### 4.2 Radius (deliberately small)

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 4px | Badges, tags, checkboxes |
| `--radius-md` | 6px | Buttons, inputs, selects, chips |
| `--radius-lg` | 8px | Cards, images, modals |
| `--radius-full` | 9999px | Cart-count badge and status dot only |

No `rounded-2xl`, `rounded-3xl` or pill buttons. The drawer has no radius (edge-attached).

### 4.3 Elevation

| Token | Value | Use |
|---|---|---|
| `--shadow-none` | none | Default for cards. Separation comes from 1px `--color-border`. |
| `--shadow-sm` | `0 1px 2px rgba(13,43,36,0.06)` | Card hover, sticky bars |
| `--shadow-md` | `0 12px 32px -16px rgba(13,43,36,0.28)` | Modal, drawer, open menus |

No inset shadows, no dual-light-source shadows, no glow, no `backdrop-blur`.

### 4.4 Motion

- Duration 150–200ms, `ease-out`. Animate only `opacity`, `transform`, `color`, `border-color`, `background-color`.
- Card hover changes border color and adds `--shadow-sm`. **No translate-lift and no image zoom beyond `scale(1.02)`.**
- Drawer and modal: 200ms fade and slide (≤16px).
- Remove the pinging status-dot animation in the footer, or make it static.
- `@media (prefers-reduced-motion: reduce)`: disable all non-essential transitions.

---

## 5. Components

All components use only tokens from §2–§4. Examples below are the reference CSS. Implementation in Tailwind v4 should map to the same tokens via an `@theme` block (§8).

### 5.1 Navigation (`Navbar`)

- **Structure:** fixed, full-width bar, height 64px (56px on mobile), `max-width` container inside. Replaces the floating glass pill. Same links, same order, same WhatsApp CTA, same cart button and count, same mobile menu toggle.
- **Adaptive theme preserved:** `Navbar` still samples `[data-theme]` under the bar and switches between:
  - light: background `--color-bg`, bottom border `--color-border`, text `--color-ink`
  - dark: background `--color-brand`, bottom border `--color-border-on-dark`, text `--color-ink-on-dark`
- **Links:** Inter 500 14px; hover underlines in `--color-interactive` (on dark: `--color-accent-on-dark`); no pill backgrounds.
- **Brand mark:** the existing plus icon in a 24px square, `--radius-sm`, fill `--color-interactive`, glyph `--color-brand`; wordmark in PP Museum 400 at 20px. This is a visual restyle only. No text changes.
- **Cart button:** 44×44 hit area, icon 20px, count badge `--radius-full`, 18px min, fill `--color-interactive`, text `--color-on-interactive`.
- **Mobile menu:** full-width panel under the bar, `--color-surface` on light or `--color-brand` on dark, 1px border, rows min-height 48px, no blur.

```css
.nav { position: fixed; inset: 0 0 auto 0; height: 64px; z-index: 50;
  background: var(--color-bg); border-bottom: 1px solid var(--color-border);
  color: var(--color-ink); }
.nav[data-on="dark"] { background: var(--color-brand);
  border-bottom-color: var(--color-border-on-dark); color: var(--color-ink-on-dark); }
```

### 5.2 Buttons

All buttons: Inter 500, 14px, `--radius-md`, **min-height 44px**, no gradient, no shadow, `cursor: pointer`, visible focus ring (§5.9).

| Variant | Light surface | Dark surface |
|---|---|---|
| **Primary** | bg `--color-interactive`, text `--color-on-interactive`; hover bg `--color-interactive-hover` with text `#FFFFFF` (5.48:1) | bg `--color-accent-on-dark`, text `--color-brand`; hover lighten 6% |
| **Secondary** | transparent, 1px `--color-border-strong`, text `--color-ink`; hover bg `--color-surface-sunken` | transparent, 1px `--color-border-on-dark`, text `--color-ink-on-dark`; hover bg `rgba(251,249,245,0.08)` |
| **Tertiary (text link)** | text `--color-interactive-hover`, underline offset 4px; arrow icon allowed | text `--color-accent-on-dark` |
| **Icon button** | 44×44, transparent, hover bg `--color-surface-sunken`; needs `aria-label` | same on dark tokens |
| **Destructive** | text `--color-danger`, hover bg `--color-danger-bg` | n/a |

```css
.btn { min-height: 44px; padding: 0 20px; border-radius: var(--radius-md);
  font: 500 14px/1 var(--font-sans); transition: background-color 150ms ease-out, border-color 150ms ease-out; }
.btn-primary { background: var(--color-interactive); color: var(--color-on-interactive); border: 1px solid transparent; }
.btn-primary:hover { background: var(--color-interactive-hover); color: #FFFFFF; }
.btn-secondary { background: transparent; color: var(--color-ink); border: 1px solid var(--color-border-strong); }
.btn-secondary:hover { background: var(--color-surface-sunken); }
.btn:disabled { opacity: .5; cursor: not-allowed; }
```

### 5.3 Product card (`Products`, catalog, related products)

- Surface `--color-surface`, 1px `--color-border`, `--radius-lg`, padding 16/20px, no resting shadow.
- Hover: border → `--color-border-strong`, `--shadow-sm`. Whole card stays clickable (existing `router.push`), and the add-to-cart control keeps its `stopPropagation`.
- **Image:** keep the existing aspect ratio (409/240), `--radius-md`, background `--color-surface-sunken`, `object-cover`.
- **Rx badge** (only when `prescriptionRequired`): top-left on image, `--color-danger-bg` fill, 1px `--color-danger` border, text `--color-danger`, mono 11–12px, `--radius-sm`. Text unchanged ("RESEP DOKTER").
- **Price:** moves out of the floating image pill. Shown once, in PP Museum `price` at the card footer. The image pill is removed to avoid duplicate price display. (Same string, same data.)
- **Category:** `eyebrow` style, no filled pill.
- **Title:** `h4`, 2-line clamp, `--color-ink`.
- **Footer:** top hairline, price left, "Tambah"/"+ Keranjang" secondary button right (44px min height, icon + existing label text).
- Grid: 1 col → 2 (≥640) → 4 (≥1024) (matches the current breakpoints).

### 5.4 Forms (`CheckoutModal`, `AssessmentModal`, catalog search)

- Label above field, Inter 500 13–14px, `--color-ink`.
- Input/select/textarea: height 44px, padding 0 12px, bg `--color-surface`, 1px `--color-border-strong`, `--radius-md`, text `--color-ink` 16px (prevents iOS zoom), placeholder `--color-ink-faint`.
- Focus: border `--color-interactive` + 2px ring (§5.9). No glow.
- Error: border and message in `--color-danger`, with an icon, message below the field. Never color alone.
- Selection chips (Assessment, catalog categories): `--radius-md`, 1px `--color-border-strong`; selected = bg `--color-interactive`, text `--color-on-interactive` (not color-only: also shows a check icon).
- Inside dark modal panels: not used. **All modals use the light surface** (see §5.6) so forms share one visual language.

### 5.5 Cart drawer (`CartDrawer`)

- Anchored right, width `min(440px, 100vw)`, bg `--color-surface`, left border `--color-border`, `--shadow-md`, no radius.
- Scrim `--color-overlay`, no blur. Existing behavior kept: Escape closes, body scroll locked, click scrim closes.
- Header: `eyebrow` + `h3`, 44px close icon button.
- Line items: 72px square thumbnail (`--radius-md`), `h4` title, price, quantity stepper (44px buttons, 1px border, `--radius-md`), remove icon button. Rows separated by hairlines.
- Free-shipping progress (existing Rp 750.000 threshold): 4px track `--color-surface-sunken`, fill `--color-interactive`, flat.
- Sticky footer: top hairline, subtotal row (`price` style), full-width primary button (existing label).
- Empty state keeps existing text; icon stroke `--color-ink-faint`.

### 5.6 Modals (`CheckoutModal`, `AssessmentModal`, `VideoModal`)

- Keep native `<dialog>` and `showModal()`.
- Panel: `--color-surface`, 1px `--color-border`, `--radius-lg`, `--shadow-md`, max-width 560px (video 720px), padding 24px mobile / 32px desktop, max-height 90vh scroll.
- `::backdrop`: `--color-overlay`, no blur.
- Header: `eyebrow` (existing text) → `h3` (existing text). Close button 44×44 top-right.
- Step indicator (checkout 2 segments, assessment 4): segments 3px high, `--color-border` inactive, `--color-interactive` active, **flat, no gradient, square ends**.
- Order summary box: `--color-surface-sunken`, `--radius-md`, no border.
- Success/complete state: check icon in `--color-interactive`, `h3`, primary button.
- Modals move from dark to light panels. This is the deliberate consistency decision: one form and surface language across the site.

### 5.7 Catalog toolbar (`/katalog-obat`)

- Search: standard input (§5.4) with leading search icon.
- Sort: standard select (§5.4).
- Category filter: horizontal chip row (scrollable on mobile, `scroll-snap`, no scrollbar styling needed), selected state per §5.4. Behavior unchanged (`categorySlug` filter, query on title/category/indication/ingredients, 4 sort modes).
- Result count and breadcrumb in `body-sm` / `eyebrow`.
- Page header band: `--color-bg` with bottom hairline (replaces the dark gradient header).

### 5.8 Product detail (`/produk/[id]`)

- Two-column ≥1024 (image 7 / info 5), stacked below. Image `--radius-lg`, 1px border.
- Metadata (size, BPOM, dosage, storage, ingredients): definition-list rows with `eyebrow` keys and `body` values, hairline separators. These are the pharmaceutical-metadata use of mono.
- Quantity stepper and add-to-cart: stepper (§5.5) + primary button, sticky bottom bar on mobile (surface, top hairline).
- Rx notice: `--color-danger-bg` panel, 1px `--color-danger`, icon + existing text.
- Share control: tertiary/icon button with existing "copied" state.
- Related products: same product card (§5.3), 4-up.
- Not-found state: same layout language, centered, light surface.

### 5.9 Focus, states, accessibility primitives

- `:focus-visible`: `outline: 2px solid var(--color-interactive); outline-offset: 2px`. On dark surfaces use `--color-accent-on-dark`. Never `outline: none` without a replacement.
- Hover states never rely on color alone for meaning.
- Disabled: 50% opacity + `not-allowed`.
- Icons: Lucide, stroke 1.75–2, 16/20/24px. Decorative icons `aria-hidden`. Icon-only buttons need `aria-label` (existing labels kept).

### 5.10 Homepage section specs

| Section | Layout notes (no copy changes) |
|---|---|
| **Hero** | 12-col grid, copy 7 / image 5, on `--color-brand`. **Image treatment (verified, see §5.11):** remove the radial vignette and all four edge-fade overlays. Show `apotek.jpg` crisp, with no tint and no gradient, in a `--radius-lg` frame with a 1px `--color-border-on-dark` border and `object-cover object-center`. Trust-badge strip becomes inline mono `eyebrow` row with hairline separators (same three strings). Two buttons: primary (WhatsApp link) + secondary (opens VideoModal), as now. |
| **SocialProof** | Single hairline above, centered caption (`body-sm`, muted), brand names in mono `eyebrow` style, evenly spaced. |
| **Products** | Header: `eyebrow`, `h2`, right-aligned paragraph + tertiary link "Jelajahi semua produk". Cards per §5.3. |
| **HowItWorks** | 3 columns divided by hairlines (no circles): mono step number, `h3`, `body`. |
| **WhyVerdant** | Centered `h2` + paragraph; stats as 3 columns with vertical hairlines using `display`-scale numerals; pharmacist quote as an unboxed `quote` with hairline above and avatar initials square (`--radius-sm`). |
| **CtaBanner** | One row: `eyebrow` + `h2` left, primary + secondary buttons right. |
| **Footer** | 12-col, link columns as `body-sm` with `eyebrow` headings, hairline above the legal row. Remove the oversized "Rafa" watermark (decorative). Social icons as 44px icon buttons. |

### 5.11 Hero image verification (completed)

The existing `public/images/apotek.jpg` (800×560, landscape, bright and high-key) was composited on `#0D2B24` in three treatments using the real file. Mockups: `scratch/hero-A-crisp.png`, `hero-B-vignette.png`, `hero-C-tinted.png` in the conversation artifact folder.

| Option | Result | Verdict |
|---|---|---|
| **A. Crisp, framed, no overlays** | The photo's teal ceiling and warm wood sit harmoniously on the green. Product shelving reads clearly, and the white counter and cross signage stand out. Bright image on a dark band gives a strong editorial focal point. | **Chosen** |
| B. Old vignette and edge fades, recolored green | Image becomes dim and muddy, product detail is lost, and the faded edges read as the soft decorative effect this system removes. | Rejected |
| C. Crisp plus 14% botanical tint | Visually near-identical to A. The tint is too subtle to justify extra markup. | Rejected (A is simpler) |

Implementation notes and risks:
- **Resolution:** the source is 800×560 px. The hero column is portrait (~4:5) and up to ~520 CSS px wide, so the image is cropped to about 70% of its width and upscaled. It is acceptable at 1× and will look soft on high-density screens. Recommendation: keep the file as-is now, and ask the content team for a higher-resolution replacement (≥1600 px wide) later. Do not substitute images in this redesign.
- **Alternative crop:** if the portrait crop cuts the pharmacy counter awkwardly in the browser, switch the frame to 4:3 on the `lg` layout. Re-verify in the browser during Phase 4.
- **Final check:** confirm in a real browser at 375, 768, 1024 and 1440 during the hero phase, including the `priority` loading behavior.

---

## 6. Layout & Responsive

| Breakpoint | Width | Behavior |
|---|---|---|
| base | 375 | 1-col; nav compact (56px) with menu; buttons full-width in stacked CTAs; modals full-width minus 16px |
| `sm` | 640 | 2-col product grid; gutters 32px |
| `md` | 768 | Inline nav links; 3-col steps; section padding 96px |
| `lg` | 1024 | 4-col product grid; 7/5 hero and PDP splits; gutters 48px |
| `xl` | 1280 | Container max reached |
| wide | 1440 | Verify only. No layout change beyond centered container. |

Rules: mobile-first, no horizontal scroll at 375px (chip rows excepted), tap targets ≥44px with ≥8px gaps, images keep intrinsic aspect ratios (no layout shift), `next/image` with correct `sizes` retained.

---

## 7. Content & Behavior Freeze

The redesign changes **appearance only**.

- No text edits: headings, paragraphs, labels, button text, product names, prices, categories, alt text, `aria-label`s stay exactly as they are. Any copy the new layout seems to need (for example new captions, empty states, alt text) is requested from the content team instead of written here.
- Images unchanged (`/images/*`). Cropping and frame styling are allowed; replacing or editing files is not.
- Preserve: the three routes; `data-theme` attributes and `Navbar` detection; ids `products`, `layanan`, `tentang`; WhatsApp URLs; `localStorage` key `rafa_apotek_cart`; `CartContext` API; native `<dialog>` usage; product `slug`/`number` resolution; click-through cards with add-to-cart `stopPropagation`; catalog filter/sort logic; checkout step logic and shipping thresholds.
- Dependencies: the only approved addition is `@fontsource-variable/inter` (already installed). No other packages without approval.

---

## 8. Token Implementation Reference (Tailwind v4)

Planned for `src/app/globals.css` after approval (illustrative; **not yet applied**):

```css
@import "tailwindcss";

@theme {
  --color-brand: #0D2B24;
  --color-brand-hover: #123A31;
  --color-bg: #FBF9F5;
  --color-surface: #FFFFFF;
  --color-surface-sunken: #F3EFE6;
  --color-ink: #111C18;
  --color-ink-muted: #4B5E57;
  --color-ink-faint: #6B7C75;
  --color-interactive: #059669;
  --color-interactive-hover: #047857;
  --color-on-interactive: #111C18;
  --color-accent-on-dark: #34D399;
  --color-ink-on-dark: #FBF9F5;
  --color-ink-muted-on-dark: #A9BDB5;
  --color-danger: #B91C1C;
  --color-danger-bg: #FEF2F2;
  --color-border: rgb(13 43 36 / 0.10);
  --color-border-strong: rgb(13 43 36 / 0.24);
  --color-border-on-dark: rgb(251 249 245 / 0.16);
  --color-overlay: rgb(13 43 36 / 0.60);

  --font-display: var(--font-pp-museum), Georgia, "Times New Roman", serif;
  --font-sans: 'Inter Variable', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;

  --shadow-sm: 0 1px 2px rgb(13 43 36 / 0.06);
  --shadow-md: 0 12px 32px -16px rgb(13 43 36 / 0.28);
}

@layer base {
  html { background: var(--color-bg); color: var(--color-ink); font-family: var(--font-sans); }
  ::selection { background: var(--color-interactive); color: var(--color-on-interactive); }
  :focus-visible { outline: 2px solid var(--color-interactive); outline-offset: 2px; }
}
```

Implementation notes:
- Keep `next/font/local` for PP Museum and remove the duplicate `@font-face` blocks from `globals.css` (one loading path). Fix the `.font-serif`/`.font-sans` overrides so they point at `--font-display`/`--font-sans`.
- `<body>` and `<main>` currently hard-code background and selection hexes. Move these to tokens.
- Inter: add `import '@fontsource-variable/inter';` to `src/app/layout.tsx`. The package ships `@font-face` rules for the `Inter Variable` family, so no `next/font` wrapper is needed for it.

---

## 9. Accessibility Checklist (WCAG 2.2 AA)

- [ ] Text contrast ≥4.5:1 (large text ≥3:1) using only the §2.1 pairings. White text never sits on `#059669`.
- [ ] Non-text UI (borders of inputs, icons, focus ring) ≥3:1: `--color-border-strong` on `--color-surface` is sufficient for inputs. Verify at implementation.
- [ ] Visible `:focus-visible` on every interactive element, not obscured by the fixed nav (`scroll-margin-top: 80px` on anchored sections).
- [ ] Tap targets ≥44px (WCAG minimum is 24px; 44px is this system's standard).
- [ ] Native `<dialog>` focus handling kept. Escape closes the drawer. Focus returns to the trigger.
- [ ] Rx status conveyed by text + icon, not color alone. Selected chip conveyed by check icon.
- [ ] `prefers-reduced-motion` respected.
- [ ] Heading order h1 → h2 → h3 per page. One h1 per page.
- [ ] Verified at 375 / 768 / 1024 / 1440.

---

## 10. Resolved Decisions (Approved)

| # | Decision | Outcome |
|---|---|---|
| 1 | Body/UI font | **`@fontsource-variable/inter`** (installed, `^5.3.0`). Family `Inter Variable`. |
| 2 | Display font | **PP Museum** (local) for display headings and editorial elements (quote, large numerals, prices). |
| 3 | Primary button | **Emerald `#059669` fill with dark ink `#111C18` label**; hover `#047857` with white label. |
| 4 | Dark sections | **Botanical `#0D2B24`** for the hero, About ("tentang") and footer. |
| 5 | Hero image | **Verified visually** (§5.11): crisp framed image, no overlays or tint. Re-verify in browser during the hero phase. |
| 6 | Red usage | **Semantic only** (Rx badges, errors, destructive actions). Never decorative (§2.1). |
| 7 | Light modal panels | Approved as part of the overall direction (§5.6). |
| 8 | Card price placement | Footer only; floating image price pill removed (§5.3). Approved as part of the overall direction. |

---

## 11. Observations for the Content/Product Team (not changed by this redesign)

- Checkout form is pre-filled with demo values (`Budi Santoso`, `budi@example.com`, …) and the flow is simulated, with no real order or payment backend.
- Cart subtotal parsing falls back to Rp 500.000 if a price string has no digits (`CartDrawer`, `CheckoutModal`).
- Footer social links and legal links use `href="#"`. Footer link `Konsultasi Apoteker` points to `#layanan`.
- Navbar `onOpenAssessment` prop is declared but unused. `AssessmentModal` is only opened from `CtaBanner`.
- Component named `WhyVerdant` is a leftover name from a previous brand (file/component naming only; copy is Rafa Apotek).
- Several strings make claims (e.g., encryption level, counts) that the content team should confirm.
