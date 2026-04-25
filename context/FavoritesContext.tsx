"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type FavoritesContextType = {
  favorites: string[];
  toggleFavorite: (toolId: string) => void;
  isFavorite: (toolId: string) => boolean;
  isHydrated: boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites, isHydrated] = useLocalStorage<string[]>("devhub-favorites", []);

  const toggleFavorite = (toolId: string) => {
    setFavorites((prev) => {
      if (prev.includes(toolId)) {
        return prev.filter((id) => id !== toolId);
      }
      return [...prev, toolId];
    });
  };

  const isFavorite = (toolId: string) => {
    return favorites.includes(toolId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, isHydrated }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
