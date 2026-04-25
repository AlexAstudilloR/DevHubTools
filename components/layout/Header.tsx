"use client";

import React from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { AdPlaceholder } from "@/components/ads/AdPlaceholder";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-col">
      <div className="flex h-16 items-center px-6">
        <div className="flex flex-1 items-center justify-between">
          <nav className="flex items-center space-x-6">
            <Link href="/" className="font-bold text-xl">
              DevHub Tools
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
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
