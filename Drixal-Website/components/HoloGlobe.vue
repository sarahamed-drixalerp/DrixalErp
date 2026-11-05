<script setup lang="ts">
/**
 * Holographic Earth rendered on a canvas with a real orthographic projection
 * (d3-geo + Natural Earth 110m land from world-atlas).
 *
 *  - bright cyan ocean, glowing white continents, lat/long graticule,
 *    faint "see-through" back hemisphere, specular + rim light
 *  - auto-spins slowly; `progress` (0–1, hero scroll) adds extra rotation
 *  - pauses off-screen / hidden tab; reduced motion → static frame that still follows scroll
 *
 * Geo libs + land data are imported lazily on the client; SSR shows the CSS ocean sphere.
 */
import type { GeoPermissibleObjects } from 'd3-geo'

const props = withDefaults(defineProps<{ progress?: number }>(), { progress: 0 })

const canvas = ref<HTMLCanvasElement | null>(null)
const ready = ref(false)

const TILT = -16 // degrees: northern hemisphere tilted toward the viewer
const AUTO_DEG_PER_SEC = 6
const SCROLL_DEG = 160
const START_LON = -15 // Africa / Europe facing the viewer on load

let raf = 0
let lastT = 0
let spin = 0
let visible = true
let reduced = false
let io: IntersectionObserver | null = null
let ro: ResizeObserver | null = null
let draw: (() => void) | null = null

