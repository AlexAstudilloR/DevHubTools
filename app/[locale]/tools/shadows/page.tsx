import { constructMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { ShadowsClient } from "./ShadowsClient";


export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Tools' });
  return constructMetadata({
    title: t('shadows.name'),
    description: t('shadows.description'),
    url: `/tools/shadows`,
    locale
  });
}

export default function ShadowsPage() {
  return <ShadowsClient />;
}
