import { constructMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { LoremClient } from "./LoremClient";


export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Tools' });
  return constructMetadata({
    title: t('lorem.name'),
    description: t('lorem.description'),
    url: `/tools/lorem`,
    locale
  });
}

export default function LoremPage() {
  return <LoremClient />;
}
