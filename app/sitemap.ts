import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devhubtools.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = [
    'color-palette',
    'jwt',
    'uuid',
    'gradients',
    'shadows',
    'grid',
    'json',
    'lorem',
    'password',
    'css-minifier',
    'units',
    'contrast',
  ];

  const routes = ['', '/favorites', '/privacy-policy', '/cookies-policy', '/terms-of-service'].map((route) => ({
    url: `${siteUrl}/es${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const enRoutes = ['', '/favorites', '/privacy-policy', '/cookies-policy', '/terms-of-service'].map((route) => ({
    url: `${siteUrl}/en${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const toolRoutes = tools.flatMap((tool) => [
    {
      url: `${siteUrl}/es/tools/${tool}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/en/tools/${tool}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }
  ]);

  return [...routes, ...enRoutes, ...toolRoutes];
}
