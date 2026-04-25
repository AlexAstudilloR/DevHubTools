import { constructMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { ContrastClient } from "./ContrastClient";


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
  return <ContrastClient />;
}
