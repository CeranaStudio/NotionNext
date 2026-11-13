import type { MetadataRoute } from 'next'
import { cases, site } from '@/lib/content'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    { url: `${site.url}/cases`, priority: 0.8 },
    ...cases.map(c => ({ url: `${site.url}/cases/${c.slug}`, priority: 0.7 }))
  ]
}
