<script setup lang="ts">
const { locale, isRtl, restoreLocale } = useLocale()
const { restoreTheme } = useTheme()

useHead({
  htmlAttrs: { lang: locale, dir: computed(() => (isRtl.value ? 'rtl' : 'ltr')) },
})

// Apply the visitor's saved language + theme after hydration.
onMounted(() => {
  restoreLocale()
  restoreTheme()
})
</script>

<template>
  <NuxtPage />
  <FloatingControls />
  <AppToast />
</template>
