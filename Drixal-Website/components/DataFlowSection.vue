<script setup lang="ts">
/**
 * Scroll-driven "data flow" diagram.
 *
 * Desktop (≥1024px): glass tiles placed on a stage; an SVG fiber-optic wire
 * draws itself (scrubbed by GSAP ScrollTrigger) from the ERP core → .NET API
 * → PostgreSQL → a junction that fans out to every workspace module. Each tile
 * lights up when the wire reaches it.
 * Mobile/tablet: a straight vertical glowing timeline.
 *
 * Without JS, or with prefers-reduced-motion, everything renders fully drawn & lit.
 * GSAP is imported lazily on the client so it never touches the initial bundle.
 */
import type { FlowIconKey } from './FlowTile.vue'

const { t } = useLocale()

const W = 1000
const H = 1120

interface FlowNode { key: FlowIconKey, x: number, y: number, ltr?: boolean, delay: string, size?: 'lg' | 'md' | 'sm', width?: string }
const HUB: FlowNode = { key: 'hub', x: 500, y: 80, delay: '0s', size: 'lg', width: 'w-[250px]' }
const API: FlowNode = { key: 'api', x: 250, y: 300, ltr: true, delay: '-1.5s', width: 'w-[215px]' }
const DB: FlowNode = { key: 'db', x: 750, y: 520, ltr: true, delay: '-3s', width: 'w-[215px]' }
const JUNCTION = { x: 500, y: 680 }

/** All workspace modules — two rows under the junction. */
const BRANCHES: FlowNode[] = [
  { key: 'hrm', x: 100, y: 860, delay: '-0.6s', size: 'sm', width: 'w-[170px]' },
  { key: 'crm', x: 300, y: 860, delay: '-1.2s', size: 'sm', width: 'w-[170px]' },
  { key: 'pmo', x: 500, y: 860, delay: '-1.8s', size: 'sm', width: 'w-[170px]' },
  { key: 'dms', x: 700, y: 860, delay: '-2.4s', size: 'sm', width: 'w-[170px]' },
  { key: 'fin', x: 900, y: 860, delay: '-3s', size: 'sm', width: 'w-[170px]' },
  { key: 'srm', x: 200, y: 1020, delay: '-3.6s', size: 'sm', width: 'w-[170px]' },
  { key: 'srv', x: 400, y: 1020, delay: '-4.2s', size: 'sm', width: 'w-[170px]' },
  { key: 'rsk', x: 600, y: 1020, delay: '-4.8s', size: 'sm', width: 'w-[170px]' },
  { key: 'industry', x: 800, y: 1020, delay: '-5.4s', size: 'sm', width: 'w-[170px]' },
]
const NODES = [HUB, API, DB, ...BRANCHES]

/** Vertical S-curve between two points. */
function curve(a: { x: number, y: number }, b: { x: number, y: number }, bend = 0.55) {
  const dy = (b.y - a.y) * bend
  return `M${a.x} ${a.y} C${a.x} ${a.y + dy} ${b.x} ${b.y - dy} ${b.x} ${b.y}`
}

const TRUNK = [curve(HUB, API), curve(API, DB), curve(DB, JUNCTION)]
const BRANCH_PATHS = BRANCHES.map(b => curve(JUNCTION, b, 0.5))
const ALL_PATHS = [...TRUNK.map((d, i) => ({ d, id: `t${i}` })), ...BRANCH_PATHS.map((d, i) => ({ d, id: `b${i}` }))]

const pct = (n: FlowNode) => ({ left: `${(n.x / W) * 100}%`, top: `${(n.y / H) * 100}%` })
const node = (k: FlowIconKey) => t.value.flow.nodes[k]

const root = ref<HTMLElement | null>(null)
let cleanup: (() => void) | null = null

