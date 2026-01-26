import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/w/',
      disallow: ['/search', '/admin'],
    },
    sitemap: 'https://www.jjyu.co.kr/sitemap.xml',
  }
}
