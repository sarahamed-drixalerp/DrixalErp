export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'drixal-theme'

/**
 * Light / dark theme. Default is light (matches the designed look).
 * Preference is restored after hydration to avoid SSR mismatches.
 */
export function useTheme() {
  const theme = useState<Theme>('theme', () => 'light')
  const isDark = computed(() => theme.value === 'dark')

  function apply(next: Theme) {
    theme.value = next
    if (!import.meta.client) return
    document.documentElement.classList.toggle('dark', next === 'dark')
    document.documentElement.style.colorScheme = next
    try { localStorage.setItem(STORAGE_KEY, next) } catch { /* storage unavailable */ }
  }

  function setTheme(next: Theme) {
    apply(next)
  }

  function toggleTheme() {
    apply(theme.value === 'dark' ? 'light' : 'dark')
  }

  function restoreTheme() {
    let saved: string | null = null
    try { saved = localStorage.getItem(STORAGE_KEY) } catch { /* storage unavailable */ }
    if (saved === 'dark' || saved === 'light') {
      apply(saved)
      return
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    apply(prefersDark ? 'dark' : 'light')
  }

  return { theme, isDark, setTheme, toggleTheme, restoreTheme }
}
