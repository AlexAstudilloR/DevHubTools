import React from "react";
import { cn } from "@/lib/utils";

interface AdPlaceholderProps {
  position: "header" | "sidebar" | "between-cards" | "tool-page";
  className?: string;
}

export function AdPlaceholder({ position, className }: AdPlaceholderProps) {
  const styles = {
    header: "h-[90px] w-full max-w-[728px] mx-auto mb-4",
    sidebar: "h-[250px] w-full mt-auto",
    "between-cards": "h-[250px] w-full my-6",
    "tool-page": "h-[90px] w-full max-w-[728px] mx-auto mt-8",
  };

  return (
    <div
      className={cn(
        "bg-muted/20 border border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center overflow-hidden animate-pulse",
        styles[position],
        className
      )}
    >
      <span className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
        Anuncio - {position}
      </span>
    </div>
  );
}
