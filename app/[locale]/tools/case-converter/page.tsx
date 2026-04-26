import { constructMetadata } from '@/lib/seo';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { CaseConverterClient } from './CaseConverterClient';
import { ToolDocumentation } from '@/components/layout/ToolDocumentation';

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
  return (
    <div className="container mx-auto px-4">
      <CaseConverterClient />
      <ToolDocumentation toolId="case-converter" />
    </div>
  );
}
