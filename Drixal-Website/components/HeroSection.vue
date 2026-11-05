<script setup lang="ts">
/**
 * Product carousel. Each slide pairs Drixal copy with its own illustration:
 * AI cards, the ERP globe, everyday workspace, and industry packs.
 */
const { t, isRtl } = useLocale()
const slides = computed(() => t.value.heroSlides)
const index = ref(0)
const hover = ref(false)
const reduced = ref(false)
const drift = ref(0)

const active = computed(() => slides.value[index.value] ?? slides.value[0]!)
const workspace = computed(() => active.value.scene === 'workspace')
const industry = computed(() => active.value.scene === 'industry')
const centered = computed(() => workspace.value || industry.value)

const { public: cfg } = useRuntimeConfig()
const splineScene = computed(() => (cfg.splineScene || '').trim())
const useSpline = computed(() => !!splineScene.value && !reduced.value && active.value.scene === 'platform')
const splineReady = ref(false)
const splineFailed = ref(false)

function go(i: number) {
  const n = slides.value.length
  if (!n) return
  index.value = ((i % n) + n) % n
  arm()
}
function next() { go(index.value + 1) }
function prev() { go(index.value - 1) }

let timer = 0
let raf = 0

function arm() {
  window.clearInterval(timer)
  if (reduced.value || hover.value) return
  timer = window.setInterval(() => {
    if (document.visibilityState !== 'visible') return
    next()
  }, 7000)
}

function tick(time: number) {
  if (!reduced.value && active.value.scene === 'platform') {
    drift.value = (Math.sin(time / 4200) + 1) / 2 * 0.42
  }
  raf = requestAnimationFrame(tick)
}

function onKey(e: KeyboardEvent) {
  const forward = isRtl.value ? 'ArrowLeft' : 'ArrowRight'
  const back = isRtl.value ? 'ArrowRight' : 'ArrowLeft'
  if (e.key === forward) { next(); e.preventDefault() }
  else if (e.key === back) { prev(); e.preventDefault() }
}

let touchX = 0
function onTouchStart(e: TouchEvent) {
  touchX = e.changedTouches[0]?.clientX ?? 0
}
function onTouchEnd(e: TouchEvent) {
  const dx = (e.changedTouches[0]?.clientX ?? touchX) - touchX
  if (Math.abs(dx) < 48) return
  if (dx < 0) isRtl.value ? prev() : next()
  else isRtl.value ? next() : prev()
}

onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  arm()
  raf = requestAnimationFrame(tick)
})
onBeforeUnmount(() => {
  window.clearInterval(timer)
  cancelAnimationFrame(raf)
})
watch([hover, reduced], arm)
</script>

