"use client";

import React from "react";
import Link from "next/link";
import { 
  Palette, KeyRound, Hash, Paintbrush, BoxSelect, 
  LayoutGrid, FileJson, Type, ShieldCheck, FileCode2, 
  Ruler, Contrast, ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TOOLS = [
  { name: "Paleta de Colores", description: "Genera variantes análogas y complementarias.", href: "/tools/color-palette", icon: Palette },
  { name: "JWT Secret", description: "Genera claves seguras para JWT.", href: "/tools/jwt", icon: KeyRound },
  { name: "UUID/GUID", description: "Genera identificadores únicos (v4/v5).", href: "/tools/uuid", icon: Hash },
  { name: "Gradientes CSS", description: "Crea fondos con gradientes lineales y radiales.", href: "/tools/gradients", icon: Paintbrush },
  { name: "Sombras CSS", description: "Diseña sombras y cópialas como CSS.", href: "/tools/shadows", icon: BoxSelect },
  { name: "Grid CSS", description: "Genera layouts con CSS Grid visualmente.", href: "/tools/grid", icon: LayoutGrid },
  { name: "JSON Formatter", description: "Formatea, valida y minifica JSON.", href: "/tools/json", icon: FileJson },
  { name: "Lorem Ipsum", description: "Genera texto de relleno en segundos.", href: "/tools/lorem", icon: Type },
  { name: "Contraseñas", description: "Genera contraseñas fuertes y seguras.", href: "/tools/password", icon: ShieldCheck },
  { name: "CSS Minifier", description: "Reduce el tamaño de tu código CSS.", href: "/tools/css-minifier", icon: FileCode2 },
  { name: "Conversor Unidades", description: "Convierte entre px, rem y em.", href: "/tools/units", icon: Ruler },
  { name: "Contraste WCAG", description: "Verifica el contraste entre colores.", href: "/tools/contrast", icon: Contrast },
];

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
          Bienvenido a <span className="text-primary">DevTools Hub</span>
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Una colección de herramientas esenciales para desarrolladores, todo ejecutándose directamente en tu navegador sin enviar datos a ningún servidor.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link key={tool.href} href={tool.href}>
              <Card className="h-full transition-all hover:shadow-md hover:border-primary/50 group cursor-pointer">
                <CardHeader>
                  <div className="mb-2 p-2 w-fit rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {tool.description}
                  </CardDescription>
                  <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Abrir herramienta <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
