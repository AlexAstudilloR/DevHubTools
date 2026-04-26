"use client";

import React from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "@/lib/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslations } from "next-intl";
import { CategoryNav } from "./CategoryNav";
import { Terminal } from "lucide-react";

export function Header() {
  const t = useTranslations("Sidebar");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg sm:text-xl tracking-tight text-primary shrink-0">
              <Terminal className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="hidden xs:inline-block">{t("title")}</span>
            </Link>
            
            <CategoryNav />
          </div>

          <div className="flex items-center space-x-1 sm:space-x-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <LocaleSwitcher />
          </div>
        </div>
      </div>
      <div className="px-6 hidden lg:block">
        <AdPlaceholder position="header" className="h-[60px] max-w-full my-2" />
      </div>
    </header>
  );
}
