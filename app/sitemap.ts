import { MetadataRoute } from 'next';
import { TOOLS_DATA } from '@/lib/tools';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devhubtools.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = TOOLS_DATA.map(tool => tool.id);
  const staticRoutes = [
    '', 
    '/favorites', 
    '/privacy-policy', 
    '/cookies-policy', 
    '/terms-of-service',
    '/about',
    '/contact',
    '/blog'
  ];

  const locales = ['en', 'es'];

  const routes = locales.flatMap((locale) => 
    staticRoutes.map((route) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  );

  const toolRoutes = locales.flatMap((locale) =>
    tools.map((tool) => ({
      url: `${siteUrl}/${locale}/tools/${tool}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }))
  );

  return [...routes, ...toolRoutes];
}
