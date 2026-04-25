"use client";

import React, { useState } from "react";
import { Link, usePathname } from "@/lib/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Menu, ChevronLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/context/FavoritesContext";
import { TOOLS_DATA } from "@/lib/tools";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const tTools = useTranslations("Tools");
  const tSidebar = useTranslations("Sidebar");
  const { favorites, isHydrated } = useFavorites();

  const favoriteTools = TOOLS_DATA.filter(tool => favorites.includes(tool.id));

  return (
    <aside className={cn(
      "border-r bg-card transition-all duration-300 flex flex-col",
      collapsed ? "w-[80px]" : "w-[280px]"
    )}>
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!collapsed && <span className="font-bold text-lg text-primary">{tSidebar('title')}</span>}
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="ml-auto">
          {collapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto py-4 scrollbar-thin">
        <nav className="grid gap-1 px-2">
          {/* Favorites Link */}
          <Link href="/favorites">
            <span className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground mb-4",
              pathname === "/favorites" ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500" : "transparent text-yellow-600 dark:text-yellow-500",
              collapsed ? "justify-center" : "justify-start"
            )}>
              <Star className="h-5 w-5 shrink-0" fill="currentColor" />
              {!collapsed && <span>{tSidebar('favorites')}</span>}
            </span>
          </Link>

          {!collapsed && favoriteTools.length > 0 && isHydrated && (
            <div className="mb-4">
              <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {tSidebar('favorites')}
              </p>
              {favoriteTools.map((tool) => {
                const Icon = tool.icon;
                const isActive = pathname === tool.href;
                return (
                  <Link key={`fav-${tool.href}`} href={tool.href}>
                    <span className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      isActive ? "bg-primary/10 text-primary" : "transparent"
                    )}>
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{tTools(`${tool.id}.name`)}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          )}

          {!collapsed && <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 mt-2">Tools</p>}
          
          {TOOLS_DATA.map((tool) => {
            const Icon = tool.icon;
            const isActive = pathname === tool.href;
            return (
              <Link key={tool.href} href={tool.href}>
                <span className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive ? "bg-primary/10 text-primary" : "transparent",
                  collapsed ? "justify-center" : "justify-start"
                )}>
                  <Icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span className="truncate">{tTools(`${tool.id}.name`)}</span>}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