onMounted(async () => {
  const el = canvas.value
  if (!el) return
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [{ geoOrthographic, geoPath, geoGraticule10 }, { feature }, landTopo] = await Promise.all([
    import('d3-geo'),
    import('topojson-client'),
    import('world-atlas/land-110m.json').then(m => (m.default ?? m) as any),
  ])
  if (!canvas.value) return

  const land = feature(landTopo, landTopo.objects.land) as unknown as GeoPermissibleObjects
  const graticule = geoGraticule10()
  const sphere: GeoPermissibleObjects = { type: 'Sphere' }
  const ctx = el.getContext('2d')!
  let size = 0
  let dpr = 1

  const front = geoOrthographic().clipAngle(90)
  const back = geoOrthographic().clipAngle(90).reflectX(true)
  const pathF = geoPath(front, ctx)
  const pathB = geoPath(back, ctx)

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    size = el!.clientWidth
    el!.width = el!.height = Math.round(size * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    const r = size / 2 - 1
    front.scale(r).translate([size / 2, size / 2])
    back.scale(r).translate([size / 2, size / 2])
    draw?.()
  }

  draw = () => {
    if (!size) return
    const c = size / 2
    const r = c - 1
    const lon = START_LON + spin + props.progress * SCROLL_DEG
    front.rotate([lon, TILT, 0])
    // the far side seen through the glass: mirrored view from behind
    back.rotate([lon + 180, -TILT, 0])

    ctx.clearRect(0, 0, size, size)
    ctx.save()
    ctx.beginPath()
    ctx.arc(c, c, r, 0, Math.PI * 2)
    ctx.clip()

    // ocean
    const ocean = ctx.createRadialGradient(c * 0.92, c * 1.18, r * 0.05, c, c, r)
    ocean.addColorStop(0, '#8fe4ff')
    ocean.addColorStop(0.3, '#3db4f5')
    ocean.addColorStop(0.68, '#1288e0')
    ocean.addColorStop(1, '#0a63c2')
    ctx.fillStyle = ocean
    ctx.fillRect(0, 0, size, size)

    // back hemisphere continents (faint, holographic)
    ctx.beginPath()
    pathB(land)
    ctx.fillStyle = 'rgba(255,255,255,.13)'
    ctx.fill()

    // graticule
    ctx.beginPath()
    pathF(graticule)
    ctx.strokeStyle = 'rgba(255,255,255,.38)'
    ctx.lineWidth = 0.7
    ctx.stroke()

    // front continents with glow
    const landFill = ctx.createLinearGradient(0, 0, size, size)
    landFill.addColorStop(0, '#ffffff')
    landFill.addColorStop(0.55, '#ecfdff')
    landFill.addColorStop(1, '#c4f3ff')
    ctx.beginPath()
    pathF(land)
    ctx.shadowColor = 'rgba(220,250,255,.95)'
    ctx.shadowBlur = 9
    ctx.fillStyle = landFill
    ctx.globalAlpha = 0.97
    ctx.fill()
    ctx.shadowBlur = 0
    ctx.globalAlpha = 1
    ctx.strokeStyle = 'rgba(255,255,255,.95)'
    ctx.lineWidth = 0.6
    ctx.stroke()

    // specular highlight (top-left) + luminous bottom
    const spec = ctx.createRadialGradient(c * 0.62, c * 0.5, 0, c * 0.62, c * 0.5, r * 0.85)
    spec.addColorStop(0, 'rgba(255,255,255,.28)')
    spec.addColorStop(0.35, 'rgba(255,255,255,.07)')
    spec.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = spec
    ctx.fillRect(0, 0, size, size)

    const bottom = ctx.createRadialGradient(c, c * 2.05, 0, c, c * 2.05, r * 1.15)
    bottom.addColorStop(0, 'rgba(200,248,255,.6)')
    bottom.addColorStop(0.45, 'rgba(110,220,255,.14)')
    bottom.addColorStop(1, 'rgba(120,225,255,0)')
    ctx.fillStyle = bottom
    ctx.fillRect(0, 0, size, size)

    // limb darkening → glassy rim light
    const limb = ctx.createRadialGradient(c, c, r * 0.72, c, c, r)
    limb.addColorStop(0, 'rgba(8,90,180,0)')
    limb.addColorStop(0.85, 'rgba(6,80,170,.25)')
    limb.addColorStop(1, 'rgba(200,245,255,.65)')
    ctx.fillStyle = limb
    ctx.fillRect(0, 0, size, size)
    ctx.restore()

    // crisp outline
    ctx.beginPath()
    pathF(sphere)
    ctx.strokeStyle = 'rgba(235,253,255,.85)'
    ctx.lineWidth = 1.2
    ctx.stroke()
  }

  function frame(t: number) {
    const dt = lastT ? Math.min((t - lastT) / 1000, 0.1) : 0
    lastT = t
    spin = (spin + dt * AUTO_DEG_PER_SEC) % 360
    draw?.()
    raf = requestAnimationFrame(frame)
  }
  const start = () => {
    if (reduced || raf || !visible || document.hidden) return
    lastT = 0
    raf = requestAnimationFrame(frame)
  }
  const stop = () => { cancelAnimationFrame(raf); raf = 0 }
  const onVis = () => (document.hidden ? stop() : start())

  ro = new ResizeObserver(resize)
  ro.observe(el)
  io = new IntersectionObserver(([e]) => { visible = !!e?.isIntersecting; visible ? start() : stop() })
  io.observe(el)
  document.addEventListener('visibilitychange', onVis)
  resize()
  ready.value = true
  start()

  onBeforeUnmount(() => {
    stop()
    ro?.disconnect()
    io?.disconnect()
    document.removeEventListener('visibilitychange', onVis)
  })
})

// Reduced motion: no loop, but still redraw when scroll progress changes.
watch(() => props.progress, () => { if (reduced) draw?.() })
</script>

<template>
  <div class="holo-globe relative aspect-square w-full rounded-full">
    <canvas
      ref="canvas"
      class="absolute inset-0 h-full w-full rounded-full transition-opacity duration-700"
      :class="ready ? 'opacity-100' : 'opacity-0'"
      aria-hidden="true"
    />
  </div>
</template>

<style scoped>
/* SSR / loading state: plain glowing ocean sphere so the hero never looks empty */
.holo-globe {
  background: radial-gradient(circle at 46% 59%, #8fe4ff 0%, #3db4f5 30%, #1288e0 68%, #0a63c2 100%);
  box-shadow:
    0 0 0 1px rgba(225, 252, 255, 0.7),
    0 0 28px 4px rgba(56, 200, 255, 0.55),
    0 0 90px 18px rgba(34, 190, 255, 0.35);
}
</style>
