import { constructMetadata } from '@/lib/seo';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { RemoveDuplicateLinesClient } from './RemoveDuplicateLinesClient';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Tools' });
  return constructMetadata({
    title: t('remove-duplicate-lines.name'),
    description: t('remove-duplicate-lines.description'),
    url: '/tools/remove-duplicate-lines',
    locale,
  });
}

export default function RemoveDuplicateLinesPage() {
  return <RemoveDuplicateLinesClient />;
}
