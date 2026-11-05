<script setup lang="ts">
const { t } = useLocale()
const { services } = usePortfolioData()
const { fields, errors, submitting, onBlur, onInput, submit } = useContactForm()

const uid = useId()
const id = (name: string) => `${uid}-${name}`
</script>

<template>
  <form
    class="grid gap-4 rounded-3xl border border-line bg-surface p-6 shadow-form sm:p-8"
    novalidate
    @submit.prevent="submit"
  >
    <div class="grid gap-4 sm:grid-cols-2">
      <div class="grid gap-1.5">
        <label :for="id('name')" class="text-[.82rem] font-bold">{{ t.form.name }}</label>
        <input
          :id="id('name')"
          v-model="fields.name"
          name="name"
          autocomplete="name"
          required
          class="field"
          :class="errors.name && 'field-invalid'"
          :aria-invalid="!!errors.name"
          :aria-describedby="errors.name ? id('name-err') : undefined"
          @blur="onBlur('name')"
          @input="onInput('name')"
        >
        <p v-if="errors.name" :id="id('name-err')" class="text-xs font-semibold text-rose-600">{{ errors.name }}</p>
      </div>

      <div class="grid gap-1.5">
        <label :for="id('email')" class="text-[.82rem] font-bold">{{ t.form.email }}</label>
        <input
          :id="id('email')"
          v-model="fields.email"
          name="email"
          type="email"
          dir="ltr"
          autocomplete="email"
          required
          class="field rtl:text-right"
          :class="errors.email && 'field-invalid'"
          :aria-invalid="!!errors.email"
          :aria-describedby="errors.email ? id('email-err') : undefined"
          @blur="onBlur('email')"
          @input="onInput('email')"
        >
        <p v-if="errors.email" :id="id('email-err')" class="text-xs font-semibold text-rose-600">{{ errors.email }}</p>
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <div class="grid gap-1.5">
        <label :for="id('phone')" class="text-[.82rem] font-bold">{{ t.form.phone }}</label>
        <input
          :id="id('phone')"
          v-model="fields.phone"
          name="phone"
          type="tel"
          dir="ltr"
          autocomplete="tel"
          class="field rtl:text-right"
        >
      </div>

      <div class="grid gap-1.5">
        <label :for="id('service')" class="text-[.82rem] font-bold">{{ t.form.service }}</label>
        <select
          :id="id('service')"
          v-model="fields.serviceType"
          name="serviceType"
          required
          class="field"
          :class="[errors.serviceType && 'field-invalid', !fields.serviceType && 'text-muted/70']"
          :aria-invalid="!!errors.serviceType"
          :aria-describedby="errors.serviceType ? id('service-err') : undefined"
          @blur="onBlur('serviceType')"
          @change="onBlur('serviceType')"
        >
          <option value="" disabled>{{ t.form.servicePlaceholder }}</option>
          <option v-for="s in services" :key="s.id" :value="s.id" class="text-ink">{{ s.title }}</option>
          <option value="other" class="text-ink">{{ t.form.other }}</option>
        </select>
        <p v-if="errors.serviceType" :id="id('service-err')" class="text-xs font-semibold text-rose-600">{{ errors.serviceType }}</p>
      </div>
    </div>

    <div class="grid gap-1.5">
      <label :for="id('message')" class="text-[.82rem] font-bold">{{ t.form.message }}</label>
      <textarea
        :id="id('message')"
        v-model="fields.message"
        name="message"
        rows="5"
        required
        class="field min-h-[130px] resize-y"
        :class="errors.message && 'field-invalid'"
        :aria-invalid="!!errors.message"
        :aria-describedby="errors.message ? id('message-err') : undefined"
        @blur="onBlur('message')"
        @input="onInput('message')"
      />
      <p v-if="errors.message" :id="id('message-err')" class="text-xs font-semibold text-rose-600">{{ errors.message }}</p>
    </div>

    <!-- honeypot -->
    <input v-model="fields.website" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" class="absolute -left-[9999px] h-0 w-0 opacity-0">

    <button type="submit" class="btn btn-primary mt-1 w-full sm:w-auto sm:justify-self-start" :disabled="submitting" :aria-busy="submitting">
      <svg v-if="submitting" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity=".3" stroke-width="3" />
        <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
      </svg>
      {{ submitting ? t.form.sending : t.form.send }}
    </button>
  </form>
</template>
