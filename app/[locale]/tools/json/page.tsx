import { constructMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { JsonClient } from "./JsonClient";
import { ToolDocumentation } from '@/components/layout/ToolDocumentation';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Tools' });
  return constructMetadata({
    title: t('json.name'),
    description: t('json.description'),
    url: `/tools/json`,
    locale
  });
}

export default function JsonPage() {
  return (
    <div className="container mx-auto px-4">
      <JsonClient />
      <ToolDocumentation toolId="json" />
    </div>
  );
}
