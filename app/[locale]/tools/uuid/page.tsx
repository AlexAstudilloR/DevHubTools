import { constructMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { UuidClient } from "./UuidClient";


export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Tools' });
  return constructMetadata({
    title: t('uuid.name'),
    description: t('uuid.description'),
    url: `/tools/uuid`,
    locale
  });
}

export default function UuidPage() {
  return <UuidClient />;
}
