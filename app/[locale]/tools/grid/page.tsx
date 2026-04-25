import { constructMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { GridClient } from "./GridClient";


export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Tools' });
  return constructMetadata({
    title: t('grid.name'),
    description: t('grid.description'),
    url: `/tools/grid`,
    locale
  });
}

export default function GridPage() {
  return <GridClient />;
}
