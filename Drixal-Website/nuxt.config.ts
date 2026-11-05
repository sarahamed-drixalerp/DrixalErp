// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  typescript: { strict: true, typeCheck: false },

  modules: ['@nuxtjs/tailwindcss', '@vueuse/motion/nuxt'],
  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      // Where page content comes from. `{lang}` is replaced with `en` / `ar`.
      // Today: static JSON from /content (see server/routes/data). Later: the dashboard API, e.g.
      // NUXT_PUBLIC_CONTENT_URL=https://api.drixal.com/website/content?lang={lang}
      contentUrl: '/data/content.{lang}.json',
      // POST target for the contact form (JSON body). Empty → falls back to mailto:.
      contactEndpoint: '',
      contactEmail: 'info@drixal.com',
      /**
       * Spline.design scene (.splinecode) for the hero 3D canvas.
       * Export from https://spline.design → Export → Code → Vanilla JS.
       * Optional: add a Number variable named `scroll` (0–1) in the scene for scroll sync.
       * Empty string → CSS glass-card fallback only.
       */
      // Empty = show the Earth 3D scene. Set NUXT_PUBLIC_SPLINE_SCENE to override.
      splineScene: '',
    },
  },

  vite: {
    optimizeDeps: { include: ['@splinetool/runtime'] },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en', dir: 'ltr' },
      title: 'Drixal ERP — AI-ready enterprise workspace',
      meta: [
        { name: 'description', content: 'Drixal ERP connects people, projects, documents, sales, finance and operations in one bilingual, role-based enterprise workspace.' },
        { name: 'theme-color', content: '#050b1f' },
      ],
      // Prevent light-flash before Vue hydrates the saved theme.
      script: [{ key: 'drixal-theme-init', src: '/theme-init.js' }],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap' },
        { rel: 'preload', as: 'image', href: '/images/drixal-logo-white.png' },
        { rel: 'preload', as: 'image', href: '/images/drixal-hero.png' },
      ],
    },
  },

  // Fully static output: `npm run generate` → .output/public
  // Content JSON is served by server/routes/data/[file].ts and prerendered to static files.
  nitro: { prerender: { routes: ['/', '/data/content.en.json', '/data/content.ar.json'] } },

  tailwindcss: { cssPath: false, viewer: false },
})
