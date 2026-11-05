import type { ContactPayload } from '~/types/content'

export interface ContactFields {
  name: string
  email: string
  phone: string
  serviceType: string
  message: string
  /** Honeypot — real users never fill this. */
  website: string
}

type FieldKey = 'name' | 'email' | 'serviceType' | 'message'
export type ContactErrors = Partial<Record<FieldKey, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function useContactForm() {
  const { public: cfg } = useRuntimeConfig()
  const { t, locale } = useLocale()
  const toast = useToast()
  const { services } = usePortfolioData()

  const fields = reactive<ContactFields>({ name: '', email: '', phone: '', serviceType: '', message: '', website: '' })
  const errors = reactive<ContactErrors>({})
  const touched = reactive<Partial<Record<FieldKey, boolean>>>({})
  const submitting = ref(false)

  function validateField(key: FieldKey): boolean {
    const msg = t.value.form.errors
    let error: string | undefined
    switch (key) {
      case 'name': error = fields.name.trim().length >= 2 ? undefined : msg.name; break
      case 'email': error = EMAIL_RE.test(fields.email.trim()) ? undefined : msg.email; break
      case 'serviceType': error = fields.serviceType ? undefined : msg.serviceType; break
      case 'message': error = fields.message.trim().length >= 10 ? undefined : msg.message; break
    }
    errors[key] = error
    return !error
  }

  function validateAll(): boolean {
    const keys: FieldKey[] = ['name', 'email', 'serviceType', 'message']
    keys.forEach(k => { touched[k] = true })
    return keys.map(validateField).every(Boolean)
  }

  /** Validate on blur, then live once a field has been touched. */
  function onBlur(key: FieldKey) { touched[key] = true; validateField(key) }
  function onInput(key: FieldKey) { if (touched[key]) validateField(key) }

  // Re-translate visible errors when the language changes.
  watch(locale, () => {
    (Object.keys(touched) as FieldKey[]).forEach(k => touched[k] && validateField(k))
  })

  function reset() {
    Object.assign(fields, { name: '', email: '', phone: '', serviceType: '', message: '', website: '' })
    ;(Object.keys(errors) as FieldKey[]).forEach(k => { errors[k] = undefined })
    ;(Object.keys(touched) as FieldKey[]).forEach(k => { touched[k] = false })
  }

  async function submit(): Promise<'sent' | 'mailto' | 'invalid' | 'failed' | 'spam'> {
    if (submitting.value) return 'invalid'
    if (fields.website) { reset(); return 'spam' } // silently drop bots
    if (!validateAll()) return 'invalid'

    const payload: ContactPayload = {
      name: fields.name.trim(),
      email: fields.email.trim(),
      phone: fields.phone.trim() || undefined,
      serviceType: fields.serviceType,
      message: fields.message.trim(),
      locale: locale.value,
    }

    // No endpoint configured yet → hand off to the visitor's email client.
    if (!cfg.contactEndpoint) {
      const lines = [`Name: ${payload.name}`, `Email: ${payload.email}`]
      if (payload.phone) lines.push(`Phone: ${payload.phone}`)
      const serviceTitle = services.value.find(s => s.id === payload.serviceType)?.title ?? t.value.form.other
      lines.push(`Service: ${serviceTitle}`, '', payload.message)
      const body = lines.join('\n')
      window.location.href = `mailto:${cfg.contactEmail}?subject=${encodeURIComponent(`Website inquiry — ${payload.name}`)}&body=${encodeURIComponent(body)}`
      toast.show(t.value.form.toastMail, 'info')
      return 'mailto'
    }

    submitting.value = true
    try {
      await $fetch(cfg.contactEndpoint, { method: 'POST', body: payload, timeout: 15_000 })
      reset()
      toast.show(t.value.form.toastOk, 'success')
      return 'sent'
    }
    catch {
      toast.show(t.value.form.toastErr, 'error', 7000)
      return 'failed'
    }
    finally {
      submitting.value = false
    }
  }

  return { fields, errors, submitting, onBlur, onInput, submit }
}