onMounted(async () => {
  const el = root.value
  if (!el) return
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
  gsap.registerPlugin(ScrollTrigger)
  if (!root.value) return // unmounted while loading

  const mm = gsap.matchMedia(el)

  // ── Desktop: draw the wire along the trunk, fan out, light tiles ──
  mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
    const q = gsap.utils.selector(el)
    const draw = (id: string) => q(`[data-path="${id}"] [data-draw]`)
    const flow = (id: string) => q(`[data-path="${id}"] [data-flow]`)
    const tile = (k: string) => q(`[data-node="${k}"] [data-flow-tile]`)

    gsap.set(q('[data-desktop] [data-draw]'), { strokeDashoffset: 1 })
    gsap.set(q('[data-desktop] [data-flow]'), { opacity: 0 })
    gsap.set(q('[data-desktop] [data-flow-tile]'), { '--lit': 0 })
    gsap.set(q('[data-junction]'), { scale: 0, opacity: 0, transformOrigin: '50% 50%' })

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: q('[data-stage]')[0], start: 'top 78%', end: 'bottom 70%', scrub: 0.6 },
    })

    tl.to(tile('hub'), { '--lit': 1, duration: 0.3 })
      .to(draw('t0'), { strokeDashoffset: 0, duration: 1 })
      .to(tile('api'), { '--lit': 1, duration: 0.3 })
      .to(flow('t0'), { opacity: 1, duration: 0.3 }, '<')
      .to(draw('t1'), { strokeDashoffset: 0, duration: 1.2 })
      .to(tile('db'), { '--lit': 1, duration: 0.3 })
      .to(flow('t1'), { opacity: 1, duration: 0.3 }, '<')
      .to(draw('t2'), { strokeDashoffset: 0, duration: 0.7 })
      .to(q('[data-junction]'), { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(3)' })
      .to(flow('t2'), { opacity: 1, duration: 0.3 }, '<')

    BRANCHES.forEach((b, i) => {
      const at = `branch+=${i * 0.14}`
      if (i === 0) tl.addLabel('branch')
      tl.to(draw(`b${i}`), { strokeDashoffset: 0, duration: 0.85 }, at)
        .to(tile(b.key), { '--lit': 1, duration: 0.28 }, `${at}+=0.75`)
        .to(flow(`b${i}`), { opacity: 1, duration: 0.28 }, `${at}+=0.75`)
    })
  })

  // ── Mobile / tablet: vertical timeline ──
  mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
    const q = gsap.utils.selector(el)
    const list = q('[data-mobile]')[0]
    gsap.fromTo(q('[data-mobile-fill]'), { scaleY: 0 }, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: list, start: 'top 75%', end: 'bottom 60%', scrub: 0.5 },
    })
    q('[data-mobile-item]').forEach((item) => {
      gsap.fromTo(item.querySelectorAll('[data-flow-tile], [data-mobile-dot]'), { '--lit': 0 }, {
        '--lit': 1,
        ease: 'none',
        scrollTrigger: { trigger: item, start: 'top 72%', end: 'top 58%', scrub: true },
      })
    })
  })

  cleanup = () => mm.revert()
})

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <section id="platform" ref="root" class="section relative overflow-hidden bg-gradient-to-b from-surface via-mist to-surface">
    <!-- soft colour behind the glass so the frosting reads -->
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="absolute left-[8%] top-[28%] h-[420px] w-[420px] rounded-full bg-brand-blue/[.13] blur-[110px]" />
      <div class="absolute right-[6%] top-[52%] h-[460px] w-[460px] rounded-full bg-brand-cyan/[.16] blur-[120px]" />
      <div class="absolute bottom-[4%] left-[35%] h-[300px] w-[520px] rounded-full bg-indigo-400/[.12] blur-[110px]" />
      <div
        class="absolute inset-0 opacity-60"
        style="background-image: radial-gradient(rgba(10,75,255,.12) 1px, transparent 1px); background-size: 26px 26px; mask-image: radial-gradient(ellipse at 50% 55%, #000 30%, transparent 75%); -webkit-mask-image: radial-gradient(ellipse at 50% 55%, #000 30%, transparent 75%);"
      />
    </div>

    <div class="container-site relative">
      <SectionHeading :eyebrow="t.flow.eyebrow" :title="t.flow.title" :lead="t.flow.lead" />

      <!-- ───────── Desktop stage ───────── -->
      <div data-desktop class="hidden lg:block">
        <div data-stage class="relative mx-auto w-full max-w-[1000px]" :style="{ aspectRatio: `${W} / ${H}` }">
          <svg :viewBox="`0 0 ${W} ${H}`" class="absolute inset-0 h-full w-full overflow-visible" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="flow-wire" gradientUnits="userSpaceOnUse" x1="0" y1="0" :x2="0" :y2="H">
                <stop offset="0" stop-color="#0a4bff" />
                <stop offset=".55" stop-color="#2f8bff" />
                <stop offset="1" stop-color="#00c8ff" />
              </linearGradient>
              <filter id="flow-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" />
              </filter>
            </defs>

            <g v-for="p in ALL_PATHS" :key="p.id" :data-path="p.id">
              <!-- idle track -->
              <path :d="p.d" stroke="#c5d0ea" stroke-width="2" stroke-dasharray="3 7" stroke-linecap="round" />
              <!-- glow + core, drawn on scroll -->
              <path data-draw :d="p.d" pathLength="1" stroke="url(#flow-wire)" stroke-width="10" stroke-linecap="round" opacity=".45" filter="url(#flow-glow)" stroke-dasharray="1" stroke-dashoffset="0" />
              <path data-draw :d="p.d" pathLength="1" stroke="url(#flow-wire)" stroke-width="3" stroke-linecap="round" stroke-dasharray="1" stroke-dashoffset="0" />
              <!-- data pulses travelling along the finished wire -->
              <path data-flow class="flow-pulse" :d="p.d" pathLength="1" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-dasharray=".012 .088" />
            </g>

            <g data-junction>
              <circle :cx="JUNCTION.x" :cy="JUNCTION.y" r="16" fill="#00c8ff" opacity=".18" />
              <circle :cx="JUNCTION.x" :cy="JUNCTION.y" r="7" fill="url(#flow-wire)" stroke="#fff" stroke-width="2.5" />
            </g>
          </svg>

          <div
            v-for="n in NODES"
            :key="n.key"
            :data-node="n.key"
            class="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            :style="pct(n)"
          >
            <div class="animate-float-slow motion-reduce:animate-none" :style="{ animationDelay: n.delay }">
              <FlowTile
                :icon="n.key"
                :title="node(n.key).title"
                :sub="node(n.key).sub"
                :size="n.size ?? 'md'"
                :ltr-title="n.ltr"
                :class="n.width ?? 'w-[215px]'"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- ───────── Mobile / tablet timeline ───────── -->
      <ol data-mobile class="relative mx-auto max-w-md lg:hidden">
        <span class="absolute bottom-6 start-[19px] top-6 w-0.5 rounded bg-[#d3dcf0]" aria-hidden="true" />
        <span
          data-mobile-fill
          class="absolute bottom-6 start-[19px] top-6 w-0.5 origin-top rounded bg-gradient-to-b from-brand-blue to-brand-cyan shadow-[0_0_12px_2px_rgba(0,200,255,.55)]"
          aria-hidden="true"
        />
        <li v-for="n in NODES" :key="n.key" data-mobile-item class="relative flex items-center gap-4 py-3 ps-0">
          <span
            data-mobile-dot
            class="relative z-10 grid h-10 w-10 shrink-0 place-items-center"
            style="--lit: 1"
            aria-hidden="true"
          >
            <span class="h-3.5 w-3.5 rounded-full border-2 border-white bg-[#c5d0ea] shadow" />
            <span class="absolute h-3.5 w-3.5 rounded-full border-2 border-white bg-brand shadow-[0_0_0_6px_rgba(0,200,255,.18)]" style="opacity: var(--lit)" />
          </span>
          <FlowTile class="flex-1" :icon="n.key" :title="node(n.key).title" :sub="node(n.key).sub" :ltr-title="n.ltr" size="sm" />
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.flow-pulse {
  animation: flow-pulse 2.4s linear infinite;
}
@keyframes flow-pulse {
  to { stroke-dashoffset: -0.1; }
}
@media (prefers-reduced-motion: reduce) {
  .flow-pulse { animation: none; opacity: 0; }
}
</style>
