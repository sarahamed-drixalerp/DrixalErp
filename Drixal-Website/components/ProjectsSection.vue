<script setup lang="ts">
const { t } = useLocale()
const { projects, pending, error, refresh } = usePortfolioData()
</script>

<template>
  <section id="work" class="section bg-mist">
    <div class="container-site">
      <SectionHeading :eyebrow="t.projects.eyebrow" :title="t.projects.title" :lead="t.projects.lead" />

      <LoadError v-if="error && !projects.length" @retry="refresh()" />

      <div v-else-if="pending && !projects.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
        <div v-for="n in 3" :key="n" class="h-[360px] animate-pulse rounded-[20px] border border-line bg-surface" />
      </div>

      <p v-else-if="!projects.length" class="text-center text-muted">{{ t.projects.empty }}</p>

      <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="(p, i) in projects" :key="p.id" v-motion="reveal((i % 3) * 90)">
          <ProjectCard :project="p" />
        </div>
      </div>
    </div>
  </section>
</template>
