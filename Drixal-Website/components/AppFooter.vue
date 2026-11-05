<script setup lang="ts">
const { t, isRtl } = useLocale()
const { isDark } = useTheme()
const { public: cfg } = useRuntimeConfig()
const year = new Date().getFullYear()

const companyLinks = computed(() => [
  { href: '#about', label: t.value.nav.about },
  { href: '#contact', label: t.value.nav.contact },
])

const exploreLinks = computed(() => [
  { href: '#platform', label: t.value.nav.products },
  { href: '#workspace', label: t.value.nav.blog },
  { href: '#modules', label: t.value.nav.services },
])

const email = ref('')

function onNewsletter(e: Event) {
  e.preventDefault()
  const value = email.value.trim()
  if (!value) return
  window.location.href = `mailto:${cfg.contactEmail}?subject=${encodeURIComponent('Newsletter signup')}&body=${encodeURIComponent(value)}`
  email.value = ''
}
</script>

<template>
  <footer class="relative border-t border-line/80 bg-mist">
    <div class="container-site pb-8 pt-14 md:pt-16">
      <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_.7fr_.7fr_1.2fr] lg:gap-8">
        <div>
          <img
            :src="isDark ? '/images/drixal-logo-white.png' : '/images/logo.png'"
            alt="Drixal"
            width="200"
            height="44"
            loading="lazy"
            class="h-11 w-auto sm:h-12"
          >
          <p class="mt-4 max-w-[34ch] text-sm leading-relaxed text-muted">
            {{ t.footer.brandBlurb }}
          </p>
        </div>

        <div>
          <h3 class="text-sm font-bold text-ink">{{ t.footer.company }}</h3>
          <ul class="mt-4 grid gap-2.5 text-sm text-muted">
            <li v-for="link in companyLinks" :key="link.href">
              <a :href="link.href" class="transition hover:text-ink">{{ link.label }}</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-bold text-ink">{{ t.footer.explore }}</h3>
          <ul class="mt-4 grid gap-2.5 text-sm text-muted">
            <li v-for="link in exploreLinks" :key="link.href">
              <a :href="link.href" class="transition hover:text-ink">{{ link.label }}</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-bold text-ink">{{ t.footer.newsletter.title }}</h3>
          <p class="mt-4 max-w-[36ch] text-sm leading-relaxed text-muted">
            {{ t.footer.newsletter.body }}
          </p>
          <form class="mt-5 flex items-center gap-2 rounded-full border border-line bg-surface p-1.5 shadow-sm" @submit="onNewsletter">
            <label class="sr-only" for="footer-email">{{ t.footer.newsletter.placeholder }}</label>
            <span class="ps-3 text-muted" aria-hidden="true">@</span>
            <input
              id="footer-email"
              v-model="email"
              type="email"
              required
              autocomplete="email"
              :placeholder="t.footer.newsletter.placeholder"
              class="min-w-0 flex-1 bg-transparent py-2 text-sm text-ink outline-none placeholder:text-muted/70"
            >
            <button
              type="submit"
              class="grid size-10 shrink-0 place-items-center rounded-full bg-navy text-white transition hover:bg-navy-2"
              :aria-label="t.footer.newsletter.submit"
            >
              <svg viewBox="0 0 24 24" class="size-4" :class="isRtl && 'rotate-180'" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      <div class="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-line/80 pt-6 text-sm text-muted">
        <span>© {{ year }} Drixal · {{ t.footer.rights }}</span>
        <div class="flex flex-wrap gap-x-5 gap-y-2">
          <a href="#contact" class="transition hover:text-ink">{{ t.footer.terms }}</a>
          <a href="#contact" class="transition hover:text-ink">{{ t.footer.privacy }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>