<template>
  <section
    id="home"
    class="hero-tone relative overflow-hidden"
    aria-roledescription="carousel"
    :aria-label="t.heroDots"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    @keydown="onKey"
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
  >
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div
        class="absolute inset-0"
        :class="workspace ? 'opacity-35' : 'opacity-80'"
        style="background-image: radial-gradient(rgba(10,75,255,.12) 1px, transparent 1px); background-size: 32px 32px; mask-image: radial-gradient(ellipse at 55% 45%, #000 16%, transparent 72%); -webkit-mask-image: radial-gradient(ellipse at 55% 45%, #000 16%, transparent 72%);"
      />
      <div class="absolute -start-32 top-10 h-[480px] w-[480px] rounded-full bg-brand-blue/15 blur-[130px]" />
      <div class="absolute -end-20 top-6 h-[520px] w-[520px] rounded-full bg-brand-cyan/15 blur-[140px]" />
      <div class="absolute bottom-10 start-1/3 h-[260px] w-[520px] rounded-full bg-brand-sky/10 blur-[120px]" />
    </div>

    <svg
      class="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[140px] w-full transition-opacity duration-500 sm:h-[168px]"
      :class="active.scene === 'platform' ? 'opacity-100' : 'opacity-45'"
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path fill="#0a4bff" fill-opacity="0.14" d="M0 78c220 62 360-48 560-8s340 78 560 18 220-52 320-8v120H0Z" />
      <path fill="url(#hero-wave)" d="M0 112c180 48 340-36 520 4s360 62 560 8 230-36 360-6v82H0Z" />
      <defs>
        <linearGradient id="hero-wave" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#0a4bff" />
          <stop offset="0.55" stop-color="#2f7bff" />
          <stop offset="1" stop-color="#00c8ff" />
        </linearGradient>
      </defs>
    </svg>

    <div class="container-site relative z-10 pb-20 pt-4 sm:pt-2 lg:pb-24">
      <div class="min-h-[560px] sm:min-h-[600px] lg:min-h-[560px]">
      <Transition
        mode="out-in"
        enter-active-class="transition duration-500 ease-out"
        enter-from-class="opacity-0 translate-y-3"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          :key="active.scene"
          class="grid h-full min-h-[560px] items-center gap-6 sm:min-h-[600px] lg:min-h-[560px] lg:gap-4 xl:gap-8"
          :class="workspace
            ? 'lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)_minmax(0,0.9fr)]'
            : industry
              ? 'relative justify-items-center lg:grid-cols-1'
              : 'lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.16fr)]'"
        >
          <HeroWorkspaceScene v-if="workspace" side="left" />

          <div :class="centered ? 'relative z-20 mx-auto max-w-xl text-center' : 'relative z-20 max-w-xl'">
            <div
              v-if="centered"
              class="pointer-events-none absolute inset-[-18%_-12%] -z-10 opacity-70"
              aria-hidden="true"
              style="background: radial-gradient(ellipse 80% 70% at 50% 42%, rgba(10,75,255,.16), transparent 65%), radial-gradient(ellipse 60% 50% at 30% 70%, rgba(0,200,255,.14), transparent 60%), radial-gradient(ellipse 55% 50% at 70% 65%, rgba(94,225,255,.12), transparent 58%);"
            />
            <p
              v-if="active.badge"
              class="mb-3 bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-sky bg-clip-text text-sm font-semibold text-transparent"
            >
              {{ active.badge }}
            </p>
            <h1
              class="bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-sky bg-clip-text text-[clamp(1.85rem,3.6vw,3.15rem)] font-extrabold leading-[1.08] tracking-tight text-transparent"
            >
              {{ active.title }}
            </h1>
            <p
              class="mt-4 max-w-[48ch] text-base leading-relaxed text-muted sm:text-lg"
              :class="centered ? 'mx-auto' : ''"
            >
              {{ active.body }}
            </p>
            <p
              v-if="active.mark"
              class="mt-5 bg-gradient-to-r from-brand-cyan to-brand-blue bg-clip-text text-sm font-extrabold tracking-[0.2em] text-transparent rtl:tracking-normal"
            >
              {{ active.mark }}
            </p>
          </div>

          <HeroIndustryScene v-if="industry" />
          <HeroWorkspaceScene v-if="workspace" side="right" />

          <div v-else-if="!industry" class="relative h-full min-h-[380px] w-full sm:min-h-[460px]">
            <HeroAiScene v-if="active.scene === 'ai'" />
            <template v-else-if="active.scene === 'platform'">
              <div :class="splineReady && !splineFailed ? 'pointer-events-none opacity-0' : 'opacity-100'">
                <Hero3DScene :progress="drift" />
              </div>
              <ClientOnly>
                <div
                  v-if="useSpline && !splineFailed"
                  class="absolute inset-0 transition-opacity duration-700"
                  :class="splineReady ? 'opacity-100' : 'opacity-0'"
                >
                  <HeroSpline
                    :scene="splineScene"
                    :progress="drift"
                    class="!aspect-auto !h-full !min-h-0 !rounded-[28px]"
                    @ready="splineReady = true; splineFailed = false"
                    @error="splineFailed = true; splineReady = false"
                  />
                </div>
              </ClientOnly>
            </template>
          </div>
        </div>
      </Transition>
      </div>
    </div>

    <button
      type="button"
      class="absolute start-3 top-1/2 z-30 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-ink/10 bg-surface/85 text-ink shadow-sm backdrop-blur transition hover:border-brand-blue/30 hover:text-brand-blue sm:start-5 sm:size-11"
      :aria-label="t.heroPrev"
      @click="prev"
    >
      <svg viewBox="0 0 24 24" class="size-4 rtl:rotate-180" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 6l-6 6 6 6" /></svg>
    </button>

    <button
      type="button"
      class="absolute end-3 top-1/2 z-30 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-ink/10 bg-surface/85 text-ink shadow-sm backdrop-blur transition hover:border-brand-blue/30 hover:text-brand-blue sm:end-5 sm:size-11"
      :aria-label="t.heroNext"
      @click="next"
    >
      <svg viewBox="0 0 24 24" class="size-4 rtl:rotate-180" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 6l6 6-6 6" /></svg>
    </button>

    <div class="absolute inset-x-0 bottom-4 z-30 flex items-center justify-center sm:bottom-5">
      <div class="flex items-center gap-1.5" role="tablist" :aria-label="t.heroDots">
        <button
          v-for="(slide, i) in slides"
          :key="slide.scene"
          type="button"
          role="tab"
          class="h-2 rounded-full transition-all"
          :class="i === index ? 'w-6 bg-gradient-to-r from-brand-blue to-brand-cyan' : 'w-2 bg-ink/25 hover:bg-ink/40'"
          :aria-label="slide.title"
          :aria-selected="i === index"
          @click="go(i)"
        />
      </div>
    </div>
  </section>
</template>
