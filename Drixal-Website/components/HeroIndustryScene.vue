<script setup lang="ts">
/** Three industry packs floating around the centered hero copy. */
const { t } = useLocale()

/** Leave the middle clear for title + CTAs. */
const pose = [
  { side: 'start' as const, y: '14%', rot: -7, delay: '0s', icon: 'from-brand-blue to-brand-cyan', bar: ['bg-brand-blue', 'bg-brand-cyan', 'bg-brand-sky'] },
  { side: 'end' as const, y: '10%', rot: 5, delay: '.45s', icon: 'from-brand-cyan to-brand-sky', bar: ['bg-brand-cyan', 'bg-brand-sky', 'bg-brand-blue'] },
  { side: 'end' as const, y: '62%', rot: -4, delay: '.9s', icon: 'from-brand-blue to-brand-periwinkle', bar: ['bg-brand-blue', 'bg-brand-periwinkle', 'bg-brand-cyan'] },
]

const items = computed(() =>
  t.value.heroIndustry.packs.map((pack, i) => ({ pack, ...(pose[i] ?? pose[0]!) })),
)
</script>

<template>
  <!-- Desktop: cards orbit the centered copy -->
  <div
    class="pointer-events-none absolute inset-0 hidden lg:block"
    :aria-label="t.heroIndustry.ariaLabel"
    role="img"
  >
    <div
      class="absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,200,255,.22),rgba(10,75,255,.08)_50%,transparent_72%)] blur-2xl"
      aria-hidden="true"
    />

    <div
      v-for="(item, i) in items"
      :key="item.pack.icon"
      class="absolute w-[min(100%,240px)] animate-float"
      :class="item.side === 'start' ? 'start-0 xl:start-2' : 'end-0 xl:end-2'"
      :style="{
        top: item.y,
        zIndex: 10 + i,
        animationDelay: item.delay,
      }"
    >
      <article
        class="rounded-3xl border border-white/70 bg-surface/90 p-4 shadow-[0_22px_46px_-24px_rgba(10,50,160,.5)] backdrop-blur-md dark:border-line sm:p-5"
        :style="{ transform: `rotate(${item.rot}deg)` }"
      >
        <div class="flex items-center gap-3">
          <span
            class="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-brand"
            :class="item.icon"
          >
            <ServiceIcon :icon="item.pack.icon" class="!h-5 !w-5" />
          </span>
          <div class="min-w-0">
            <h3 class="truncate text-base font-extrabold text-ink">{{ item.pack.title }}</h3>
            <p class="mt-0.5 text-[12px] leading-snug text-muted">{{ item.pack.sub }}</p>
          </div>
        </div>
        <div class="mt-3 flex gap-1.5" aria-hidden="true">
          <span class="h-1.5 flex-1 rounded-full" :class="item.bar[0]" />
          <span class="h-1.5 w-8 rounded-full" :class="item.bar[1]" />
          <span class="h-1.5 w-5 rounded-full" :class="item.bar[2]" />
        </div>
      </article>
    </div>
  </div>

  <!-- Mobile / tablet: compact row under the copy -->
  <div
    class="relative z-10 mx-auto grid w-full max-w-xl gap-3 sm:grid-cols-3 lg:hidden"
    :aria-label="t.heroIndustry.ariaLabel"
  >
    <article
      v-for="item in items"
      :key="item.pack.icon"
      class="rounded-2xl border border-white/70 bg-surface/90 p-3 shadow-[0_14px_32px_-20px_rgba(10,50,160,.45)] backdrop-blur-md dark:border-line"
    >
      <div class="flex items-center gap-2.5">
        <span
          class="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white shadow-brand"
          :class="item.icon"
        >
          <ServiceIcon :icon="item.pack.icon" class="!h-4 !w-4" />
        </span>
        <div class="min-w-0">
          <h3 class="truncate text-sm font-extrabold text-ink">{{ item.pack.title }}</h3>
          <p class="mt-0.5 text-[11px] leading-snug text-muted">{{ item.pack.sub }}</p>
        </div>
      </div>
    </article>
  </div>
</template>
