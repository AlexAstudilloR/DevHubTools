import { constructMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { ColorPaletteClient } from "./ColorPaletteClient";


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
  return <ColorPaletteClient />;
}
