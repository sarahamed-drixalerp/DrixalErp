<script setup lang="ts">
const { t, toggleLocale, isRtl } = useLocale()
const { isDark } = useTheme()

const open = ref(false)
const activeSection = ref('home')
const headerRef = ref<HTMLElement | null>(null)

const links = computed(() => [
  { id: 'home', href: '#home', label: t.value.nav.home },
  { id: 'platform', href: '#platform', label: t.value.nav.products },
  { id: 'workspace', href: '#workspace', label: t.value.nav.blog },
  { id: 'services', href: '#services', label: t.value.nav.services },
  { id: 'about', href: '#about', label: t.value.nav.about },
  { id: 'contact', href: '#contact', label: t.value.nav.contact },
])

function onScroll() {
  const sectionIds = ['contact', 'about', 'services', 'workspace', 'platform', 'home']
  const scrollPos = window.scrollY + 140

  if (window.scrollY < 80) {
    activeSection.value = 'home'
    return
  }

  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (el && el.offsetTop <= scrollPos) {
      activeSection.value = id
      break
    }
  }
}

function handleNavClick(link: { id: string; href: string }, _e?: Event) {
  activeSection.value = link.id
  open.value = false
}

function onClickOutside(e: MouseEvent) {
  if (open.value && headerRef.value && !headerRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('click', onClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('click', onClickOutside)
})
</script>

<template>
  <header
    ref="headerRef"
    class="relative z-50 pointer-events-none px-3 pt-3 sm:px-6 sm:pt-4 md:pt-5"
  >
    <div
      class="pointer-events-auto relative mx-auto flex w-full max-w-[1240px] items-center justify-between rounded-full bg-transparent px-3.5 py-2 sm:px-6 sm:py-2.5 transition-all duration-300"
    >
      <!-- Left: Logo -->
      <a
        href="#home"
        class="flex shrink-0 items-center gap-2 ps-1 pe-2 sm:pe-4 transition hover:opacity-90"
        aria-label="Drixal home"
        @click="handleNavClick({ id: 'home', href: '#home' }, $event)"
      >
        <img
          :src="isDark ? '/images/drixal-logo-white.png' : '/images/logo.png'"
          alt="Drixal"
          width="200"
          height="50"
          class="h-10 sm:h-11 md:h-12 w-auto object-contain"
        >
      </a>

      <!-- Middle: Nav Links (desktop) -->
      <nav
        class="hidden lg:flex items-center gap-1 xl:gap-2"
        aria-label="Main navigation"
      >
        <a
          v-for="l in links"
          :key="l.id"
          :href="l.href"
          class="rounded-full px-3.5 py-1.5 text-[14px] transition-all duration-200"
          :class="activeSection === l.id
            ? 'bg-mist font-bold text-ink shadow-none'
            : 'font-medium text-muted hover:bg-mist hover:text-ink'"
          @click="handleNavClick(l, $event)"
        >
          {{ l.label }}
        </a>
      </nav>

      <!-- Right: Language toggle + mobile menu -->
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="inline-flex h-8 items-center justify-center rounded-full bg-brand-blue/10 px-3 text-xs font-bold text-brand-blue transition hover:bg-brand-blue hover:text-white"
          :class="isRtl ? 'font-sans' : 'font-ar'"
          :aria-label="t.langSwitchLabel"
          @click="toggleLocale(); open = false"
        >
          {{ t.langSwitch }}
        </button>

        <button
          type="button"
          class="lg:hidden grid size-9 place-items-center rounded-full text-ink hover:bg-mist transition-colors"
          :aria-label="t.menu"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          @click="open = !open"
        >
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path v-if="!open" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <!-- Mobile dropdown menu -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 translate-y-2 scale-98"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-2 scale-98"
      >
        <div
          v-if="open"
          id="mobile-nav"
          class="absolute inset-x-0 top-[calc(100%+10px)] rounded-3xl border border-line bg-surface p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col gap-1.5 pointer-events-auto lg:hidden"
        >
          <a
            v-for="l in links"
            :key="l.id"
            :href="l.href"
            class="flex items-center px-4 py-2.5 rounded-2xl text-[15px] font-semibold transition-colors"
            :class="activeSection === l.id
              ? 'bg-mist text-ink font-bold'
              : 'text-muted hover:bg-mist hover:text-ink'"
            @click="handleNavClick(l, $event)"
          >
            {{ l.label }}
          </a>

        </div>
      </Transition>
    </div>
  </header>
</template>
