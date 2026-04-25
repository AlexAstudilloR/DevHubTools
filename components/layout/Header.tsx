import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "@/lib/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

export function Header() {
  const t = useTranslations("Sidebar");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-6">
        <div className="flex flex-1 items-center justify-between">
          <nav className="flex items-center space-x-6">
            <Link href="/" className="font-bold">
              {t("title")}
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
