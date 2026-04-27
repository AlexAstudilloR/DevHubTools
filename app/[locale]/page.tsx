"use client";

import React, { useState, useMemo } from "react";
import { Link } from "@/lib/navigation";
import { useTranslations } from 'next-intl';
import { Search, X, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { AdInline } from "@/components/ads/AdPlaceholders";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TOOLS_DATA } from "@/lib/tools";

export default function Home() {
  const t = useTranslations('Index');
  const tTools = useTranslations('Tools');
  const tCat = useTranslations('Categories');
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const CATEGORIES = [
    { id: "all", label: tCat('all') },
    { id: "css", label: tCat('css') },
    { id: "dev", label: tCat('dev') },
    { id: "text", label: tCat('text') },
    { id: "security", label: tCat('security') },
    { id: "utility", label: tCat('utility') },
  ];

  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter(tool => {
      const name = tTools(`${tool.id}.name`).toLowerCase();
      const desc = tTools(`${tool.id}.description`).toLowerCase();
      const query = searchQuery.toLowerCase();
      const matchesSearch = name.includes(query) || desc.includes(query);
      const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, tTools]);

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="flex flex-col items-center text-center space-y-4 mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
          {t('title').split('FastDevTools')[0]} <span className="text-primary">FastDevTools</span>
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {t('description')}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder={t('searchPlaceholder')} 
            className="pl-9 pr-9" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto space-x-2 scrollbar-thin">
          {CATEGORIES.map(cat => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
              className="whitespace-nowrap"
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {filteredTools.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-muted-foreground text-lg">{t('noResults')}</p>
          <Button variant="link" onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}>
            {t('clearFilters')}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <React.Fragment key={tool.href}>
                {index === 4 && selectedCategory === "all" && !searchQuery && (
                  <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4">
                     <AdInline />
                  </div>
                )}
                <Link href={tool.href} className="block group">
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
                      <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        {t('openTool')} <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}
