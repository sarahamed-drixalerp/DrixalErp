<script setup lang="ts">
import type { Project } from '~/types/content'

const props = defineProps<{ project: Project }>()
const { t } = useLocale()

const imgFailed = ref(false)
const showImage = computed(() => !!props.project.thumbnailUrl && !imgFailed.value)
const initials = computed(() =>
  props.project.name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase(),
)
</script>

<template>
  <article
    class="group flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-surface transition duration-300
           hover:-translate-y-1.5 hover:border-brand-blue/30 hover:shadow-brand-lg"
  >
    <div class="relative aspect-[16/10] overflow-hidden bg-navy">
      <img
        v-if="showImage"
        :src="project.thumbnailUrl!"
        :alt="project.name"
        loading="lazy"
        decoding="async"
        width="640"
        height="400"
        class="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
        @error="imgFailed = true"
      >
      <!-- branded placeholder when no thumbnail -->
      <div
        v-else
        class="flex h-full w-full items-center justify-center"
        style="background: radial-gradient(ellipse at 30% 20%, #0b2a8a, #071545 55%, #050b1f)"
      >
        <img src="/images/drixal-mark-white.png" alt="" class="absolute end-4 top-4 h-6 w-auto opacity-40" loading="lazy">
        <span class="text-5xl font-extrabold text-gradient transition duration-500 group-hover:scale-110" aria-hidden="true">{{ initials }}</span>
      </div>
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent opacity-0 transition group-hover:opacity-100" />
    </div>

    <div class="flex flex-1 flex-col p-6">
      <h3 class="text-lg font-bold">{{ project.name }}</h3>
      <p v-if="project.summary" class="mt-2 text-[.95rem] text-muted">{{ project.summary }}</p>

      <ul v-if="project.tags.length" class="mt-4 flex flex-wrap gap-2" :aria-label="`${project.name} tech stack`">
        <li
          v-for="tag in project.tags"
          :key="tag"
          dir="ltr"
          class="rounded-full bg-brand-blue/[.07] px-3 py-1 text-xs font-semibold text-brand-blue"
        >{{ tag }}</li>
      </ul>

      <a
        v-if="project.liveUrl"
        :href="project.liveUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-brand-blue hover:underline"
      >
        {{ t.projects.visit }}
        <svg viewBox="0 0 24 24" class="h-4 w-4 rtl:-scale-x-100" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg>
      </a>
    </div>
  </article>
</template>
