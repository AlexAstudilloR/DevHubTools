"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Menu,
  ChevronLeft,
  Star,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdPlaceholder } from "@/components/ads/AdPlaceholder";
import { TOOLS } from "@/lib/tools";
import { useTranslation } from "@/hooks/useTranslation";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <aside className={cn(
      "border-r bg-card transition-all duration-300 flex flex-col h-full",
      collapsed ? "w-[80px]" : "w-[280px]"
    )}>
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!collapsed && <span className="font-bold text-lg text-primary">DevTools Hub</span>}
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="ml-auto">
          {collapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="grid gap-1 px-2">
          <Link href="/">
            <span className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              pathname === "/" ? "bg-primary/10 text-primary" : "transparent",
              collapsed ? "justify-center" : "justify-start"
            )}>
              <Home className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{t('header.home')}</span>}
            </span>
          </Link>
          <Link href="/favorites">
            <span className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              pathname === "/favorites" ? "bg-primary/10 text-primary" : "transparent",
              collapsed ? "justify-center" : "justify-start"
            )}>
              <Star className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{t('header.favorites')}</span>}
            </span>
          </Link>

          <div className="my-4 border-t pt-4 px-2">
            {!collapsed && <span className="text-[10px] font-bold uppercase text-muted-foreground/50 tracking-widest mb-2 block">{t('tools.title')}</span>}
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              const isActive = pathname === tool.href;
              return (
                <Link key={tool.href} href={tool.href}>
                  <span className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground mb-1",
                    isActive ? "bg-primary/10 text-primary" : "transparent",
                    collapsed ? "justify-center" : "justify-start"
                  )}>
                    <Icon className="h-5 w-5 shrink-0" />
                    {!collapsed && <span>{t(`tool.${tool.id}.name`)}</span>}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
      {!collapsed && (
        <div className="p-4 border-t">
          <AdPlaceholder position="sidebar" />
        </div>
      )}
    </aside>
  );
}
