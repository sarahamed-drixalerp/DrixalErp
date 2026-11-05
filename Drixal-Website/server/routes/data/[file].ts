import en from '~~/content/site.en.json'
import ar from '~~/content/site.ar.json'

/**
 * Serves /data/content.{lang}.json from /content/site.{lang}.json.
 * These routes are prerendered by `nuxt generate`, so the static build ships
 * plain JSON files at the same URLs — no server needed in production.
 * Replace with the dashboard API by setting NUXT_PUBLIC_CONTENT_URL.
 */
const CONTENT = { en, ar } as const

export default defineEventHandler((event) => {
  const file = getRouterParam(event, 'file') ?? ''
  const match = /^content\.(en|ar)\.json$/.exec(file)
  if (!match) throw createError({ statusCode: 404, statusMessage: 'Not found' })

  setHeader(event, 'Cache-Control', 'public, max-age=300, stale-while-revalidate=86400')
  return CONTENT[match[1] as keyof typeof CONTENT]
})
