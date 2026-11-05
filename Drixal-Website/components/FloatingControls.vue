<script setup lang="ts">
const { t } = useLocale()
const { isDark, toggleTheme } = useTheme()

const showTop = ref(false)

function onScroll() {
  showTop.value = window.scrollY > 420
}

function scrollToTop() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <!-- Theme: right side -->
  <button
    type="button"
    class="pointer-events-auto fixed end-3 bottom-6 z-[70] grid size-9 place-items-center rounded-full border border-brand-blue/40 bg-surface text-brand-blue shadow-[0_8px_22px_-10px_rgba(10,75,255,.45)] transition duration-300 hover:-translate-y-0.5 hover:border-brand-cyan/55 hover:text-brand-cyan focus-visible:ring-2 focus-visible:ring-brand-cyan sm:end-4 sm:bottom-8"
    :aria-label="isDark ? t.floating.lightMode : t.floating.darkMode"
    :title="isDark ? t.floating.lightMode : t.floating.darkMode"
    @click="toggleTheme"
  >
    <svg
      v-if="isDark"
      viewBox="0 0 24 24"
      class="size-4"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
    <svg
      v-else
      viewBox="0 0 24 24"
      class="size-4"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a7 7 0 0 0 11.5 11.5z" />
    </svg>
  </button>

  <!-- Scroll to top: left side -->
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-2 scale-90"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-2 scale-90"
  >
    <button
      v-if="showTop"
      type="button"
      class="pointer-events-auto fixed start-3 bottom-6 z-[70] grid size-9 place-items-center rounded-full border border-brand-blue/40 bg-surface text-brand-blue shadow-[0_8px_22px_-10px_rgba(10,75,255,.45)] transition duration-300 hover:-translate-y-0.5 hover:border-brand-cyan/55 hover:text-brand-cyan focus-visible:ring-2 focus-visible:ring-brand-cyan sm:start-4 sm:bottom-8"
      :aria-label="t.floating.scrollTop"
      :title="t.floating.scrollTop"
      @click="scrollToTop"
    >
      <svg
        viewBox="0 0 24 24"
        class="size-4"
        fill="none"
        stroke="currentColor"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  </Transition>
</template>
