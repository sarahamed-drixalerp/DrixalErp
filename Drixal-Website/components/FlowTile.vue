<script setup lang="ts">
/**
 * Frosted-glass tile for the data-flow diagram.
 * Light-up is driven by the CSS variable `--lit` (0 → 1), which GSAP tweens on
 * scroll. The markup defaults to lit, so it looks complete without JS or with
 * reduced motion.
 */
export type FlowIconKey =
  | 'hub' | 'api' | 'db'
  | 'hrm' | 'crm' | 'pmo' | 'dms' | 'fin' | 'srm' | 'srv' | 'rsk' | 'industry'

const props = withDefaults(defineProps<{
  icon: FlowIconKey
  title: string
  sub: string
  size?: 'lg' | 'md' | 'sm'
  /** Tech names are always rendered LTR. */
  ltrTitle?: boolean
}>(), { size: 'md', ltrTitle: false })

const PATHS: Record<Exclude<FlowIconKey, 'hub'>, string> = {
  api: 'M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14',
  db: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zm0 0v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  hrm: 'M9 11a4 4 0 100-8 4 4 0 000 8zM2 21v-1a6 6 0 0112 0v1M16 3.5a4 4 0 010 7.5M22 21v-1a6 6 0 00-4-5.6',
  crm: 'M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z',
  pmo: 'M4 19h16M6 16V9M10 16V5M14 16v-5M18 16V7',
  dms: 'M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1zM14 3v5h5',
  fin: 'M4 20h16M6 16v-4M10 16V8M14 16v-6M18 16V5',
  srm: 'M3 4h2l2.4 11.2a1.5 1.5 0 001.5 1.3h8.7a1.5 1.5 0 001.5-1.2L21 8H6.2M10 20.5h.01M17 20.5h.01',
  srv: 'M7 18a5 5 0 010-10 6 6 0 0111.5 1.5A4 4 0 0118 18zM12 14v4M12 22h.01',
  rsk: 'M12 3l9.5 17h-19zM12 10v4M12 16.5v.01',
  industry: 'M3 21h18M5 21V10l4 3V7l4 3V5l6 4v12',
}
const path = computed(() => (props.icon === 'hub' ? '' : PATHS[props.icon]))

const pad = computed(() => ({
  lg: 'p-4 pe-6',
  md: 'p-3.5 pe-5',
  sm: 'p-3 pe-4',
}[props.size]))

const badge = computed(() => ({
  lg: 'h-12 w-12',
  md: 'h-10 w-10',
  sm: 'h-9 w-9',
}[props.size]))

const titleCls = computed(() => ({
  lg: 'text-base',
  md: 'text-[.92rem]',
  sm: 'text-[.85rem]',
}[props.size]))
</script>

<template>
  <div
    data-flow-tile
    class="relative flex items-center gap-3 rounded-2xl border border-line/80 bg-surface/70 text-start
           shadow-[0_22px_45px_-28px_rgba(10,40,120,.55),inset_0_1px_0_rgba(255,255,255,.35)] backdrop-blur-xl"
    :class="pad"
    style="--lit: 1"
  >
    <!-- glow ring when the wire reaches this tile -->
    <div
      class="pointer-events-none absolute -inset-px rounded-2xl ring-2 ring-brand-cyan/70
             shadow-[0_0_0_5px_rgba(0,200,255,.10),0_20px_50px_-14px_rgba(10,75,255,.55)]"
      style="opacity: var(--lit)"
      aria-hidden="true"
    />

    <!-- icon badge: idle layer + lit layer cross-faded by --lit -->
    <div class="relative grid shrink-0 place-items-center overflow-hidden rounded-xl" :class="badge" aria-hidden="true">
      <template v-if="icon === 'hub'">
        <div class="absolute inset-0 bg-gradient-to-br from-navy-3 to-navy" />
        <div class="absolute inset-0 bg-brand" style="opacity: var(--lit)" />
        <img src="/images/drixal-mark-white.png" alt="" width="253" height="195" class="relative w-7">
      </template>
      <template v-else>
        <div class="absolute inset-0 grid place-items-center bg-brand-blue/10 text-brand-blue">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path :d="path" /></svg>
        </div>
        <div class="absolute inset-0 grid place-items-center bg-brand text-white" style="opacity: var(--lit)">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path :d="path" /></svg>
        </div>
      </template>
    </div>

    <div class="relative min-w-0">
      <p class="font-bold leading-tight text-ink" :class="titleCls">
        <bdi v-if="ltrTitle" dir="ltr">{{ title }}</bdi><template v-else>{{ title }}</template>
      </p>
      <p class="mt-0.5 text-xs leading-snug text-muted">{{ sub }}</p>
    </div>
  </div>
</template>
