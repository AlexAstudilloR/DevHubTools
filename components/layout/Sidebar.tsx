"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Palette, 
  KeyRound, 
  Hash, 
  Paintbrush, 
  BoxSelect, 
  LayoutGrid, 
  FileJson, 
  Type, 
  ShieldCheck, 
  FileCode2, 
  Ruler, 
  Contrast,
  Menu,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";

const TOOLS = [
  { name: "Paleta de Colores", href: "/tools/color-palette", icon: Palette },
  { name: "JWT Secret", href: "/tools/jwt", icon: KeyRound },
  { name: "UUID/GUID", href: "/tools/uuid", icon: Hash },
  { name: "Gradientes CSS", href: "/tools/gradients", icon: Paintbrush },
  { name: "Sombras CSS", href: "/tools/shadows", icon: BoxSelect },
  { name: "Grid CSS", href: "/tools/grid", icon: LayoutGrid },
  { name: "JSON Formatter", href: "/tools/json", icon: FileJson },
  { name: "Lorem Ipsum", href: "/tools/lorem", icon: Type },
  { name: "Contraseñas", href: "/tools/password", icon: ShieldCheck },
  { name: "CSS Minifier", href: "/tools/css-minifier", icon: FileCode2 },
  { name: "Conversor Unidades", href: "/tools/units", icon: Ruler },
  { name: "Contraste WCAG", href: "/tools/contrast", icon: Contrast },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside className={cn(
      "border-r bg-card transition-all duration-300 flex flex-col",
      collapsed ? "w-[80px]" : "w-[280px]"
    )}>
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!collapsed && <span className="font-bold text-lg text-primary">DevTools Hub</span>}
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="ml-auto">
          {collapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="grid gap-1 px-2">
          {TOOLS.map((tool) => {
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
                  {!collapsed && <span>{tool.name}</span>}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
