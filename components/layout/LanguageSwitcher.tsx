"use client";

import { usePathname, useRouter } from "@/lib/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === "es" ? "en" : "es";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Button variant="outline" size="sm" onClick={toggleLanguage} className="w-12 h-9 font-bold">
      {locale.toUpperCase()}
    </Button>
  );
}
