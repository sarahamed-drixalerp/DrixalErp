<script setup lang="ts">
withDefaults(defineProps<{ eyebrow: string, title: string, lead?: string, dark?: boolean, center?: boolean }>(), {
  lead: '',
  dark: false,
  center: true,
})
</script>

<template>
  <div v-motion="reveal()" class="mb-12 flex flex-col" :class="center ? 'items-center text-center' : 'items-start'">
    <span class="eyebrow" :class="dark && 'text-brand-cyan'">{{ eyebrow }}</span>
    <h2 class="h2">{{ title }}</h2>
    <p v-if="lead" class="lead" :class="dark && 'text-white/70'">{{ lead }}</p>
  </div>
</template>
