<script setup lang="ts">
/** Floating glass workspace cards flanking the hero copy (left / right). */
defineProps<{
  side: 'left' | 'right'
}>()

const { t } = useLocale()
const cards = computed(() => t.value.heroWorkspace.cards)

/** Shared card shell — matches hero / surface tokens in light & dark. */
const card =
  'rounded-2xl border border-line/80 bg-surface/90 p-3 shadow-[0_14px_36px_-18px_rgba(10,30,100,.28)] backdrop-blur-md dark:border-line dark:bg-surface/85 dark:shadow-[0_14px_36px_-18px_rgba(0,0,0,.45)]'
</script>

<template>
  <div
    class="relative hidden h-full min-h-[380px] w-full sm:min-h-[460px] lg:block"
    :aria-hidden="true"
  >
    <!-- Soft brand glow — tinted to blend with hero-tone -->
    <div
      class="pointer-events-none absolute inset-0 opacity-70"
      :style="side === 'left'
        ? 'background: radial-gradient(ellipse 80% 70% at 70% 50%, rgb(var(--c-hero) / 0), transparent 10%), radial-gradient(ellipse 80% 70% at 70% 50%, rgba(10,75,255,.16), transparent 65%), radial-gradient(ellipse 60% 50% at 40% 70%, rgba(0,200,255,.12), transparent 60%);'
        : 'background: radial-gradient(ellipse 80% 70% at 30% 45%, rgba(0,200,255,.14), transparent 65%), radial-gradient(ellipse 55% 50% at 60% 70%, rgba(99,102,241,.12), transparent 58%);'"
    />

    <!-- LEFT cards — packed from the top -->
    <template v-if="side === 'left'">
      <div :class="[card, 'absolute start-0 top-[calc(6%+3px)] z-20 w-[92%] max-w-[230px] animate-float p-3']">
        <div class="mb-2 flex items-center justify-between gap-2">
          <span class="text-[13px] font-bold text-ink">{{ cards.tasks.title }}</span>
          <span class="rounded-full bg-brand-blue/10 px-2 py-0.5 text-[10px] font-bold text-brand-blue">{{ cards.tasks.badge }}</span>
        </div>
        <ul class="space-y-1.5">
          <li v-for="(row, i) in cards.tasks.items" :key="i" class="flex items-center gap-2 text-[11px] text-muted">
            <span
              class="grid size-4 shrink-0 place-items-center rounded border"
              :class="row.done ? 'border-brand-blue bg-brand-blue text-white' : 'border-line bg-mist'"
            >
              <svg v-if="row.done" viewBox="0 0 12 12" class="size-2.5" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M2.5 6.2l2.4 2.4 4.6-5" /></svg>
            </span>
            <span :class="row.done ? 'line-through opacity-55' : 'text-ink'">{{ row.label }}</span>
          </li>
        </ul>
      </div>

      <div :class="[card, 'absolute start-[6%] top-[34%] z-20 w-[88%] max-w-[200px] animate-float']" style="animation-delay: .8s;">
        <p class="mb-1.5 text-[12px] font-bold text-ink">{{ cards.timesheet.title }}</p>
        <div class="flex items-center gap-3">
          <div
            class="relative size-12 shrink-0 rounded-full"
            style="background: conic-gradient(#0a4bff 0 72%, rgb(var(--c-mist)) 72% 100%);"
          >
            <div class="absolute inset-[4px] grid place-items-center rounded-full bg-surface text-[10px] font-extrabold text-brand-blue">72%</div>
          </div>
          <div>
            <p class="text-[11px] font-semibold text-ink">{{ cards.timesheet.label }}</p>
            <p class="text-[10px] text-muted">{{ cards.timesheet.meta }}</p>
          </div>
        </div>
      </div>

      <div :class="[card, 'absolute start-[2%] top-[58%] z-30 w-[94%] max-w-[220px] animate-float-slow']" style="animation-delay: .2s;">
        <p class="mb-2 text-[12px] font-bold text-ink">{{ cards.hub.title }}</p>
        <div class="grid grid-cols-3 gap-1.5">
          <div v-for="(item, i) in cards.hub.items" :key="i" class="flex flex-col items-center gap-1 rounded-xl bg-mist px-1.5 py-1.5">
            <span
              class="grid size-7 place-items-center rounded-lg text-white"
              :class="i === 0 ? 'bg-brand-blue' : i === 1 ? 'bg-brand-cyan' : 'bg-indigo-500'"
            >
              <svg v-if="i === 0" viewBox="0 0 24 24" class="size-3.5" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 7V3m8 4V3M4 11h16M5 7h14a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z" /></svg>
              <svg v-else-if="i === 1" viewBox="0 0 24 24" class="size-3.5" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
              <svg v-else viewBox="0 0 24 24" class="size-3.5" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
            </span>
            <span class="text-center text-[9px] font-semibold leading-tight text-ink">{{ item }}</span>
          </div>
        </div>
      </div>

      <div class="pointer-events-none absolute end-2 top-[28%] z-40 grid size-9 place-items-center rounded-xl border border-line bg-surface text-brand-blue shadow-[0_10px_24px_-10px_rgba(10,75,255,.4)] animate-float">
        <svg viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 7V3m8 4V3M4 11h16M5 7h14a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z" /></svg>
      </div>
    </template>

    <!-- RIGHT cards — packed from the top -->
    <template v-else>
      <div :class="[card, 'absolute end-0 top-[calc(6%+3px)] z-30 w-[92%] max-w-[210px] animate-float-slow']" style="animation-delay: .4s;">
        <div class="mb-1.5 flex items-center justify-between">
          <span class="text-[13px] font-bold text-ink">{{ cards.inbox.title }}</span>
          <span class="grid size-5 place-items-center rounded-full bg-rose-500 text-[10px] font-bold text-white">{{ cards.inbox.count }}</span>
        </div>
        <div class="space-y-1">
          <div v-for="(row, i) in cards.inbox.items" :key="i" class="flex items-center gap-2 rounded-lg bg-mist px-2 py-1.5">
            <span class="size-6 shrink-0 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan" />
            <div class="min-w-0 flex-1">
              <p class="truncate text-[11px] font-semibold text-ink">{{ row.title }}</p>
              <p class="truncate text-[10px] text-muted">{{ row.meta }}</p>
            </div>
            <span v-if="row.badge" class="grid size-4 shrink-0 place-items-center rounded-full bg-rose-500 text-[8px] font-bold text-white">{{ row.badge }}</span>
          </div>
        </div>
      </div>

      <div :class="[card, 'absolute end-[4%] top-[36%] z-20 w-[90%] max-w-[200px] animate-float']" style="animation-delay: 1.1s;">
        <p class="mb-1.5 text-[12px] font-bold text-ink">{{ cards.calendar.title }}</p>
        <div class="space-y-1">
          <div v-for="(row, i) in cards.calendar.items" :key="i" class="flex gap-2">
            <span class="w-8 shrink-0 pt-0.5 text-[9px] font-bold text-muted">{{ row.time }}</span>
            <span
              class="flex-1 rounded-md px-2 py-1 text-[10px] font-semibold text-white"
              :class="i === 0 ? 'bg-brand-blue' : i === 1 ? 'bg-brand-cyan' : 'bg-indigo-500'"
            >{{ row.label }}</span>
          </div>
        </div>
      </div>

      <div :class="[card, 'absolute end-0 top-[62%] z-20 w-[88%] max-w-[180px] animate-float-slow overflow-hidden !p-0']" style="animation-delay: 1.4s;">
        <div class="relative h-14 bg-mist">
          <div class="absolute inset-0 opacity-50" style="background-image: linear-gradient(rgba(10,75,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(10,75,255,.18) 1px, transparent 1px); background-size: 14px 14px;" />
          <div class="absolute inset-0 bg-gradient-to-br from-brand-blue/15 via-brand-cyan/15 to-transparent" />
          <span class="absolute start-1/2 top-1/2 grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand-blue text-white shadow-lg shadow-brand-blue/30">
            <svg viewBox="0 0 24 24" class="size-3.5" fill="currentColor"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" /></svg>
          </span>
        </div>
        <div class="bg-surface/90 px-3 py-2">
          <p class="text-[11px] font-bold text-ink">{{ cards.gps.title }}</p>
          <p class="text-[10px] text-muted">{{ cards.gps.meta }}</p>
        </div>
      </div>

      <div class="pointer-events-none absolute start-2 top-[28%] z-40 grid size-8 place-items-center rounded-xl border border-line bg-surface text-brand-blue shadow-[0_10px_24px_-10px_rgba(10,75,255,.35)] animate-float-slow" style="animation-delay: .6s;">
        <svg viewBox="0 0 24 24" class="size-3.5" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6L9 17l-5-5" /></svg>
      </div>
      <div class="pointer-events-none absolute start-4 top-[54%] z-40 grid size-8 place-items-center rounded-xl border border-line bg-surface text-brand-cyan shadow-[0_10px_24px_-10px_rgba(0,200,255,.35)] animate-float" style="animation-delay: 1s;">
        <svg viewBox="0 0 24 24" class="size-3.5" fill="currentColor"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" /></svg>
      </div>
    </template>
  </div>
</template>
