<script setup lang="ts">
defineProps<{ dark?: boolean }>()
defineEmits<{ retry: [] }>()
const { t } = useLocale()
</script>

<template>
  <div
    role="alert"
    class="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-dashed p-8 text-center"
    :class="dark ? 'border-white/20 text-white/75' : 'border-line text-muted'"
  >
    <p class="font-semibold">{{ t.state.loadError }}</p>
    <button type="button" class="btn btn-primary px-5 py-2.5 text-sm" @click="$emit('retry')">{{ t.state.retry }}</button>
  </div>
</template>
