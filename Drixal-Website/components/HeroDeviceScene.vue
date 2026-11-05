<script setup lang="ts">
/** Laptop + phone workplace mock, in the style of a product hero. */
const { t } = useLocale()
const device = computed(() => t.value.heroDevice)
const cards = computed(() => t.value.heroWorkspace.cards)

const days = Array.from({ length: 28 }, (_, i) => i + 1)

const orbs = [
  { icon: 'people', pos: 'start-[2%] top-[6%]', delay: '0s' },
  { icon: 'chat', pos: 'end-[4%] top-[2%]', delay: '.8s' },
  { icon: 'share', pos: 'end-[1%] top-[34%]', delay: '1.2s' },
  { icon: 'shield', pos: 'start-[0%] bottom-[22%]', delay: '.4s' },
  { icon: 'bot', pos: 'end-[6%] bottom-[8%]', delay: '1.6s' },
]
</script>

<template>
  <div class="device-stage relative mx-auto h-full min-h-[380px] w-full max-w-[640px] sm:min-h-[460px]" :aria-label="t.heroDashboardAlt" role="img">
    <div class="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(0,200,255,.28),rgba(10,75,255,.08)_46%,transparent_70%)] blur-2xl" aria-hidden="true" />

    <div class="laptop-tilt relative z-10 mx-auto w-[84%] max-w-[520px] pt-8 sm:pt-6">
      <div class="rounded-t-[1.15rem] border border-slate-300/80 bg-gradient-to-b from-slate-100 to-slate-300 p-[7px] shadow-[0_28px_60px_-28px_rgba(10,40,120,.55)] dark:border-slate-600 dark:from-slate-700 dark:to-slate-800">
        <div class="overflow-hidden rounded-[0.7rem] bg-surface">
          <div class="flex items-center gap-2 border-b border-line px-2.5 py-1.5">
            <span class="grid size-5 shrink-0 place-items-center rounded-md bg-gradient-to-br from-brand-blue to-brand-cyan">
              <img src="/images/drixal-mark-white.png" alt="" width="20" height="16" class="w-3">
            </span>
            <span class="text-[9px] font-extrabold tracking-wide text-ink">DRIXAL</span>
            <span class="ms-auto hidden gap-2 text-[8px] font-semibold text-muted sm:flex">
              <span>{{ device.navHome }}</span>
              <span>{{ device.navServices }}</span>
              <span class="text-brand-blue">{{ device.navWorkspace }}</span>
            </span>
          </div>

          <div class="mx-2 mt-1.5 rounded-md bg-gradient-to-r from-brand-blue to-brand-cyan px-2 py-1.5 text-[8px] font-semibold leading-snug text-white sm:text-[9px]">
            {{ device.banner }}
          </div>

          <div class="grid grid-cols-3 gap-1.5 p-2">
            <div class="rounded-md border border-line bg-mist/80 p-1.5">
              <div class="mb-1 flex items-center justify-between">
                <span class="text-[8px] font-bold text-ink">{{ cards.tasks.title }}</span>
                <span class="rounded-full bg-brand-blue/10 px-1 text-[7px] font-bold text-brand-blue">{{ cards.tasks.badge }}</span>
              </div>
              <div v-for="(row, i) in cards.tasks.items" :key="i" class="mt-1 flex items-center gap-1">
                <span class="size-2 shrink-0 rounded-[3px] border" :class="row.done ? 'border-brand-blue bg-brand-blue' : 'border-line bg-surface'" />
                <span class="truncate text-[7px]" :class="row.done ? 'text-muted line-through' : 'text-ink'">{{ row.label }}</span>
              </div>
            </div>

            <div class="rounded-md border border-line bg-surface p-1.5">
              <p class="mb-1 text-[8px] font-bold text-ink">{{ cards.calendar.title }}</p>
              <div class="grid grid-cols-7 gap-[2px]">
                <span
                  v-for="d in days"
                  :key="d"
                  class="aspect-square rounded-[2px]"
                  :class="d === 12 ? 'bg-brand-blue' : d === 18 ? 'bg-brand-cyan' : 'bg-mist'"
                />
              </div>
            </div>

            <div class="rounded-md border border-line bg-surface p-1.5">
              <p class="text-[8px] font-bold text-ink">{{ cards.timesheet.title }}</p>
              <div class="mt-1 flex items-center gap-1.5">
                <div class="relative size-8 shrink-0 rounded-full" style="background: conic-gradient(#0a4bff 0 72%, rgb(var(--c-mist)) 72% 100%)">
                  <div class="absolute inset-[3px] grid place-items-center rounded-full bg-surface text-[7px] font-extrabold text-brand-blue">72%</div>
                </div>
                <p class="text-[7px] leading-tight text-muted">{{ cards.timesheet.meta }}</p>
              </div>
            </div>

            <div class="rounded-md border border-line bg-surface p-1.5">
              <p class="mb-1 text-[8px] font-bold text-ink">{{ cards.hub.title }}</p>
              <div class="flex gap-1">
                <span v-for="(item, i) in cards.hub.items" :key="i" class="flex-1 truncate rounded bg-mist px-0.5 py-1 text-center text-[6.5px] font-semibold text-ink">{{ item }}</span>
              </div>
            </div>

            <div class="rounded-md border border-line bg-surface p-1.5">
              <p class="mb-1 text-[8px] font-bold text-ink">{{ cards.inbox.title }}</p>
              <div v-for="(row, i) in cards.inbox.items" :key="i" class="mt-1 flex items-center gap-1">
                <span class="size-2.5 shrink-0 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan" />
                <span class="truncate text-[7px] font-semibold text-ink">{{ row.title }}</span>
              </div>
            </div>

            <div class="overflow-hidden rounded-md border border-line bg-surface">
              <div class="relative h-7 bg-mist">
                <div class="absolute inset-0 opacity-60" style="background-image: linear-gradient(rgba(10,75,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(10,75,255,.2) 1px, transparent 1px); background-size: 8px 8px;" />
                <span class="absolute start-1/2 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue" />
              </div>
              <p class="truncate px-1.5 py-1 text-[7px] font-bold text-ink">{{ cards.gps.title }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="relative h-2.5 rounded-b-xl bg-gradient-to-b from-slate-300 to-slate-400 shadow-[0_16px_24px_-16px_rgba(10,40,120,.65)] dark:from-slate-600 dark:to-slate-900">
        <div class="absolute start-1/2 top-0 h-1.5 w-16 -translate-x-1/2 rounded-b-md bg-slate-500/30" />
      </div>
    </div>

    <div class="absolute bottom-[2%] end-[1%] z-30 w-[31%] min-w-[108px] max-w-[158px] sm:end-[2%]">
      <div class="rounded-[1.35rem] border-[3px] border-[#0f1b33] bg-[#0f1b33] p-1 shadow-[0_22px_40px_-18px_rgba(8,20,60,.55)]">
        <div class="overflow-hidden rounded-[1.05rem] bg-surface">
          <div class="flex items-center justify-between px-2 pt-1.5 text-[7px] font-semibold text-muted">
            <span>9:41</span>
            <span class="h-1 w-8 rounded-full bg-ink/15" />
            <span>5G</span>
          </div>
          <p class="px-2 pt-1 text-[8px] font-extrabold text-ink">DRIXAL</p>
          <div class="mx-1.5 mt-1 rounded-md bg-gradient-to-r from-brand-blue to-brand-cyan px-1.5 py-1 text-[7px] font-semibold leading-tight text-white">
            {{ device.phoneTitle }}
          </div>
          <div class="px-2 py-1.5">
            <p class="text-[8px] font-bold text-ink">{{ device.requestsTitle }}</p>
            <div v-for="(row, i) in device.requests" :key="i" class="mt-1 flex items-center justify-between gap-1">
              <span class="truncate text-[7px] text-ink">{{ row.label }}</span>
              <span
                class="shrink-0 rounded-full px-1 py-px text-[6px] font-bold text-white"
                :class="row.tone === 'ok' ? 'bg-emerald-500' : row.tone === 'wait' ? 'bg-amber-500' : 'bg-brand-blue'"
              >{{ row.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-for="orb in orbs"
      :key="orb.icon"
      class="pointer-events-none absolute z-40 grid size-9 place-items-center rounded-full border border-white/80 bg-surface/95 text-brand-blue shadow-[0_12px_24px_-12px_rgba(10,75,255,.55)] animate-float sm:size-11"
      :class="orb.pos"
      :style="{ animationDelay: orb.delay }"
      aria-hidden="true"
    >
      <svg v-if="orb.icon === 'people'" viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM3 20v-1a5 5 0 0110 0v1M16 4.2a3.2 3.2 0 010 6.2M21 20v-1a5 5 0 00-3.5-4.7" /></svg>
      <svg v-else-if="orb.icon === 'chat'" viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 6h14a1 1 0 011 1v8a1 1 0 01-1 1H9l-4 3v-3H5a1 1 0 01-1-1V7a1 1 0 011-1z" /></svg>
      <svg v-else-if="orb.icon === 'share'" viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="6" cy="12" r="2.2" /><circle cx="17" cy="6.5" r="2.2" /><circle cx="17" cy="17.5" r="2.2" /><path d="M8 11l7-3.5M8 13l7 3.5" /></svg>
      <svg v-else-if="orb.icon === 'shield'" viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l8 3.5v6c0 4.5-3.2 7.6-8 8.5-4.8-.9-8-4-8-8.5v-6L12 3z" /></svg>
      <svg v-else viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="8" width="14" height="10" rx="3" /><circle cx="9" cy="13" r="1" /><circle cx="15" cy="13" r="1" /><path d="M12 4v4M9 4h6" /></svg>
    </div>
  </div>
</template>

<style scoped>
.device-stage { perspective: 1400px; }
.laptop-tilt {
  transform: rotateX(7deg) rotateY(-11deg);
  transform-style: preserve-3d;
}
:global(html[dir='rtl']) .laptop-tilt {
  transform: rotateX(7deg) rotateY(11deg);
}
</style>
