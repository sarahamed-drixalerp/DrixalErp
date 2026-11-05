import { UI } from '~/i18n/ui'
import type { Locale } from '~/types/content'

const STORAGE_KEY = 'drixal-lang'

/**
 * Lightweight EN/AR switch (no i18n library needed for two languages).
 * Pages are prerendered in English; the visitor's saved/browser preference is
 * applied after hydration via `restoreLocale()` to avoid hydration mismatches.
 */
export function useLocale() {
  const locale = useState<Locale>('locale', () => 'en')
  const t = computed(() => UI[locale.value])
  const isRtl = computed(() => locale.value === 'ar')

  function setLocale(next: Locale) {
    locale.value = next
    try { localStorage.setItem(STORAGE_KEY, next) } catch { /* storage unavailable */ }
  }

  function toggleLocale() {
    setLocale(locale.value === 'en' ? 'ar' : 'en')
  }

  function restoreLocale() {
    let saved: string | null = null
    try { saved = localStorage.getItem(STORAGE_KEY) } catch { /* storage unavailable */ }
    const preferred = saved ?? (navigator.language?.toLowerCase().startsWith('ar') ? 'ar' : 'en')
    if (preferred === 'ar' || preferred === 'en') locale.value = preferred
  }

  return { locale, t, isRtl, setLocale, toggleLocale, restoreLocale }
}
