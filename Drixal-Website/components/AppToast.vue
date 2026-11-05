<script setup lang="ts">
const { toasts, dismiss } = useToast()
const { t } = useLocale()

const STYLES = {
  success: { bar: 'bg-emerald-500', icon: 'M5 12l5 5 9-10' },
  error: { bar: 'bg-rose-500', icon: 'M12 8v5M12 16.5v.01M12 3l9.5 17h-19z' },
  info: { bar: 'bg-brand-cyan', icon: 'M12 11v6M12 7.5v.01M12 21a9 9 0 110-18 9 9 0 010 18z' },
} as const
</script>

<template>
  <div class="pointer-events-none fixed inset-x-4 bottom-4 z-[60] flex flex-col items-center gap-3 sm:inset-x-auto sm:end-6 sm:items-end" aria-live="polite">
    <TransitionGroup
      enter-from-class="translate-y-4 opacity-0"
      leave-to-class="translate-y-2 opacity-0"
      enter-active-class="transition duration-300"
      leave-active-class="transition duration-200"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :role="toast.kind === 'error' ? 'alert' : 'status'"
        class="pointer-events-auto flex w-full max-w-sm items-start gap-3 overflow-hidden rounded-2xl bg-navy-2 py-4 pe-3 ps-4 text-white shadow-2xl ring-1 ring-white/10"
      >
        <span class="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full" :class="STYLES[toast.kind].bar">
          <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="STYLES[toast.kind].icon" /></svg>
        </span>
        <p class="flex-1 text-sm font-semibold leading-snug">{{ toast.message }}</p>
        <button type="button" class="rounded p-1 text-white/60 transition hover:text-white" :aria-label="t.close" @click="dismiss(toast.id)">
          <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>
