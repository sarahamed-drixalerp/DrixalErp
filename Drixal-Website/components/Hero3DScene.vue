<script setup lang="ts">
/**
 * Hero Earth scene (matches the Drixal reference):
 * holographic globe (real continents, <HoloGlobe>) + two orbital rings with
 * glowing satellites, the ERP Core card in the centre and five tilted module
 * cards around it.
 *
 * Scroll (`progress` 0–1 from the sticky hero): globe turns, rings rotate,
 * cards drift outward and tilt; pointer adds a subtle parallax tilt.
 */
type CardKey = 'finance' | 'pmo' | 'hr' | 'ops' | 'crm'

interface CardDef {
  key: CardKey
  /** position in % of the stage (LTR; mirrored in RTL) */
  x: number
  y: number
  /** resting tilt (deg) */
  rz: number
  ry: number
  /** outward drift direction on scroll */
  dx: number
  dy: number
  z: number
  small?: boolean
}

const { t, isRtl } = useLocale()
const hn = computed(() => t.value.heroNetwork)

const CARDS: CardDef[] = [
  { key: 'finance', x: 0, y: 18, rz: 5, ry: 8, dx: -1, dy: -0.6, z: 40 },
  { key: 'pmo', x: 38, y: 6, rz: 2, ry: 0, dx: 0, dy: -0.8, z: 20, small: true },
  { key: 'hr', x: 67, y: 16, rz: -4, ry: -8, dx: 1, dy: -0.6, z: 40 },
  { key: 'ops', x: 4, y: 69, rz: -2, ry: 7, dx: -1, dy: 0.6, z: 30 },
  { key: 'crm', x: 65, y: 70, rz: 3, ry: -7, dx: 1, dy: 0.6, z: 30 },
]

const ICONS: Record<CardKey, string> = {
  finance: 'M4 20h16M6 16v-4M10 16V8M14 16v-6M18 16V5',
  pmo: 'M4 19h16M6 16V9M10 16V5M14 16v-5M18 16V7',
  hr: 'M9 11a4 4 0 100-8 4 4 0 000 8zM2 21v-1a6 6 0 0112 0v1M16 3.5a4 4 0 010 7.5M22 21v-1a6 6 0 00-4-5.6',
  ops: 'M4 4h16a1 1 0 011 1v11a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1zM8 21h8M12 17v4',
  crm: 'M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z',
}

const props = defineProps<{ progress: number }>()

const stage = ref<HTMLElement | null>(null)
const tiltX = ref(0)
const tiltY = ref(0)
const reduced = ref(false)
let raf = 0
let targetTX = 0
let targetTY = 0

function onPointer(e: PointerEvent) {
  if (reduced.value || !stage.value) return
  const r = stage.value.getBoundingClientRect()
  const nx = ((e.clientX - r.left) / r.width) * 2 - 1
  const ny = ((e.clientY - r.top) / r.height) * 2 - 1
  targetTY = nx * 5 * (isRtl.value ? -1 : 1)
  targetTX = -ny * 4
}
function onLeave() { targetTX = 0; targetTY = 0 }

function tick() {
  const dx = targetTX - tiltX.value
  const dy = targetTY - tiltY.value
  if (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01) {
    tiltX.value += dx * 0.08
    tiltY.value += dy * 0.08
  }
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduced.value) raf = requestAnimationFrame(tick)
})
onBeforeUnmount(() => cancelAnimationFrame(raf))

const p = computed(() => (reduced.value ? 0 : props.progress))
const dir = computed(() => (isRtl.value ? -1 : 1))

function cardStyle(c: CardDef) {
  const s = p.value
  // drift in % of the card's own size, so it scales from phone to desktop
  const drift = s * 16
  return {
    [isRtl.value ? 'right' : 'left']: `${c.x}%`,
    top: `${c.y}%`,
    zIndex: c.z,
    transform: [
      `translate3d(${c.dx * drift * dir.value}%, ${c.dy * drift * 2.5}%, ${c.z + s * 40}px)`,
      `rotateY(${(c.ry + s * c.ry * 0.6) * dir.value}deg)`,
      `rotateZ(${(c.rz + s * c.rz * 0.8) * dir.value}deg)`,
    ].join(' '),
  }
}

const stageStyle = computed(() => ({
  transform: `rotateX(${4 - p.value * 3 + tiltX.value}deg) rotateY(${(-3 + p.value * 6) * dir.value + tiltY.value}deg)`,
}))
const globeStyle = computed(() => ({ transform: `scale(${1 + p.value * 0.06})` }))
const ringOuter = computed(() => ({ transform: `rotateX(70deg) rotateY(-12deg) rotateZ(${-20 + p.value * 60}deg)` }))
const ringInner = computed(() => ({ transform: `rotateX(74deg) rotateY(16deg) rotateZ(${30 - p.value * 50}deg)` }))
</script>

