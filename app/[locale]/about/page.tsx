import React from "react";
import { useTranslations } from "next-intl";
import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await import(`@/messages/${locale}.json`).then(m => m.default.Sidebar);
  return constructMetadata({
    title: t.about,
    description: "Learn more about FastDevTools and our mission.",
    url: "/about",
    locale
  });
}

export default function AboutPage() {
  const t = useTranslations("About");
  const tLegal = useTranslations("Legal");

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-primary">{t("title")}</h1>
      
      <div className="prose dark:prose-invert max-w-none space-y-6 text-lg">
        <p>
          {t("welcome")}
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 my-12">
          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <h2 className="text-xl font-bold mb-3 text-primary">{t("mission")}</h2>
            <p className="text-muted-foreground">
              {t("missionDesc")}
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <h2 className="text-xl font-bold mb-3 text-primary">{t("privacy")}</h2>
            <p className="text-muted-foreground">
              {tLegal("privacyContent")}
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-4">{t("whyChoose")}</h2>
        <ul className="list-disc pl-6 space-y-4 text-muted-foreground">
          <li><strong>{t("fast")}</strong> {t("fastDesc")}</li>
          <li><strong>{t("offline")}</strong> {t("offlineDesc")}</li>
          <li><strong>{t("openSource")}</strong> {t("openSourceDesc")}</li>
          <li><strong>{t("responsive")}</strong> {t("responsiveDesc")}</li>
        </ul>

        <h2 className="text-2xl font-bold mt-12 mb-4">{t("tech")}</h2>
        <p className="text-muted-foreground">
          {t("techDesc")}
        </p>
      </div>
    </div>
  );
}
