"use client";

import React from 'react';

import { useTranslation } from '@/hooks/useTranslation';
import { Globe } from 'lucide-react';

export function LocaleSwitcher() {
  const { locale, setLocale } = useTranslation();

  return (
    <div className="relative flex items-center">
      <Globe className="absolute left-2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
        className="h-9 w-24 rounded-md border border-input bg-background pl-8 pr-2 text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <option value="es">ES</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
}
