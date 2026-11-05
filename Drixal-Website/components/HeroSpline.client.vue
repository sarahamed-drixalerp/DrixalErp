<script setup lang="ts">
/**
 * Spline.design 3D canvas for the hero.
 * Load a .splinecode scene (Export → Code → Vanilla JS in the Spline editor).
 * Scroll progress is pushed into a Spline variable named `scroll` (0–1) when present,
 * and a gentle camera/root rotation is applied as a fallback.
 *
 * Set NUXT_PUBLIC_SPLINE_SCENE to your production scene URL.
 */
import type { Application as SplineApp, SPEObject } from '@splinetool/runtime'

const props = withDefaults(defineProps<{
  scene: string
  progress?: number
}>(), { progress: 0 })

const emit = defineEmits<{
  ready: []
  error: [message: string]
}>()

const canvas = ref<HTMLCanvasElement | null>(null)
const loading = ref(true)
const failed = ref(false)

let app: SplineApp | null = null
let rootObj: SPEObject | null = null
let hasScrollVar = false
let disposed = false

async function boot() {
  if (!canvas.value || !props.scene || disposed) return
  loading.value = true
  failed.value = false

  try {
    const { Application } = await import('@splinetool/runtime')
    const instance = new Application(canvas.value)
    await instance.load(props.scene)
    if (disposed) {
      instance.dispose()
      return
    }
    app = instance

    // Prefer an authoring-time variable named `scroll` (Number, 0–1) in Spline.
    try {
      const vars = instance.getVariables?.() as Record<string, unknown> | undefined
      hasScrollVar = !!vars && Object.prototype.hasOwnProperty.call(vars, 'scroll')
      if (hasScrollVar) instance.setVariable('scroll', props.progress)
    }
    catch { hasScrollVar = false }

    // Soft fallback: rotate a common root object with scroll.
    rootObj
      = instance.findObjectByName('Camera')
      || instance.findObjectByName('Scene')
      || instance.findObjectByName('Group')
      || instance.findObjectByName('Root')
      || null

    applyProgress(props.progress)
    loading.value = false
    emit('ready')
  }
  catch (e) {
    failed.value = true
    loading.value = false
    emit('error', e instanceof Error ? e.message : 'Failed to load Spline scene')
  }
}

function applyProgress(p: number) {
  if (!app) return
  if (hasScrollVar) {
    try { app.setVariable('scroll', p) } catch { /* variable may be read-only */ }
  }
  if (rootObj && 'rotation' in rootObj) {
    // Subtle orbit — keep interactions usable
    rootObj.rotation.y = p * Math.PI * 0.55
    rootObj.rotation.x = (0.12 - p * 0.18)
  }
}

watch(() => props.progress, applyProgress)

watch(() => props.scene, async () => {
  if (app) {
    try { app.dispose() } catch { /* already gone */ }
    app = null
    rootObj = null
  }
  await boot()
})

onMounted(boot)

onBeforeUnmount(() => {
  disposed = true
  if (app) {
    try { app.dispose() } catch { /* noop */ }
    app = null
  }
})

// Pause when tab hidden to save GPU
onMounted(() => {
  const onVis = () => {
    if (!app) return
    try {
      if (document.hidden) app.stop()
      else app.play()
    }
    catch { /* older runtimes */ }
  }
  document.addEventListener('visibilitychange', onVis)
  onBeforeUnmount(() => document.removeEventListener('visibilitychange', onVis))
})
</script>

<template>
  <div class="relative aspect-[5/4] w-full overflow-hidden rounded-[28px] sm:aspect-square lg:aspect-auto lg:min-h-[520px] lg:h-[min(72vh,640px)]">
    <!-- loading shimmer -->
    <div
      v-if="loading"
      class="absolute inset-0 z-10 animate-pulse rounded-[28px] bg-gradient-to-br from-brand-blue/10 via-white/40 to-brand-cyan/15"
      aria-hidden="true"
    />

    <canvas
      ref="canvas"
      class="absolute inset-0 h-full w-full touch-none"
      :class="loading || failed ? 'opacity-0' : 'opacity-100 transition-opacity duration-700'"
    />

    <!-- soft frame so Spline blends with the light hero -->
    <div
      class="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/70"
      aria-hidden="true"
      style="box-shadow: inset 0 0 80px rgba(10,75,255,.06)"
    />

    <p
      v-if="failed"
      class="absolute inset-0 z-10 grid place-items-center px-6 text-center text-sm font-semibold text-muted"
    >
      Couldn’t load the 3D scene.
    </p>
  </div>
</template>
