"use client";

import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const fullPathname = usePathname();

  // Function to get the path without the current locale prefix
  const getPathWithoutLocale = (path: string) => {
    if (!path) return "/";
    const segments = path.split("/");
    // If the first segment is a locale, remove it
    if (segments[1] === "es" || segments[1] === "en") {
      return "/" + segments.slice(2).join("/");
    }
    return path;
  };

  const cleanPath = getPathWithoutLocale(fullPathname);

  return (
    <div className="flex items-center bg-muted rounded-lg p-1 border">
      <Link 
        href={`/es${cleanPath}`}
        className={cn(
          "px-3 py-1.5 text-xs font-bold rounded-md transition-all",
          locale === "es" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
        )}
      >
        ES
      </Link>
      <Link 
        href={`/en${cleanPath}`}
        className={cn(
          "px-3 py-1.5 text-xs font-bold rounded-md transition-all",
          locale === "en" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </Link>
    </div>
  );
}
