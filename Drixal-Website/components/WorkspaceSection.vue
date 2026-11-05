<script setup lang="ts">
const { t } = useLocale()
const { workspace, pending, error, refresh } = usePortfolioData()
</script>

<template>
  <section id="workspace" class="section bg-mist">
    <div class="container-site">
      <SectionHeading :eyebrow="t.workspace.eyebrow" :title="t.workspace.title" :lead="t.workspace.lead" />

      <LoadError v-if="error && !workspace.length" @retry="refresh()" />

      <div v-else-if="pending && !workspace.length" class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-busy="true">
        <div v-for="n in 7" :key="n" class="h-[180px] animate-pulse rounded-[20px] border border-line bg-surface" />
      </div>

      <div v-else class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div
          v-for="(item, i) in workspace"
          :key="item.id"
          v-motion="reveal((i % 4) * 70)"
        >
          <article
            class="group flex h-full flex-col rounded-[20px] border border-line bg-surface p-6 transition duration-300
                   hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-brand-lg"
          >
            <div
              class="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-cyan/20 text-brand-blue
                     transition group-hover:scale-110"
            >
              <ServiceIcon :icon="item.icon" />
            </div>
            <h3 class="text-base font-bold">{{ item.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">{{ item.description }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
