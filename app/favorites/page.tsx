"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TOOLS } from "@/lib/tools";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useTranslation } from "@/hooks/useTranslation";

export default function FavoritesPage() {
  const [favorites, , isHydrated] = useLocalStorage<string[]>("devhub-favorites", []);
  const [favoriteTools, setFavoriteTools] = useState<typeof TOOLS>([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (isHydrated) {
      const filtered = TOOLS.filter(tool => favorites.includes(tool.href.split('/').pop() || ''));
      setFavoriteTools(filtered);
    }
  }, [favorites, isHydrated]);

  if (!isHydrated) return null;

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
          {t('favorites.title')}
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {t('favorites.desc')}
        </p>
      </div>

      {favoriteTools.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-3xl bg-muted/5">
          <Star className="h-12 w-12 text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground text-xl font-medium">{t('favorites.empty')}</p>
          <Link href="/" className="mt-4 text-primary hover:underline">
            {t('favorites.explore')}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.href} href={tool.href}>
                <Card className="h-full transition-all hover:shadow-md hover:border-primary/50 group cursor-pointer relative overflow-hidden">
                  <div className="absolute top-2 right-2 text-primary">
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <CardHeader>
                    <div className="mb-2 p-2 w-fit rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{t(`tool.${tool.id}.name`)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {t(`tool.${tool.id}.desc`)}
                    </CardDescription>
                    <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      {t('common.open_tool')} <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
