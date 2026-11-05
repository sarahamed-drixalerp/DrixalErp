<script setup lang="ts">
/** Connected ERP modules orbiting the Drixal core. */
const { t } = useLocale()
const hn = computed(() => t.value.heroNetwork)

const cards = [
  { key: 'hr' as const, icon: 'hrm', x: '2%', y: '10%', rot: -5, delay: '0s', z: 14, tone: 'from-brand-blue to-brand-cyan' },
  { key: 'crm' as const, icon: 'crm', x: '56%', y: '8%', rot: 5, delay: '.55s', z: 14, tone: 'from-brand-cyan to-brand-sky' },
  { key: 'finance' as const, icon: 'fin', x: '0%', y: '44%', rot: -4, delay: '1.05s', z: 16, tone: 'from-brand-blue to-brand-periwinkle' },
  { key: 'pmo' as const, icon: 'pmo', x: '58%', y: '42%', rot: 4, delay: '.25s', z: 16, tone: 'from-brand-cyan to-brand-blue' },
  { key: 'ops' as const, icon: 'dms', x: '28%', y: '70%', rot: 2, delay: '1.35s', z: 18, tone: 'from-brand-blue to-brand-sky' },
]
</script>

<template>
  <div
    class="relative mx-auto h-full min-h-[380px] w-full max-w-[620px] overflow-hidden sm:min-h-[460px]"
    :aria-label="hn.ariaLabel"
    role="img"
  >
    <!-- Ambient glow — matches workspace / automation slides -->
    <div
      class="pointer-events-none absolute inset-0 opacity-70"
      aria-hidden="true"
      style="background: radial-gradient(ellipse 70% 60% at 50% 46%, rgba(10,75,255,.18), transparent 68%), radial-gradient(ellipse 50% 40% at 28% 62%, rgba(0,200,255,.14), transparent 60%), radial-gradient(ellipse 45% 40% at 72% 58%, rgba(94,225,255,.12), transparent 58%);"
    />
    <div
      class="pointer-events-none absolute inset-0 opacity-60"
      aria-hidden="true"
      style="background-image: radial-gradient(rgba(10,75,255,.18) 1px, transparent 1px); background-size: 20px 20px; mask-image: radial-gradient(circle at 50% 46%, #000 18%, transparent 70%); -webkit-mask-image: radial-gradient(circle at 50% 46%, #000 18%, transparent 70%);"
    />

    <!-- Orbit rings -->
    <div class="pointer-events-none absolute left-1/2 top-[46%] z-0 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
      <div class="modules-ring modules-ring--lg" />
      <div class="modules-ring modules-ring--md" />
      <div class="modules-ring modules-ring--sm" />
    </div>

    <!-- Spoke lines -->
    <svg class="pointer-events-none absolute inset-0 z-[1] h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M28 22 L50 46 M72 20 L50 46 M22 54 L50 46 M78 52 L50 46 M50 46 L48 78"
        fill="none"
        stroke="rgba(10,75,255,.22)"
        stroke-width="0.45"
        stroke-dasharray="1.6 1.4"
        stroke-linecap="round"
      />
    </svg>

    <!-- Core hub -->
    <div class="absolute left-1/2 top-[46%] z-20 w-[min(250px,56%)] -translate-x-1/2 -translate-y-1/2">
      <div class="relative rounded-2xl border border-white/70 bg-surface/95 p-3 shadow-[0_22px_48px_-18px_rgba(10,75,255,.5)] backdrop-blur-md dark:border-line sm:p-3.5">
        <div class="flex items-center gap-3">
          <span class="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-cyan shadow-brand">
            <img src="/images/drixal-mark-white.png" alt="" width="28" height="22" class="w-6">
          </span>
          <span class="min-w-0 text-start">
            <span class="block truncate text-sm font-extrabold text-ink">{{ hn.core.title }}</span>
            <span class="mt-0.5 block truncate text-[11px] text-muted">{{ hn.core.sub }}</span>
          </span>
        </div>
        <div class="mt-3 flex gap-1.5" aria-hidden="true">
          <span class="h-1.5 flex-1 rounded-full bg-brand-blue" />
          <span class="h-1.5 w-10 rounded-full bg-brand-cyan" />
          <span class="h-1.5 w-6 rounded-full bg-brand-sky" />
        </div>
      </div>
    </div>

    <!-- Module cards -->
    <div
      v-for="c in cards"
      :key="c.key"
      class="absolute w-[44%] max-w-[200px] animate-float"
      :style="{
        insetInlineStart: c.x,
        top: c.y,
        zIndex: c.z,
        animationDelay: c.delay,
      }"
    >
      <article
        class="rounded-2xl border border-white/70 bg-surface/90 p-2.5 shadow-[0_16px_36px_-20px_rgba(10,40,120,.42)] backdrop-blur-md dark:border-line"
        :style="{ transform: `rotate(${c.rot}deg)` }"
      >
        <div class="flex items-center gap-2.5">
          <span
            class="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white shadow-sm"
            :class="c.tone"
          >
            <ServiceIcon :icon="c.icon" class="!h-4 !w-4" />
          </span>
          <span class="min-w-0 text-start">
            <span class="block truncate text-[12px] font-bold text-ink">{{ hn.modules[c.key].title }}</span>
            <span class="mt-0.5 block truncate text-[10px] leading-snug text-muted">{{ hn.modules[c.key].sub }}</span>
          </span>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.modules-ring {
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 999px;
  border: 1.5px solid rgba(10, 75, 255, 0.18);
  transform: translate(-50%, -50%);
}
.modules-ring--lg {
  width: min(340px, 78vw);
  height: min(340px, 78vw);
  border-style: dashed;
  border-color: rgba(0, 200, 255, 0.28);
}
.modules-ring--md {
  width: min(240px, 56vw);
  height: min(240px, 56vw);
  border-color: rgba(10, 75, 255, 0.22);
}
.modules-ring--sm {
  width: min(150px, 36vw);
  height: min(150px, 36vw);
  background: rgba(10, 75, 255, 0.06);
  border-color: rgba(99, 102, 241, 0.25);
}
</style>
