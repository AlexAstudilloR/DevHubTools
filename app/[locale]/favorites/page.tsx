"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useFavorites } from "@/context/FavoritesContext";
import { Link } from "@/lib/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { TOOLS_DATA } from "@/lib/tools";

export default function FavoritesPage() {
  const tFav = useTranslations("Favorites");
  const tTools = useTranslations("Tools");
  const { favorites, isHydrated } = useFavorites();

  const favoriteTools = TOOLS_DATA.filter(tool => favorites.includes(tool.id));

  if (!isHydrated) return null;

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <div className="p-4 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 rounded-full mb-2">
          <Star className="h-10 w-10" fill="currentColor" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
          {tFav("title")}
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {tFav("description")}
        </p>
      </div>

      {favoriteTools.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-card rounded-xl border border-dashed shadow-sm">
          <Star className="h-16 w-16 text-muted-foreground/30 mb-4" />
          <h2 className="text-xl font-semibold mb-2">{tFav("emptyState")}</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            {tFav("emptyStateDesc")}
          </p>
          <Button asChild>
            <Link href="/">{tFav("exploreTools")}</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.href} href={tool.href} className="block group">
                <Card className="h-full transition-all hover:shadow-md hover:border-primary/50 cursor-pointer relative overflow-hidden">
                  <div className="absolute top-3 right-3 z-10">
                    <FavoriteButton toolId={tool.id} />
                  </div>
                  <CardHeader>
                    <div className="mb-2 p-2 w-fit rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{tTools(`${tool.id}.name`)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {tTools(`${tool.id}.description`)}
                    </CardDescription>
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
