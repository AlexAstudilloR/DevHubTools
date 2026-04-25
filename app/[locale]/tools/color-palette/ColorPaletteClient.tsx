"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface ColorResult {
  base: string;
  analogous: string[];
  complementary: string;
}

// Funciones auxiliares para conversión de colores
function hexToHSL(hex: string) {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt("0x" + hex[1] + hex[1]);
    g = parseInt("0x" + hex[2] + hex[2]);
    b = parseInt("0x" + hex[3] + hex[3]);
  } else if (hex.length === 7) {
    r = parseInt("0x" + hex[1] + hex[2]);
    g = parseInt("0x" + hex[3] + hex[4]);
    b = parseInt("0x" + hex[5] + hex[6]);
  }
  r /= 255; g /= 255; b /= 255;
  const cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin;
  let h = 0, s = 0, l = 0;
  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  return { h, s, l };
}

function hslToHex(h: number, s: number, l: number) {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (0 <= h && h < 60) { r = c; g = x; b = 0; }
  else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
  else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
  else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
  else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
  else if (300 <= h && h < 360) { r = c; g = 0; b = x; }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  const toHex = (n: number) => {
    const hex = n.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function isValidHex(hex: string) {
  return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
}

export function ColorPaletteClient() {
  const [hexInput, setHexInput] = useState("#3B82F6");
  const [result, setResult] = useState<ColorResult | null>(null);
  
  // Historial usando nuestro hook
  const [history, setHistory, isHydrated] = useLocalStorage<ColorResult[]>("history-color-palette", []);

  useEffect(() => {
    generatePalette(hexInput, false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generatePalette = (hex: string, saveToHistory: boolean = true) => {
    if (!isValidHex(hex)) return;
    
    // Normalize hex
    const normalizedHex = hex.length === 4 
      ? "#" + hex[1]+hex[1]+hex[2]+hex[2]+hex[3]+hex[3] 
      : hex.toUpperCase();

    const { h, s, l } = hexToHSL(normalizedHex);
    
    const analogous1 = hslToHex((h + 30) % 360, s, l);
    const analogous2 = hslToHex((h + 330) % 360, s, l);
    const complementary = hslToHex((h + 180) % 360, s, l);

    const newResult = {
      base: normalizedHex,
      analogous: [analogous1, analogous2],
      complementary
    };

    setResult(newResult);

    if (saveToHistory) {
      setHistory(prev => {
        const filtered = prev.filter(p => p.base !== newResult.base);
        return [newResult, ...filtered].slice(0, 5);
      });
    }
  };

  const handleExportCSS = () => {
    if (!result) return;
    const css = `:root {\n  --color-base: ${result.base};\n  --color-analogous-1: ${result.analogous[0]};\n  --color-analogous-2: ${result.analogous[1]};\n  --color-complementary: ${result.complementary};\n}`;
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'palette.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderColorBox = (color: string, label: string) => (
    <div className="flex flex-col items-center gap-2">
      <div 
        className="w-24 h-24 rounded-lg shadow-inner border border-border" 
        style={{ backgroundColor: color }}
      />
      <div className="text-sm font-medium">{color}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );

  return (
    <ToolLayout<ColorResult>
      title="Paleta de Colores"
      description="Ingresa un color HEX y obtén variantes análogas y complementarias."
      toolId="color-palette"
      history={isHydrated ? history : []}
      onRestoreHistory={(item) => {
        setHexInput(item.base);
        setResult(item);
      }}
      onExport={handleExportCSS}
      renderHistoryItem={(item) => (
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md shadow-sm" style={{ backgroundColor: item.base }} />
          <span className="font-mono text-sm">{item.base}</span>
        </div>
      )}
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-4 items-end">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium">Color Base (HEX)</label>
                <div className="flex gap-2">
                  <div 
                    className="w-10 h-10 rounded-md border shrink-0" 
                    style={{ backgroundColor: isValidHex(hexInput) ? hexInput : 'transparent' }}
                  />
                  <Input 
                    value={hexInput} 
                    onChange={(e) => setHexInput(e.target.value)} 
                    placeholder="#3B82F6"
                    className="font-mono uppercase"
                  />
                </div>
              </div>
              <Button onClick={() => generatePalette(hexInput)}>Generar</Button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-card rounded-xl border">
            {renderColorBox(result.base, "Base")}
            {renderColorBox(result.analogous[0], "Análogo 1")}
            {renderColorBox(result.analogous[1], "Análogo 2")}
            {renderColorBox(result.complementary, "Complementario")}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
