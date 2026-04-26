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
    <nav className="flex items-center">
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
      <div className="lg:hidden">
        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-background z-40 lg:hidden overflow-y-auto border-t">
          <div className="p-4 space-y-6 pb-20">
            <Link 
              href="/favorites" 
              className="flex items-center gap-2 text-lg font-semibold border-b pb-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
              {tSidebar("favorites")}
            </Link>

            {categories.map((bucket) => (
              <div key={bucket.id} className="space-y-3">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                  {tCategories(bucket.id)}
                </h3>
                <div className="grid grid-cols-1 gap-2 pl-2">
                  {toolsByBucket(bucket.subCategories).map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link 
                        key={tool.id} 
                        href={tool.href}
                        className="flex items-center gap-3 py-2 text-base font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="bg-muted p-2 rounded-md">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span>{tTools(`${tool.id}.name`)}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="pt-4 border-t space-y-4">
              <Link href="/blog" className="block text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
                {tSidebar("blog")}
              </Link>
              <Link href="/about" className="block text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
                {tSidebar("about")}
              </Link>
              <Link href="/contact" className="block text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
                {tSidebar("contact")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
