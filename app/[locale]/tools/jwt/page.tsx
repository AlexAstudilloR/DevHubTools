import { constructMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { JwtClient } from "./JwtClient";


export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Tools' });
  return constructMetadata({
    title: t('jwt.name'),
    description: t('jwt.description'),
    url: `/tools/jwt`,
    locale
  });
}

export default function JwtPage() {
  return <JwtClient />;
}
