import { constructMetadata } from '@/lib/seo';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { MarkdownPreviewerClient } from './MarkdownPreviewerClient';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Tools' });
  return constructMetadata({
    title: t('markdown-previewer.name'),
    description: t('markdown-previewer.description'),
    url: '/tools/markdown-previewer',
    locale,
  });
}

export default function MarkdownPreviewerPage() {
  return <MarkdownPreviewerClient />;
}
