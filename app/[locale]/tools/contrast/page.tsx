import { constructMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { ContrastClient } from "./ContrastClient";
import { ToolDocumentation } from '@/components/layout/ToolDocumentation';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Tools' });
  return constructMetadata({
    title: t('contrast.name'),
    description: t('contrast.description'),
    url: `/tools/contrast`,
    locale
  });
}

export default function ContrastPage() {
  return (
    <div className="container mx-auto px-4">
      <ContrastClient />
      <ToolDocumentation toolId="contrast" />
    </div>
  );
}
