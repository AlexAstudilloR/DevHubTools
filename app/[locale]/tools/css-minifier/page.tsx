import { constructMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { CssMinifierClient } from "./CssMinifierClient";


export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Tools' });
  return constructMetadata({
    title: t('css-minifier.name'),
    description: t('css-minifier.description'),
    url: `/tools/css-minifier`,
    locale
  });
}

export default function CssMinifierPage() {
  return <CssMinifierClient />;
}
