import { constructMetadata } from '@/lib/seo';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { CharacterCounterClient } from './CharacterCounterClient';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Tools' });
  return constructMetadata({
    title: t('character-counter.name'),
    description: t('character-counter.description'),
    url: '/tools/character-counter',
    locale,
  });
}

export default function CharacterCounterPage() {
  return <CharacterCounterClient />;
}
