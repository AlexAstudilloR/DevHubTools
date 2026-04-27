"use client";

import React, { useState } from "react";
import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";
import { TOOLS_DATA } from "@/lib/tools";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "dev", icon: null, subCategories: ["dev", "security"] },
  { id: "css", icon: null, subCategories: ["css"] },
  { id: "text", icon: null, subCategories: ["text", "utility"] },
];

export function CategoryNav() {
  const tCategories = useTranslations("Categories");
  const tTools = useTranslations("Tools");
  const tSidebar = useTranslations("Sidebar");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toolsByBucket = (subCats: string[]) => 
    TOOLS_DATA.filter(tool => subCats.includes(tool.category));

  return (
    <nav className="flex items-center shrink-0">
      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-1">
        {categories.map((bucket) => (
          <div 
            key={bucket.id} 
            className="relative group"
            onMouseEnter={() => setActiveCategory(bucket.id)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <button className="px-4 py-2 text-sm font-semibold flex items-center gap-1 hover:text-primary transition-colors">
              {tCategories(bucket.id)}
              <ChevronDown className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
            
            <div className={cn(
              "absolute top-full left-0 w-72 bg-background border rounded-xl shadow-xl py-3 z-50 transition-all duration-200 transform origin-top-left",
              activeCategory === bucket.id ? "opacity-100 scale-100 visible translate-y-0" : "opacity-0 scale-95 invisible -translate-y-2"
            )}>
              <div className="grid grid-cols-1 gap-1 px-2">
                {toolsByBucket(bucket.subCategories).map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link 
                      key={tool.id} 
                      href={tool.href}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-primary/5 hover:text-primary transition-colors group/item"
                    >
                      <div className="bg-muted p-1.5 rounded-md group-hover/item:bg-primary/10 transition-colors">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{tTools(`${tool.id}.name`)}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        <div className="h-4 w-px bg-border mx-2" />
        
        <Link href="/blog" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors">
          {tSidebar("blog")}
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => {
            console.log("Mobile menu clicked, current state:", mobileMenuOpen);
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          aria-label="Toggle Menu"
          className={cn("relative z-[1001] h-10 w-10", mobileMenuOpen && "bg-accent")}
        >
          {mobileMenuOpen ? <X className="h-6 w-6 text-primary" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 top-[64px] left-0 w-full h-[calc(100vh-64px)] bg-background z-[9999] lg:hidden overflow-y-auto border-t pointer-events-auto"
          style={{ position: 'fixed', display: 'block', zIndex: 9999, backgroundColor: 'hsl(var(--background))' }}
        >
          <div className="p-4 space-y-6 pb-20">
            <Link 
              href="/favorites" 
              className="flex items-center gap-3 text-lg font-semibold border-b pb-4 text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Star className="h-5 w-5 fill-primary text-primary" />
              {tSidebar("favorites")}
            </Link>

            {categories.map((bucket) => (
              <div key={bucket.id} className="space-y-3">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2">
                  {tCategories(bucket.id)}
                </h3>
                <div className="grid grid-cols-1 gap-1">
                  {toolsByBucket(bucket.subCategories).map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link 
                        key={tool.id} 
                        href={tool.href}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-primary/5 transition-colors active:bg-primary/10"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="bg-primary/10 p-2 rounded-lg text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-medium">{tTools(`${tool.id}.name`)}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="pt-4 border-t grid grid-cols-2 gap-4">
              <Link href="/blog" className="flex items-center justify-center p-3 rounded-lg bg-muted font-medium text-sm" onClick={() => setMobileMenuOpen(false)}>
                {tSidebar("blog")}
              </Link>
              <Link href="/about" className="flex items-center justify-center p-3 rounded-lg bg-muted font-medium text-sm" onClick={() => setMobileMenuOpen(false)}>
                {tSidebar("about")}
              </Link>
              <Link href="/contact" className="flex items-center justify-center p-3 rounded-lg bg-muted font-medium text-sm col-span-2" onClick={() => setMobileMenuOpen(false)}>
                {tSidebar("contact")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
