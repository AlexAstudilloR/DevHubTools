import { constructMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { UnitsClient } from "./UnitsClient";


export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Tools' });
  return constructMetadata({
    title: t('units.name'),
    description: t('units.description'),
    url: `/tools/units`,
    locale
  });
}

export default function UnitsPage() {
  return <UnitsClient />;
}
