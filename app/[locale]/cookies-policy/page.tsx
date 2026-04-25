"use client";

import React from "react";
import { useTranslations } from "next-intl";

export default function CookiesPolicyPage() {
  const t = useTranslations("Legal");

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">
        {t("cookies")}
      </h1>
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          {t("cookiesContent")}
        </p>
      </div>
    </div>
  );
}
