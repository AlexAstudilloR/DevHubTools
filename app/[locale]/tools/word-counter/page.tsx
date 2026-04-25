import { constructMetadata } from '@/lib/seo';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { WordCounterClient } from './WordCounterClient';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Tools' });
  return constructMetadata({
    title: t('word-counter.name'),
    description: t('word-counter.description'),
    url: '/tools/word-counter',
    locale,
  });
}

export default function WordCounterPage() {
  return <WordCounterClient />;
}
