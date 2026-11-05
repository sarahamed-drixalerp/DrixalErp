/**
 * Website content contract.
 *
 * Shape expected from `NUXT_PUBLIC_CONTENT_URL`
 * (today: /data/content.{lang}.json via Nitro; later: dashboard API).
 */

export type Locale = 'en' | 'ar'

/** Built-in icon keys rendered by <ServiceIcon>. Unknown keys fall back to `erp`. */
export type ServiceIconKey =
  | 'erp' | 'code' | 'mobile' | 'design' | 'cloud' | 'support'
  | 'tasks' | 'calendar' | 'timesheet' | 'catalogue' | 'requests' | 'inbox' | 'gps'
  | 'adm' | 'org' | 'hrm' | 'cat' | 'crm' | 'dms' | 'srm' | 'pmo' | 'fin' | 'srv' | 'rsk'
  | 'hsp' | 'scl' | 'flt' | 'industry'

export interface HeroContent {
  headline: string
  /** Substring of `headline` rendered with the gradient accent. Optional. */
  highlight?: string
  subheadline: string
  ctaText: string
  secondaryCtaText?: string
}

export interface Service {
  id: string
  title: string
  description: string
  /** Built-in icon key, or an absolute/relative image URL. */
  icon: ServiceIconKey | string
  /** Optional group for filtering/labels (workspace | module | industry). */
  group?: 'workspace' | 'module' | 'industry'
}

export interface WorkspaceFeature {
  id: string
  title: string
  description: string
  icon: ServiceIconKey | string
}

export interface Project {
  id: string
  name: string
  summary?: string
  /** Empty/omitted → a branded gradient placeholder is shown. */
  thumbnailUrl?: string | null
  tags: string[]
  liveUrl?: string | null
}

export interface Stat {
  value: string
  label: string
}

export interface SiteContent {
  hero: HeroContent
  /** Everyday workspace tools (top bar). */
  workspace?: WorkspaceFeature[]
  /** Module cards shown in the modules grid. */
  services: Service[]
  /** Industry packs / product highlights (first 6 rendered). */
  projects: Project[]
  stats?: Stat[]
  /** Short product blurb for the about / portfolio summary. */
  productBlurb?: string
}

/** POST body sent to `NUXT_PUBLIC_CONTACT_ENDPOINT`. */
export interface ContactPayload {
  name: string
  email: string
  phone?: string
  /** A `Service.id` from the content, or `"other"`. */
  serviceType: string
  message: string
  locale: Locale
}
