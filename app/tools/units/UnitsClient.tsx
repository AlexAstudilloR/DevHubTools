"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface UnitConversion {
  base: number;
  px: number;
  rem: number;
  em: number;
}

export function UnitsClient() {
  const [base, setBase] = useState<number>(16);
  const [px, setPx] = useState<number | string>(16);
  const [rem, setRem] = useState<number | string>(1);
  const [em, setEm] = useState<number | string>(1);

  const [history, setHistory, isHydrated] = useLocalStorage<UnitConversion[]>("history-units", []);

  const handleBaseChange = (val: string) => {
    const num = parseFloat(val);
    setBase(isNaN(num) ? 16 : num);
    if (!isNaN(num) && num > 0) {
      const currentPx = parseFloat(px as string) || 0;
      setRem(currentPx / num);
      setEm(currentPx / num);
    }
  };

  const handlePxChange = (val: string) => {
    setPx(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setRem(num / base);
      setEm(num / base);
    } else {
      setRem("");
      setEm("");
    }
  };

  const handleRemChange = (val: string) => {
    setRem(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setPx(num * base);
      setEm(num); // Assuming rem and em are equivalent at this level
    } else {
      setPx("");
      setEm("");
    }
  };

  const handleEmChange = (val: string) => {
    setEm(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setPx(num * base);
      setRem(num);
    } else {
      setPx("");
      setRem("");
    }
  };

  // Guardar en historial cuando se detenga de tipear (debounced manual simple)
  useEffect(() => {
    const timer = setTimeout(() => {
      const p = parseFloat(px as string);
      if (!isNaN(p) && p > 0) {
        setHistory(prev => {
          const item = { base, px: p, rem: parseFloat(rem as string), em: parseFloat(em as string) };
          const isDuplicate = prev.length > 0 && prev[0].px === p && prev[0].base === base;
          if (isDuplicate) return prev;
          return [item, ...prev].slice(0, 5);
        });
      }
    }, 1000);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [px, rem, em, base]);

  const outputText = `/* CSS */\n.elemento {\n  font-size: ${px}px;\n  /* equivalente a ${rem}rem o ${em}em */\n}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
  };

  return (
    <ToolLayout<UnitConversion>
      title="Conversor de Unidades CSS"
      description="Convierte medidas entre píxeles (px), rem y em con base a un tamaño raíz."
      toolId="units"
      history={isHydrated ? history : []}
      onCopy={handleCopy}
      onRestoreHistory={(item) => {
        setBase(item.base);
        setPx(item.px);
        setRem(item.rem);
        setEm(item.em);
      }}
      renderHistoryItem={(item) => (
        <div className="flex flex-col gap-1">
          <span className="font-mono text-sm">
            {item.px}px = {item.rem}rem
          </span>
          <span className="text-[10px] text-muted-foreground">
            Base: {item.base}px
          </span>
        </div>
      )}
    >
      <div className="space-y-6">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <label className="text-sm font-medium whitespace-nowrap">Tamaño base (raíz):</label>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Input 
                  type="number" 
                  value={base} 
                  onChange={(e) => handleBaseChange(e.target.value)} 
                  className="w-24 font-mono"
                />
                <span className="text-sm font-medium">px</span>
              </div>
              <p className="text-xs text-muted-foreground w-full sm:w-auto mt-2 sm:mt-0">
                Generalmente los navegadores usan 16px por defecto.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold tracking-tight mb-1">Píxeles</div>
                  <div className="text-xs text-muted-foreground">Absoluto (px)</div>
                </div>
                <Input 
                  type="number" 
                  value={px} 
                  onChange={(e) => handlePxChange(e.target.value)} 
                  className="h-16 text-center text-2xl font-mono"
                />
              </div>

              <div className="space-y-4 relative">
                <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -left-4 text-muted-foreground">
                  =
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold tracking-tight mb-1">Rem</div>
                  <div className="text-xs text-muted-foreground">Relativo al root</div>
                </div>
                <Input 
                  type="number" 
                  value={rem} 
                  onChange={(e) => handleRemChange(e.target.value)} 
                  className="h-16 text-center text-2xl font-mono"
                />
              </div>

              <div className="space-y-4 relative">
                <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -left-4 text-muted-foreground">
                  =
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold tracking-tight mb-1">Em</div>
                  <div className="text-xs text-muted-foreground">Relativo al padre</div>
                </div>
                <Input 
                  type="number" 
                  value={em} 
                  onChange={(e) => handleEmChange(e.target.value)} 
                  className="h-16 text-center text-2xl font-mono"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/30">
          <CardContent className="p-4">
            <pre className="font-mono text-sm overflow-x-auto p-4 bg-background border rounded-lg text-muted-foreground">
              {outputText}
            </pre>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
