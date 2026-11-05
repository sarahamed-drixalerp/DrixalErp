<script setup lang="ts">
const { t } = useLocale()
const { public: cfg } = useRuntimeConfig()

const ICONS = {
  mail: 'M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2zM3 7l9 6 9-6',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z',
  pin: 'M12 22s7-6.5 7-12a7 7 0 00-14 0c0 5.5 7 12 7 12zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
}
</script>

<template>
  <section id="contact" class="section">
    <div class="container-site grid items-start gap-12 lg:grid-cols-[.9fr_1.1fr]">
      <div>
        <SectionHeading :eyebrow="t.contact.eyebrow" :title="t.contact.title" :lead="t.contact.lead" :center="false" class="!mb-0" />

        <ul v-motion="reveal(120)" class="mt-8 grid gap-4 font-semibold">
          <li>
            <a :href="`mailto:${cfg.contactEmail}`" class="flex items-center gap-3.5 transition hover:text-brand-blue">
              <span class="grid h-11 w-11 place-items-center rounded-[14px] bg-gradient-to-br from-brand-blue/10 to-brand-cyan/20 text-brand-blue">
                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="ICONS.mail" /></svg>
              </span>
              <span dir="ltr">{{ cfg.contactEmail }}</span>
            </a>
          </li>
          <li class="flex items-center gap-3.5">
            <span class="grid h-11 w-11 place-items-center rounded-[14px] bg-gradient-to-br from-brand-blue/10 to-brand-cyan/20 text-brand-blue">
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="ICONS.pin" /></svg>
            </span>
            {{ t.contact.address }}
          </li>
        </ul>
      </div>

      <div v-motion="reveal(150)">
        <ContactForm />
      </div>
    </div>
  </section>
</template>
