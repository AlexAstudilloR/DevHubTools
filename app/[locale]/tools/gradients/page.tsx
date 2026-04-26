import { constructMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { GradientsClient } from "./GradientsClient";
import { ToolDocumentation } from '@/components/layout/ToolDocumentation';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Tools' });
  return constructMetadata({
    title: t('gradients.name'),
    description: t('gradients.description'),
    url: `/tools/gradients`,
    locale
  });
}

export default function GradientsPage() {
  return (
    <div className="container mx-auto px-4">
      <GradientsClient />
      <ToolDocumentation toolId="gradients" />
    </div>
  );
}
