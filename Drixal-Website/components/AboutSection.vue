<script setup lang="ts">
const { t, isRtl } = useLocale()
const { stats } = usePortfolioData()

const highlightStat = computed(() => stats.value[0] ?? { value: '15+', label: isRtl.value ? 'خدمة متصلة' : 'Connected services' })
</script>

<template>
  <section id="about" class="section section-tone-a relative overflow-hidden">
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="absolute -start-24 top-10 h-72 w-72 rounded-full bg-brand-blue/[.07] blur-[100px]" />
      <div class="absolute -end-16 bottom-0 h-80 w-80 rounded-full bg-brand-cyan/[.08] blur-[110px]" />
    </div>

    <div class="container-site relative">
      <header v-motion="reveal()" class="mx-auto mb-12 max-w-2xl text-center">
        <span class="mb-4 inline-flex items-center rounded-full border border-line bg-surface/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[.14em] text-muted backdrop-blur-sm">
          {{ t.about.eyebrow }}
        </span>
        <h2 class="h2 text-ink">{{ t.about.title }}</h2>
        <p class="lead mx-auto text-muted">{{ t.about.lead }}</p>
      </header>

      <div class="grid gap-4 md:gap-5 lg:grid-cols-3 lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]">
        <!-- Tall featured card -->
        <article
          v-motion="reveal(60)"
          class="flex h-full flex-col overflow-hidden rounded-[28px] bg-surface p-5 shadow-[0_8px_30px_rgba(11,19,48,.04)] sm:p-6 lg:row-span-2"
        >
          <div class="overflow-hidden rounded-[20px] bg-mist">
            <img
              src="/images/drixal-hero.png"
              :alt="t.about.imageAlt"
              width="1543"
              height="1019"
              loading="lazy"
              decoding="async"
              class="aspect-square w-full object-cover object-top"
            >
          </div>
          <p class="mt-6 flex-1 text-[1.05rem] font-bold leading-snug tracking-tight text-ink sm:text-lg">
            {{ t.about.featured.body }}
          </p>
          <a
            href="#platform"
            class="mt-6 inline-flex w-fit items-center gap-3 rounded-full bg-navy py-2.5 pe-2.5 ps-5 text-sm font-bold text-white transition hover:bg-navy-2"
          >
            {{ t.about.featured.cta }}
            <span class="grid size-9 place-items-center rounded-full bg-white/15" aria-hidden="true">
              <svg viewBox="0 0 24 24" class="size-4 rtl:rotate-180" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </a>
        </article>

        <!-- Trust card -->
        <article
          v-motion="reveal(120)"
          class="flex flex-col overflow-hidden rounded-[28px] bg-surface p-5 shadow-[0_8px_30px_rgba(11,19,48,.04)] sm:p-6"
        >
          <div class="relative mb-5 aspect-[16/10] overflow-hidden rounded-[20px] bg-gradient-to-br from-[#0a1433] via-[#0d1f4a] to-[#06102c]">
            <div class="absolute inset-0 opacity-40" aria-hidden="true">
              <div class="absolute start-6 top-6 size-24 rounded-full bg-brand-blue/40 blur-2xl" />
              <div class="absolute end-4 bottom-2 size-28 rounded-full bg-brand-cyan/35 blur-2xl" />
            </div>
            <div class="absolute inset-0 flex items-center justify-center gap-0" aria-hidden="true">
              <div class="relative z-10 grid size-16 place-items-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md shadow-lg -me-2 rotate-[-8deg]">
                <svg viewBox="0 0 24 24" class="size-7 text-brand-sky" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
              </div>
              <div class="relative z-20 grid size-[4.5rem] place-items-center rounded-2xl border border-brand-cyan/30 bg-gradient-to-br from-brand-blue to-brand-cyan shadow-brand">
                <svg viewBox="0 0 24 24" class="size-8 text-white" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M8 12h8M12 8v8" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>
              <div class="relative z-10 grid size-16 place-items-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md shadow-lg -ms-2 rotate-[8deg]">
                <svg viewBox="0 0 24 24" class="size-7 text-brand-periwinkle" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 21v-2a4 4 0 00-4-4H6" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
            </div>
          </div>
          <p class="text-lg font-bold leading-snug tracking-tight text-ink sm:text-xl">
            <span>{{ t.about.trust.strong }}</span>
            <span class="font-medium text-muted"> {{ t.about.trust.rest }}</span>
          </p>
        </article>

        <!-- Stat card -->
        <article
          v-motion="reveal(180)"
          class="relative flex flex-col overflow-hidden rounded-[28px] bg-surface p-5 shadow-[0_8px_30px_rgba(11,19,48,.04)] sm:p-6"
        >
          <div class="relative mb-5 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-[20px] bg-gradient-to-br from-mist via-white to-[#e8eefc]">
            <div class="pointer-events-none absolute inset-0" aria-hidden="true">
              <div class="absolute start-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-blue/10" />
              <div class="absolute start-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-cyan/20" />
              <div class="absolute end-6 top-5 size-14 rounded-xl bg-brand-blue/10 blur-sm" />
              <div class="absolute start-8 bottom-6 size-10 rounded-full bg-brand-cyan/20" />
            </div>
            <div class="relative grid size-[4.75rem] place-items-center rounded-[22px] bg-gradient-to-br from-brand-blue to-brand-cyan shadow-brand" aria-hidden="true">
              <svg viewBox="0 0 24 24" class="size-9 text-white" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
              </svg>
            </div>
          </div>
          <p class="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl" dir="ltr">{{ highlightStat.value }}</p>
          <p class="mt-1.5 text-sm font-medium text-muted">{{ highlightStat.label }}</p>
        </article>

        <!-- Wide elevate card -->
        <article
          v-motion="reveal(240)"
          class="relative grid overflow-hidden rounded-[28px] bg-surface shadow-[0_8px_30px_rgba(11,19,48,.04)] lg:col-span-2 lg:grid-cols-[1.05fr_.95fr]"
        >
          <div class="flex flex-col justify-center p-6 sm:p-8 lg:pe-2">
            <p class="max-w-[24ch] text-xl font-bold leading-snug tracking-tight text-ink sm:text-2xl lg:text-[1.65rem]">
              <span>{{ t.about.elevate.strong }}</span>
              <span class="font-medium text-muted"> {{ t.about.elevate.rest }}</span>
            </p>
          </div>

          <div class="relative min-h-[220px] overflow-hidden bg-gradient-to-br from-navy via-navy-2 to-[#06102c] sm:min-h-[260px]">
            <div class="pointer-events-none absolute inset-0" aria-hidden="true">
              <div class="absolute -end-10 -top-10 size-48 rounded-full bg-brand-blue/30 blur-3xl" />
              <div class="absolute -start-8 bottom-0 size-40 rounded-full bg-brand-cyan/25 blur-3xl" />
            </div>
            <img
              src="/images/drixal-hero.png"
              alt=""
              width="1543"
              height="1019"
              loading="lazy"
              decoding="async"
              class="absolute inset-0 h-full w-full scale-110 object-cover object-[center_12%] opacity-80"
            >
            <div class="absolute inset-0 bg-gradient-to-br from-navy/40 via-transparent to-navy/50" />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
