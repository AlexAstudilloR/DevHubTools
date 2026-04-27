import { MetadataRoute } from 'next';
import { TOOLS_DATA } from '@/lib/tools';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fast-dev-tools.vercel.app/';

const BLOG_POSTS = [
  'git-commands-junior-developers',
  'rest-api-best-practices',
  'variable-naming-standards',
];

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
    '/blog',
  ];

  const locales = ['en', 'es'];

  // Static pages
  const routes = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  );

  // Tool pages
  const toolRoutes = locales.flatMap((locale) =>
    tools.map((tool) => ({
      url: `${siteUrl}/${locale}/tools/${tool}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }))
  );

  // Blog posts
  const blogRoutes = locales.flatMap((locale) =>
    BLOG_POSTS.map((slug) => ({
      url: `${siteUrl}/${locale}/blog/${slug}`,
      lastModified: new Date('2026-04-26'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  return [...routes, ...toolRoutes, ...blogRoutes];
}
