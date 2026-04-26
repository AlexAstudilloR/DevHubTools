import { constructMetadata } from '@/lib/seo';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { SlugGeneratorClient } from './SlugGeneratorClient';
import { ToolDocumentation } from '@/components/layout/ToolDocumentation';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Tools' });
  return constructMetadata({
    title: t('slug-generator.name'),
    description: t('slug-generator.description'),
    url: '/tools/slug-generator',
    locale,
  });
}

export default function SlugGeneratorPage() {
  return (
    <div className="container mx-auto px-4">
      <SlugGeneratorClient />
      <ToolDocumentation toolId="slug-generator" />
    </div>
  );
}
