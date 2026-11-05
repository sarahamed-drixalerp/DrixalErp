<script setup lang="ts">
const { t } = useLocale()
const { hero } = usePortfolioData()

useSeoMeta({
  title: 'Drixal ERP — AI-ready enterprise workspace',
  ogTitle: 'Drixal ERP — AI-ready enterprise workspace',
  ogDescription: () => hero.value?.subheadline ?? t.value.heroFallback.subheadline,
  description: () => hero.value?.subheadline ?? t.value.heroFallback.subheadline,
  ogImage: '/images/drixal-hero.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <AppHeader />
    <main>
      <HeroSection />
      <DataFlowSection />
      <WorkspaceSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
    </main>
    <AppFooter />
  </div>
</template>
