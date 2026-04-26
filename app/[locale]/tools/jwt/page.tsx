import { constructMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { JwtClient } from "./JwtClient";
import { ToolDocumentation } from '@/components/layout/ToolDocumentation';

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
  return (
    <div className="container mx-auto px-4">
      <JwtClient />
      <ToolDocumentation toolId="jwt" />
    </div>
  );
}
