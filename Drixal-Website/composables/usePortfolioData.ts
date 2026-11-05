import type { Project, Service, SiteContent, Stat, WorkspaceFeature } from '~/types/content'

const MAX_PROJECTS = 6

/** Defensive normalisation so a partial/older API response never breaks rendering. */
function normalize(raw: Partial<SiteContent> | null | undefined): SiteContent | null {
  if (!raw || typeof raw !== 'object' || !raw.hero) return null
  return {
    hero: raw.hero,
    workspace: Array.isArray(raw.workspace) ? raw.workspace : [],
    services: Array.isArray(raw.services) ? raw.services : [],
    projects: (Array.isArray(raw.projects) ? raw.projects : [])
      .slice(0, MAX_PROJECTS)
      .map(p => ({ ...p, tags: Array.isArray(p.tags) ? p.tags : [] })),
    stats: Array.isArray(raw.stats) ? raw.stats : [],
    productBlurb: typeof raw.productBlurb === 'string' ? raw.productBlurb : undefined,
  }
}

/**
 * Fetches hero, services, projects and stats for the active language from
 * `runtimeConfig.public.contentUrl` (`{lang}` placeholder is substituted).
 *
 * - SSG: fetched once at build time and embedded in the page payload (zero
 *   runtime requests for the default language).
 * - Language switch: fetched on demand, then cached per language by key, so
 *   switching back is instant.
 */
export function usePortfolioData() {
  const { public: cfg } = useRuntimeConfig()
  const { locale } = useLocale()

  const url = computed(() => cfg.contentUrl.replace('{lang}', locale.value))

  const { data, status, error, refresh } = useAsyncData(
    () => `site-content-${locale.value}`,
    () => $fetch<SiteContent>(url.value, { timeout: 10_000, retry: 1 }),
    { transform: normalize, dedupe: 'defer' },
  )

  const pending = computed(() => status.value === 'pending' || status.value === 'idle')

  return {
    content: data,
    hero: computed(() => data.value?.hero ?? null),
    workspace: computed<WorkspaceFeature[]>(() => data.value?.workspace ?? []),
    services: computed<Service[]>(() => data.value?.services ?? []),
    projects: computed<Project[]>(() => data.value?.projects ?? []),
    stats: computed<Stat[]>(() => data.value?.stats ?? []),
    productBlurb: computed(() => data.value?.productBlurb ?? ''),
    pending,
    error,
    refresh,
  }
}
