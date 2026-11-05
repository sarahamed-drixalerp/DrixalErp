# Drixal Website

Nuxt 3 + Tailwind CSS + TypeScript marketing site, built as a fully static export.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # static site → .output/public (deploy this folder anywhere)
npm run typecheck
```

## Editing content

Page content (hero, services, projects, stats) lives in:

- `content/site.en.json`
- `content/site.ar.json`

The shape is defined in `types/content.ts`. Only the first 6 projects are shown. A project with no `thumbnailUrl` gets a branded placeholder. Interface labels (buttons, form messages, section titles) are in `i18n/ui.ts`.

## Moving to the dashboard API

The site fetches `NUXT_PUBLIC_CONTENT_URL`, replacing `{lang}` with `en` or `ar`. By default this is `/data/content.{lang}.json`, which `server/routes/data/[file].ts` serves and the build prerenders to static files. When the dashboard API exists, have it return the `SiteContent` shape and set:

```
NUXT_PUBLIC_CONTENT_URL=https://api.example.com/website/content?lang={lang}
NUXT_PUBLIC_CONTACT_ENDPOINT=https://api.example.com/website/contact
```

With `npm run generate`, content is fetched at build time and embedded in the page. Rebuild (or trigger a deploy hook) after editing content. Switching language fetches the other file on demand.

The contact form POSTs a `ContactPayload` as JSON. If `NUXT_PUBLIC_CONTACT_ENDPOINT` is empty, it opens the visitor's email app addressed to `NUXT_PUBLIC_CONTACT_EMAIL` instead.

## Spline 3D hero

The sticky hero can load a [Spline](https://spline.design/) scene via `@splinetool/runtime`.

1. In Spline: **Export → Code → Vanilla JS** and copy the `.splinecode` URL.
2. Set `NUXT_PUBLIC_SPLINE_SCENE` (see `.env.example`).
3. Optional: add a Number variable named `scroll` (0–1) in the scene — the hero pushes scroll progress into it.

While the scene loads (or if the URL is empty / fails / reduced-motion), the CSS glass-card 3D fallback (`Hero3DScene`) stays visible.

## Structure

| Path | Purpose |
| --- | --- |
| `pages/index.vue` | Page composition |
| `components/HeroSection.vue` | Sticky 3D-scroll hero (copy beats + scene) |
| `components/HeroSpline.client.vue` | Spline.design canvas |
| `components/Hero3DScene.vue` | CSS glass-card 3D fallback |
| `components/ServicesSection.vue`, `ServiceCard.vue`, `ServiceIcon.vue` | Services grid with hover glow |
| `components/ProjectsSection.vue`, `ProjectCard.vue` | Top-6 portfolio |
| `components/ContactSection.vue`, `ContactForm.vue`, `AppToast.vue` | Validated form, spinner, toast |
| `composables/usePortfolioData.ts` | Content fetching (`useAsyncData`, loading and error states) |
| `composables/useContactForm.ts` | Validation and submission |
| `composables/useLocale.ts` | EN/AR + RTL switch |
| `utils/motion.ts` | `@vueuse/motion` scroll-reveal preset |

`_legacy/index.html` is the previous single-file static site, kept for reference.
