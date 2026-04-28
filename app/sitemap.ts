import { MetadataRoute } from 'next';
import { TOOLS_DATA } from '@/lib/tools';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dev-hub-tools-two.vercel.app';

const BLOG_POSTS = [
  'git-commands-junior-developers',
  'rest-api-best-practices',
  'variable-naming-standards',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = TOOLS_DATA.map(tool => tool.id);
  const locales = ['es', 'en'] as const;
  
  const staticRoutes = [
    '',
    '/favorites',
    '/privacy-policy',
    '/cookies-policy',
    '/terms-of-service',
    '/about',
    '/contact',
    '/blog',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Rutas estáticas
  staticRoutes.forEach(route => {
    locales.forEach(locale => {
      sitemapEntries.push({
        url: `${siteUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : 0.8,
      });
    });
  });

  // Herramientas
  tools.forEach(tool => {
    locales.forEach(locale => {
      sitemapEntries.push({
        url: `${siteUrl}/${locale}/tools/${tool}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
      });
    });
  });

  // Blog
  BLOG_POSTS.forEach(slug => {
    locales.forEach(locale => {
      sitemapEntries.push({
        url: `${siteUrl}/${locale}/blog/${slug}`,
        lastModified: new Date('2026-04-26'),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  return sitemapEntries;
}