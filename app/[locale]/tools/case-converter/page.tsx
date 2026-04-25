import { constructMetadata } from '@/lib/seo';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { CaseConverterClient } from './CaseConverterClient';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Tools' });
  return constructMetadata({
    title: t('case-converter.name'),
    description: t('case-converter.description'),
    url: '/tools/case-converter',
    locale,
  });
}

export default function CaseConverterPage() {
  return <CaseConverterClient />;
}
