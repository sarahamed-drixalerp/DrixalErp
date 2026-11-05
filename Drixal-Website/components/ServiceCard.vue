<script setup lang="ts">
import type { Service } from '~/types/content'

defineProps<{ service: Service }>()
</script>

<template>
  <article
    class="group relative h-full overflow-hidden rounded-[20px] border border-line bg-surface p-8 transition duration-300
           hover:-translate-y-1.5 hover:border-transparent hover:shadow-brand-lg"
  >
    <!-- gradient fill + glow ring on hover -->
    <div class="absolute inset-0 bg-brand opacity-0 transition duration-300 group-hover:opacity-100" aria-hidden="true" />
    <div class="absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/0 transition group-hover:ring-white/25" aria-hidden="true" />

    <div class="relative">
      <div
        class="mb-5 grid h-[54px] w-[54px] place-items-center rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-cyan/20 text-brand-blue
               transition duration-300 group-hover:scale-110 group-hover:bg-none group-hover:bg-white/20 group-hover:text-white"
      >
        <ServiceIcon :icon="service.icon" />
      </div>
      <h3 class="mb-2 text-lg font-bold transition-colors group-hover:text-white">{{ service.title }}</h3>
      <p class="text-[.95rem] text-muted transition-colors group-hover:text-white/90">{{ service.description }}</p>
    </div>
  </article>
</template>
