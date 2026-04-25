import React from "react";
import { cn } from "@/lib/utils";

interface AdBannerProps {
  className?: string;
}

export function AdBanner({ className }: AdBannerProps) {
  return (
    <div className={cn("w-full h-[90px] bg-muted flex items-center justify-center border-y border-dashed overflow-hidden text-muted-foreground text-sm font-medium", className)}>
      [Google AdSense - Horizontal Banner (728x90)]
    </div>
  );
}

export function AdSidebar({ className }: AdBannerProps) {
  return (
    <div className={cn("w-full h-[600px] bg-muted flex items-center justify-center border border-dashed rounded-lg overflow-hidden text-muted-foreground text-sm font-medium p-4 text-center", className)}>
      [Google AdSense - Sidebar (300x600)]
    </div>
  );
}

export function AdInline({ className }: AdBannerProps) {
  return (
    <div className={cn("w-full min-h-[250px] bg-muted flex items-center justify-center border border-dashed rounded-lg overflow-hidden text-muted-foreground text-sm font-medium p-4", className)}>
      [Google AdSense - Inline Rectangle (300x250)]
    </div>
  );
}

export function AdStickyMobileFooter({ className }: AdBannerProps) {
  return (
    <div className={cn("md:hidden fixed bottom-0 left-0 right-0 h-[50px] bg-muted flex items-center justify-center border-t border-dashed z-40 text-muted-foreground text-xs font-medium", className)}>
      [AdSense - Mobile Sticky (320x50)]
    </div>
  );
}
