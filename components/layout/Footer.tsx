import React from "react";
import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Legal");

  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row max-w-6xl mx-auto px-4">
        <p className="text-sm leading-loose text-center text-muted-foreground md:text-left">
          Built by FastDevTools.
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <Link href="/privacy-policy" className="hover:underline">{t("privacy")}</Link>
          <Link href="/terms-of-service" className="hover:underline">{t("terms")}</Link>
          <Link href="/cookies-policy" className="hover:underline">{t("cookies")}</Link>
        </div>
      </div>
    </footer>
  );
}
