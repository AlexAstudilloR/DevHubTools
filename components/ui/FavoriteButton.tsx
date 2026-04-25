"use client";

import React from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/context/FavoritesContext";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  toolId: string;
  className?: string;
}

export function FavoriteButton({ toolId, className }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isHydrated } = useFavorites();

  if (!isHydrated) {
    return <Button variant="ghost" size="icon" className={cn("opacity-0", className)} disabled><Star className="h-5 w-5" /></Button>;
  }

  const active = isFavorite(toolId);

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "transition-all duration-300",
        active ? "text-yellow-500 hover:text-yellow-600 hover:bg-yellow-500/10" : "text-muted-foreground hover:text-foreground",
        className
      )}
      onClick={(e) => {
        e.preventDefault(); // Prevent navigating if inside a Link
        e.stopPropagation();
        toggleFavorite(toolId);
      }}
    >
      <Star className="h-5 w-5" fill={active ? "currentColor" : "none"} />
    </Button>
  );
}
