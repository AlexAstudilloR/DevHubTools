"use client";

import React, { ReactNode } from "react";
import { Star, Copy, History, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { AdPlaceholder } from "@/components/ads/AdPlaceholder";
import { useTranslation } from "@/hooks/useTranslation";



interface ToolLayoutProps<T> {
  title: string;
  description: string;
  toolId: string;
  children: ReactNode;
  onExport?: () => void;
  onCopy?: () => void;
  history?: T[];
  onRestoreHistory?: (item: T) => void;
  renderHistoryItem?: (item: T) => ReactNode;
}

export function ToolLayout<T>({ 
  title, 
  description, 
  toolId, 
  children, 
  onExport,
  onCopy,
  history = [],
  onRestoreHistory,
  renderHistoryItem
}: ToolLayoutProps<T>) {
  const [favorites, setFavorites, isHydrated] = useLocalStorage<string[]>("devhub-favorites", []);
  const { toast } = useToast();
  const { t } = useTranslation();

  const isFavorite = isHydrated ? favorites.includes(toolId) : false;

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter((id) => id !== toolId));
      toast({ title: t('toast.favorite_removed'), description: `${title} ${t('toast.favorite_removed_desc')}` });
    } else {
      setFavorites([...favorites, toolId]);
      toast({ title: t('toast.favorite_added'), description: `${title} ${t('toast.favorite_added_desc')}` });
    }
  };

  const handleCopy = () => {
    if (onCopy) {
      onCopy();
      toast({ title: t('common.copy'), description: t('toast.copied_desc') });
    }
  };

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4 sm:px-6 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-6 rounded-xl border shadow-sm">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {onCopy && (
            <Button variant="outline" onClick={handleCopy}>
              <Copy className="h-4 w-4 mr-2" />
              {t('common.copy')}
            </Button>
          )}
          {onExport && (
            <Button variant="outline" onClick={onExport}>
              <Download className="h-4 w-4 mr-2" />
              {t('common.export')}
            </Button>
          )}
          <Button variant={isFavorite ? "default" : "outline"} onClick={toggleFavorite}>
            <Star className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
            {isFavorite ? t('common.is_favorite') : t('common.add_favorite')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          {children}
          <AdPlaceholder position="tool-page" />
        </div>
        <div className="lg:col-span-1 space-y-4">
          <AdPlaceholder position="between-cards" />
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                <History className="h-4 w-4" />
                {t('common.history')}
              </div>
              {history.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">{t('common.no_history')}</p>
              ) : (
                <ul className="space-y-2">
                  {history.map((item, idx) => (
                    <li 
                      key={idx} 
                      className="text-sm bg-muted/50 p-3 rounded-md cursor-pointer hover:bg-accent transition-colors"
                      onClick={() => onRestoreHistory && onRestoreHistory(item)}
                    >
                      {renderHistoryItem ? renderHistoryItem(item) : "Item"}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
