<script setup lang="ts">
/** Glowing automation cube with floating capability cards. */
const { t } = useLocale()
const ai = computed(() => t.value.heroAi.cards)

const layout = [
  { key: 'pipeline' as const, x: '0%', y: '10%', rot: -6, delay: '0s', z: 12 },
  { key: 'analytics' as const, x: '54%', y: '8%', rot: 5, delay: '.7s', z: 14 },
  { key: 'learning' as const, x: '66%', y: '38%', rot: 4, delay: '1.15s', z: 16 },
  { key: 'insights' as const, x: '2%', y: '48%', rot: -5, delay: '.35s', z: 24 },
  { key: 'predict' as const, x: '44%', y: '66%', rot: 4, delay: '1.45s', z: 22 },
]
</script>

<template>
  <div
    class="relative mx-auto h-full min-h-[380px] w-full max-w-[640px] overflow-hidden pt-2 sm:min-h-[460px]"
    :aria-label="t.heroAi.ariaLabel"
    role="img"
  >
    <div
      class="pointer-events-none absolute inset-0 opacity-70"
      style="background-image: radial-gradient(rgba(10,75,255,.22) 1px, transparent 1px); background-size: 22px 22px; mask-image: radial-gradient(circle at 50% 46%, #000 12%, transparent 72%); -webkit-mask-image: radial-gradient(circle at 50% 46%, #000 12%, transparent 72%);"
      aria-hidden="true"
    />
    <div class="pointer-events-none absolute left-1/2 top-[42%] size-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-cyan/25 blur-3xl" aria-hidden="true" />

    <!-- pedestal + cube -->
    <div class="pointer-events-none absolute left-1/2 top-[40%] z-20 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
      <div class="ai-ring ai-ring--lg" />
      <div class="ai-ring ai-ring--md" />
      <div class="ai-ring ai-ring--sm" />
      <div class="ai-cube">{{ t.heroAi.cubeLabel }}</div>
    </div>

    <div
      v-for="card in layout"
      :key="card.key"
      class="absolute w-[46%] max-w-[210px] animate-float"
      :style="{
        insetInlineStart: card.x,
        top: card.y,
        zIndex: card.z,
        animationDelay: card.delay,
      }"
    >
      <article
        class="rounded-2xl border border-white/70 bg-surface/90 p-2.5 shadow-[0_18px_40px_-22px_rgba(10,60,180,.45)] backdrop-blur-md dark:border-line"
        :style="{ transform: `rotate(${card.rot}deg)` }"
      >
        <div class="mb-1.5 flex items-start justify-between gap-2">
          <div>
            <p class="text-[12px] font-bold leading-tight text-ink">{{ ai[card.key].title }}</p>
            <p class="mt-0.5 text-[10px] leading-snug text-muted">{{ ai[card.key].sub }}</p>
          </div>
          <span class="mt-0.5 text-[10px] tracking-widest text-muted/70">···</span>
        </div>

        <div v-if="card.key === 'pipeline'" class="flex items-center gap-1 px-0.5 pt-1">
          <span v-for="n in 3" :key="n" class="flex items-center gap-1">
            <span class="grid size-7 place-items-center rounded-lg bg-brand-blue/10 text-brand-blue">
              <svg viewBox="0 0 24 24" class="size-3.5" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></svg>
            </span>
            <span v-if="n < 3" class="h-px w-3 bg-brand-cyan" />
          </span>
        </div>

        <div v-else-if="card.key === 'analytics'" class="flex items-center gap-2 pt-1">
          <svg viewBox="0 0 36 36" class="size-10 shrink-0">
            <circle cx="18" cy="18" r="12" fill="none" stroke="rgb(var(--c-mist))" stroke-width="5" />
            <circle cx="18" cy="18" r="12" fill="none" stroke="#0a4bff" stroke-width="5" stroke-linecap="round" stroke-dasharray="42 34" transform="rotate(-90 18 18)" />
            <circle cx="18" cy="18" r="12" fill="none" stroke="#00c8ff" stroke-width="5" stroke-linecap="round" stroke-dasharray="16 60" stroke-dashoffset="-44" transform="rotate(-90 18 18)" />
          </svg>
          <div class="space-y-1">
            <span class="block h-1.5 w-14 rounded-full bg-brand-blue/80" />
            <span class="block h-1.5 w-10 rounded-full bg-brand-cyan/80" />
            <span class="block h-1.5 w-8 rounded-full bg-indigo-300" />
          </div>
        </div>

        <div v-else-if="card.key === 'learning'" class="relative mx-auto mt-1 h-10 w-24" aria-hidden="true">
          <svg viewBox="0 0 96 40" class="h-full w-full text-brand-blue">
            <path d="M12 20h20M52 10h20M52 30h20M32 20l20-10M32 20l20 10" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".55" />
            <circle cx="12" cy="20" r="4" fill="#0a4bff" />
            <circle cx="32" cy="20" r="4" fill="#00c8ff" />
            <circle cx="72" cy="10" r="3.5" fill="#0a4bff" />
            <circle cx="72" cy="30" r="3.5" fill="#8fb0ff" />
          </svg>
        </div>

        <div v-else-if="card.key === 'insights'" class="flex items-end gap-1 pt-1" aria-hidden="true">
          <span class="h-3 w-2 rounded-sm bg-brand-blue/35" />
          <span class="h-5 w-2 rounded-sm bg-brand-blue/60" />
          <span class="h-7 w-2 rounded-sm bg-brand-blue" />
          <span class="h-4 w-2 rounded-sm bg-brand-cyan" />
          <span class="h-6 w-2 rounded-sm bg-indigo-400" />
          <span class="h-8 w-2 rounded-sm bg-brand-blue" />
        </div>

        <svg v-else viewBox="0 0 120 36" class="mt-1 h-8 w-full" aria-hidden="true">
          <path d="M2 28 C 20 26, 28 10, 46 16 S 70 30, 88 12 112 8, 118 14" fill="none" stroke="#0a4bff" stroke-width="2.2" stroke-linecap="round" />
          <path d="M2 28 C 20 26, 28 10, 46 16 S 70 30, 88 12 112 8, 118 14 V 36 H 2 Z" fill="url(#ai-area)" opacity=".35" />
          <defs>
            <linearGradient id="ai-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#00c8ff" />
              <stop offset="1" stop-color="#00c8ff" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </article>
    </div>

    <div class="pointer-events-none absolute start-[38%] top-[22%] z-30 grid size-8 animate-float place-items-center rounded-xl border border-line bg-surface text-brand-blue shadow-md" style="animation-delay: .5s" aria-hidden="true">
      <svg viewBox="0 0 24 24" class="size-3.5" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 18a5 5 0 010-10 6 6 0 0111.5 1.5A4 4 0 0118 18z" /></svg>
    </div>
    <div class="pointer-events-none absolute end-[18%] bottom-[18%] z-30 grid size-8 animate-float-slow place-items-center rounded-xl border border-line bg-surface text-brand-cyan shadow-md" aria-hidden="true">
      <svg viewBox="0 0 24 24" class="size-3.5" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="6" y="8" width="12" height="10" rx="2" /><circle cx="9.5" cy="13" r=".8" fill="currentColor" /><circle cx="14.5" cy="13" r=".8" fill="currentColor" /><path d="M12 4v4" /></svg>
    </div>
  </div>
</template>

<style scoped>
.ai-cube {
  position: relative;
  z-index: 2;
  display: grid;
  width: 112px;
  height: 112px;
  place-items: center;
  border-radius: 28px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0) 42%),
    linear-gradient(160deg, #8ad8ff 0%, #0a4bff 52%, #0630b8 100%);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.45),
    0 22px 40px -14px rgba(10, 75, 255, 0.7),
    0 0 56px rgba(0, 200, 255, 0.45);
  color: white;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.03em;
  transform: rotateX(16deg) rotateY(-22deg);
}
.ai-ring {
  position: absolute;
  left: 50%;
  border-radius: 999px;
  border: 2px solid rgba(0, 200, 255, 0.45);
  background: rgba(10, 75, 255, 0.08);
  transform: translateX(-50%) rotateX(72deg);
}
.ai-ring--lg { top: 78px; width: 190px; height: 54px; }
.ai-ring--md { top: 88px; width: 140px; height: 40px; border-style: dashed; }
.ai-ring--sm { top: 96px; width: 92px; height: 28px; }
</style>
