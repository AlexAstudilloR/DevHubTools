import { NextResponse } from 'next/server';
import { TOOLS_DATA } from '@/lib/tools';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fast-dev-tools.vercel.app';

const BLOG_POSTS = [
  'git-commands-junior-developers',
  'rest-api-best-practices',
  'variable-naming-standards',
];

export async function GET() {
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

  const urls = [
    ...locales.flatMap(locale =>
      staticRoutes.map(route => `${siteUrl}/${locale}${route}`)
    ),
    ...locales.flatMap(locale =>
      tools.map(tool => `${siteUrl}/${locale}/tools/${tool}`)
    ),
    ...locales.flatMap(locale =>
      BLOG_POSTS.map(slug => `${siteUrl}/${locale}/blog/${slug}`)
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
`).join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

export async function HEAD() {
  return new NextResponse(null, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}