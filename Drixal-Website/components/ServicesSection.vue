<script setup lang="ts">
/**
 * Workspace Services — compact card grid (all services in one section).
 */
const { t } = useLocale()
const { services, pending, error, refresh } = usePortfolioData()
</script>

<template>
  <section id="services" class="section section-tone-b relative overflow-hidden">
    <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div class="absolute -left-20 top-[8%] h-[380px] w-[380px] rounded-full bg-brand-blue/[.07] blur-[110px]" />
      <div class="absolute -right-16 top-[40%] h-[420px] w-[420px] rounded-full bg-brand-cyan/[.09] blur-[120px]" />
      <div class="absolute bottom-[5%] left-1/3 h-[280px] w-[280px] rounded-full bg-brand-periwinkle/[.08] blur-[100px]" />
    </div>

    <div class="container-site relative z-10">
      <SectionHeading
        :eyebrow="t.services.eyebrow"
        :title="t.services.title"
        :lead="t.services.lead"
      />

      <LoadError v-if="error && !services.length" @retry="refresh()" />

      <div
        v-else-if="pending && !services.length"
        class="mx-auto grid max-w-5xl gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        aria-busy="true"
      >
        <div v-for="n in 9" :key="n" class="h-[200px] animate-pulse rounded-2xl bg-surface shadow-sm" />
      </div>

      <div
        v-else
        class="mx-auto grid max-w-5xl gap-x-4 gap-y-11 pt-7 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-5 sm:gap-y-12"
      >
        <article
          v-for="(item, i) in services"
          :key="item.id"
          v-motion="reveal((i % 9) * 70)"
          class="group relative flex flex-col items-center rounded-2xl bg-surface px-5 pb-5 pt-11 text-center shadow-[0_8px_24px_-10px_rgba(11,19,48,0.14)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_36px_-14px_rgba(10,75,255,0.28)]"
        >
          <div
            class="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          />

          <div
            class="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2"
            aria-hidden="true"
          >
            <div
              class="service-icon-ring relative grid size-[3.35rem] place-items-center rounded-full border-[1.5px] border-brand-blue/25 bg-surface text-brand-blue shadow-[0_8px_20px_-8px_rgba(10,75,255,0.45)] transition-all duration-300 group-hover:scale-110 group-hover:border-brand-cyan/50 group-hover:text-brand-cyan group-hover:shadow-[0_12px_28px_-8px_rgba(0,200,255,0.55)]"
            >
              <span
                class="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-brand-blue/10 to-brand-cyan/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <ServiceIcon :icon="item.icon" />
            </div>
          </div>

          <h3 class="text-[1.05rem] font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-brand-blue sm:text-lg">
            {{ item.title }}
          </h3>
          <p class="mt-2 line-clamp-3 max-w-[28ch] text-[13px] leading-relaxed text-muted">
            {{ item.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.service-icon-ring :deep(svg),
.service-icon-ring :deep(img) {
  height: 1.35rem;
  width: 1.35rem;
  position: relative;
  z-index: 1;
}
</style>
