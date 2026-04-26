import { constructMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { ColorPaletteClient } from "./ColorPaletteClient";
import { ToolDocumentation } from '@/components/layout/ToolDocumentation';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Tools' });
  return constructMetadata({
    title: t('color-palette.name'),
    description: t('color-palette.description'),
    url: `/tools/color-palette`,
    locale
  });
}

export default function ColorPalettePage() {
  return (
    <div className="container mx-auto px-4">
      <ColorPaletteClient />
      <ToolDocumentation toolId="color-palette" />
    </div>
  );
}