<template>
  <div
    ref="stage"
    class="relative mx-auto aspect-square h-full max-h-[460px] w-full max-w-[560px] [perspective:1300px] sm:max-h-none lg:max-w-[min(560px,100%)]"
    :aria-label="hn.ariaLabel"
    role="img"
    @pointermove="onPointer"
    @pointerleave="onLeave"
  >
    <!-- ambient light around the globe -->
    <div class="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(120,220,255,.55),rgba(56,189,248,.18)_45%,transparent_70%)] blur-2xl" aria-hidden="true" />
    <div class="pointer-events-none absolute inset-x-[22%] bottom-[9%] h-16 rounded-[100%] bg-[#38bdf8]/45 blur-3xl" aria-hidden="true" />

    <div class="absolute inset-0 [transform-style:preserve-3d] will-change-transform" :style="stageStyle">
      <!-- globe -->
      <div class="absolute left-1/2 top-1/2 w-[60%] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
        <div class="transition-transform duration-300 ease-out" :style="globeStyle">
          <HoloGlobe :progress="p" />
        </div>
      </div>

      <!-- orbital rings -->
      <div class="pointer-events-none absolute inset-0 [transform-style:preserve-3d]" aria-hidden="true">
        <div class="orbit orbit--outer" :style="ringOuter">
          <span class="orbit-sat" style="left: -4px; top: 50%;" />
          <span class="orbit-sat orbit-sat--sm" style="left: 82%; top: 8%;" />
        </div>
        <div class="orbit orbit--inner" :style="ringInner">
          <span class="orbit-sat orbit-sat--sm" style="right: 6%; top: 18%;" />
        </div>
      </div>

      <!-- core card -->
      <div class="absolute left-1/2 top-1/2 z-[60] w-[min(250px,58%)]" style="transform: translate(-50%, -50%) translateZ(70px)">
        <div class="flex items-center gap-2.5 rounded-2xl border border-line bg-surface/90 px-3 py-2.5 shadow-[0_24px_50px_-18px_rgba(0,90,200,.5)] backdrop-blur-md sm:gap-3 sm:px-4 sm:py-3.5">
          <div class="grid h-9 w-9 shrink-0 place-items-center rounded-[11px] bg-gradient-to-br from-[#0aa2ff] to-[#0a5bff] shadow-[0_8px_18px_-6px_rgba(10,90,255,.7)] sm:h-12 sm:w-12 sm:rounded-[13px]">
            <img src="/images/drixal-mark-white.png" alt="" width="253" height="195" class="w-5 sm:w-7">
          </div>
          <div class="min-w-0">
            <p class="truncate text-[13px] font-bold leading-tight text-ink sm:text-base">{{ hn.core.title }}</p>
            <p class="mt-0.5 truncate text-[10px] text-muted sm:text-xs">{{ hn.core.sub }}</p>
          </div>
        </div>
      </div>

      <!-- module cards -->
      <article
        v-for="c in CARDS"
        :key="c.key"
        class="absolute transition-transform duration-300 ease-out will-change-transform"
        :class="c.small ? 'w-[min(150px,30%)]' : 'w-[min(190px,36%)]'"
        :style="cardStyle(c)"
      >
        <div
          class="hero-card flex items-center gap-2 rounded-xl border border-line bg-surface/85 shadow-[0_18px_40px_-18px_rgba(0,90,200,.45)] backdrop-blur-md sm:gap-2.5 sm:rounded-2xl"
          :class="c.small ? 'p-1.5 sm:p-2.5' : 'p-2 sm:p-3'"
          :style="{ animationDelay: `${-CARDS.indexOf(c) * 1.3}s` }"
        >
          <div
            class="grid shrink-0 place-items-center rounded-[9px] bg-gradient-to-br from-[#0aa2ff] to-[#0a5bff] text-white sm:rounded-[10px]"
            :class="c.small ? 'h-6 w-6 sm:h-8 sm:w-8' : 'h-7 w-7 sm:h-10 sm:w-10'"
          >
            <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" :class="c.small ? 'sm:h-4 sm:w-4' : 'sm:h-[18px] sm:w-[18px]'" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path :d="ICONS[c.key]" /></svg>
          </div>
          <div class="min-w-0">
            <p class="truncate font-bold leading-tight text-ink" :class="c.small ? 'text-[10px] sm:text-[11px]' : 'text-[11px] sm:text-[13px]'">{{ hn.modules[c.key].title }}</p>
            <p class="mt-0.5 hidden truncate leading-snug text-muted sm:block" :class="c.small ? 'text-[9px]' : 'text-[10.5px]'">{{ hn.modules[c.key].sub }}</p>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.orbit {
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 50%;
  transition: transform 0.3s ease-out;
}
.orbit--outer {
  width: 96%;
  height: 96%;
  margin: -48% 0 0 -48%;
  border: 1.6px solid rgba(40, 190, 255, 0.75);
  box-shadow: 0 0 12px rgba(56, 200, 255, 0.45), inset 0 0 10px rgba(56, 200, 255, 0.25);
}
.orbit--inner {
  width: 78%;
  height: 78%;
  margin: -39% 0 0 -39%;
  border: 1.6px dashed rgba(40, 190, 255, 0.75);
}
.orbit-sat {
  position: absolute;
  width: 10px;
  height: 10px;
  margin-top: -5px;
  border-radius: 50%;
  background: #e9fdff;
  box-shadow: 0 0 8px 3px rgba(120, 225, 255, 0.95), 0 0 22px 8px rgba(34, 190, 255, 0.55);
}
.orbit-sat--sm {
  width: 7px;
  height: 7px;
  margin-top: -3.5px;
}

/* gentle independent bob so the cards feel like they float */
.hero-card {
  animation: card-bob 7s ease-in-out infinite;
}
@keyframes card-bob {
  50% { transform: translateY(-7px); }
}
@media (prefers-reduced-motion: reduce) {
  .hero-card { animation: none; }
  .orbit { transition: none; }
}
</style>
