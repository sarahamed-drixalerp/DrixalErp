<script setup lang="ts">
/**
 * Ambient hero background:
 *  - CSS: three slow-drifting glowing orbs + a central pulse behind the logo
 *  - Canvas: floating rounded "pixels" (echoing the logo mark) joined by a faint mesh
 * The canvas pauses when off-screen or the tab is hidden, and renders a single
 * static frame for prefers-reduced-motion.
 */
interface Particle { x: number, y: number, s: number, vx: number, vy: number, a: number, c: string }

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let raf = 0
let w = 0
let h = 0
let particles: Particle[] = []
let visible = true
let reduced = false
let io: IntersectionObserver | null = null
const LINK_DIST = 130

function resize() {
  const el = canvas.value
  if (!el || !ctx) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  w = el.offsetWidth
  h = el.offsetHeight
  el.width = w * dpr
  el.height = h * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  const count = Math.min(64, Math.round(w / 24))
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    s: 3 + Math.random() * 8,
    vx: (Math.random() - 0.3) * 0.25,
    vy: -(0.12 + Math.random() * 0.4),
    a: 0.15 + Math.random() * 0.45,
    c: Math.random() > 0.5 ? '0,200,255' : '60,120,255',
  }))
  if (reduced) draw()
}

function draw() {
  if (!ctx) return
  ctx.clearRect(0, 0, w, h)

  // mesh lines
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]!
    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j]!
      const dx = p.x - q.x
      const dy = p.y - q.y
      const d2 = dx * dx + dy * dy
      if (d2 < LINK_DIST * LINK_DIST) {
        ctx.strokeStyle = `rgba(94,225,255,${(1 - Math.sqrt(d2) / LINK_DIST) * 0.12})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(p.x + p.s / 2, p.y + p.s / 2)
        ctx.lineTo(q.x + q.s / 2, q.y + q.s / 2)
        ctx.stroke()
      }
    }
  }

  // pixels
  for (const p of particles) {
    ctx.fillStyle = `rgba(${p.c},${p.a})`
    ctx.beginPath()
    ctx.roundRect(p.x, p.y, p.s, p.s, p.s * 0.25)
    ctx.fill()
  }
}

function step() {
  for (const p of particles) {
    p.x += p.vx
    p.y += p.vy
    if (p.y < -12 || p.x < -12 || p.x > w + 12) {
      p.y = h + 12
      p.x = Math.random() * w
    }
  }
  draw()
  raf = requestAnimationFrame(step)
}

function start() {
  if (reduced || raf || !visible || document.hidden) return
  raf = requestAnimationFrame(step)
}
function stop() {
  cancelAnimationFrame(raf)
  raf = 0
}
function onVisibility() { document.hidden ? stop() : start() }

onMounted(() => {
  const el = canvas.value
  if (!el) return
  ctx = el.getContext('2d')
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  resize()
  window.addEventListener('resize', resize, { passive: true })
  document.addEventListener('visibilitychange', onVisibility)
  io = new IntersectionObserver(([entry]) => {
    visible = !!entry?.isIntersecting
    visible ? start() : stop()
  })
  io.observe(el)
  start()
})

onBeforeUnmount(() => {
  stop()
  io?.disconnect()
  window.removeEventListener('resize', resize)
  document.removeEventListener('visibilitychange', onVisibility)
})
</script>

<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <!-- drifting orbs -->
    <div class="absolute -start-32 top-[12%] h-[420px] w-[420px] animate-drift rounded-full bg-brand-blue/30 blur-[90px]" />
    <div class="absolute -end-24 top-[48%] h-[380px] w-[380px] animate-drift-slow rounded-full bg-brand-cyan/20 blur-[90px]" />
    <div class="absolute bottom-[-160px] start-[30%] h-[360px] w-[520px] animate-drift-slow rounded-full bg-indigo-500/20 blur-[100px]" />
    <!-- central glow behind the logo -->
    <div
      class="absolute left-1/2 top-[44%] h-[min(760px,140vw)] w-[min(760px,140vw)] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow rounded-full blur-[30px]"
      style="background: radial-gradient(circle, rgba(0,200,255,.33), rgba(10,75,255,.16) 45%, transparent 70%)"
    />
    <!-- subtle grid -->
    <div
      class="absolute inset-0 opacity-[.07]"
      style="background-image: linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px); background-size: 64px 64px; mask-image: radial-gradient(ellipse at 50% 45%, #000 20%, transparent 70%); -webkit-mask-image: radial-gradient(ellipse at 50% 45%, #000 20%, transparent 70%);"
    />
    <canvas ref="canvas" class="absolute inset-0 h-full w-full" />
  </div>
</template>
