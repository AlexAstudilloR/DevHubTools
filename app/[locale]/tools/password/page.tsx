import { constructMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { PasswordClient } from "./PasswordClient";


export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Tools' });
  return constructMetadata({
    title: t('password.name'),
    description: t('password.description'),
    url: `/tools/password`,
    locale
  });
}

export default function PasswordPage() {
  return <PasswordClient />;
}
