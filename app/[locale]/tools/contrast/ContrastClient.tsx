"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CheckCircle2, XCircle } from "lucide-react";

interface ContrastHistory {
  fg: string;
  bg: string;
  ratio: number;
}

// Convert hex to rgb
function hexToRgb(hex: string) {
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
  return [r, g, b];
}

// Calculate relative luminance
function luminance(r: number, g: number, b: number) {
  const a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Calculate contrast ratio
function contrastRatio(hex1: string, hex2: string) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
  const lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

function isValidHex(hex: string) {
  return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
}

export function ContrastClient() {
  const [fg, setFg] = useState<string>("#FFFFFF");
  const [bg, setBg] = useState<string>("#3B82F6");
  const [ratio, setRatio] = useState<number>(0);
  
  const [history, setHistory, isHydrated] = useLocalStorage<ContrastHistory[]>("history-contrast", []);

  useEffect(() => {
    if (isValidHex(fg) && isValidHex(bg)) {
      const fgFull = fg.length === 4 ? "#" + fg[1]+fg[1]+fg[2]+fg[2]+fg[3]+fg[3] : fg;
      const bgFull = bg.length === 4 ? "#" + bg[1]+bg[1]+bg[2]+bg[2]+bg[3]+bg[3] : bg;
      
      const r = contrastRatio(fgFull, bgFull);
      setRatio(r);

      const timer = setTimeout(() => {
        setHistory(prev => {
          const isDuplicate = prev.length > 0 && prev[0].fg.toUpperCase() === fgFull.toUpperCase() && prev[0].bg.toUpperCase() === bgFull.toUpperCase();
          if (isDuplicate) return prev;
          return [{ fg: fgFull.toUpperCase(), bg: bgFull.toUpperCase(), ratio: r }, ...prev].slice(0, 5);
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fg, bg]);

  const ScoreCard = ({ title, target, current }: { title: string, target: number, current: number }) => {
    const passed = current >= target;
    return (
      <div className={`p-4 rounded-lg border flex items-center justify-between ${passed ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"}`}>
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-muted-foreground">Requiere {target}:1</div>
        </div>
        {passed ? (
          <CheckCircle2 className="h-6 w-6 text-green-500" />
        ) : (
          <XCircle className="h-6 w-6 text-red-500" />
        )}
      </div>
    );
  };

  return (
    <ToolLayout<ContrastHistory>
      title="Calculadora Contraste WCAG"
      description="Asegura que tu combinación de colores sea accesible para todos."
      toolId="contrast"
      history={isHydrated ? history : []}
      onRestoreHistory={(item) => {
        setFg(item.fg);
        setBg(item.bg);
      }}
      renderHistoryItem={(item) => (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md flex items-center justify-center font-bold text-xs" style={{ backgroundColor: item.bg, color: item.fg }}>
              Aa
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[10px]">{item.fg}</span>
              <span className="font-mono text-[10px]">{item.bg}</span>
            </div>
          </div>
          <span className="font-bold text-sm">{item.ratio.toFixed(2)}</span>
        </div>
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Color del Texto (Foreground)</label>
                <div className="flex gap-2">
                  <Input 
                    type="color" 
                    value={isValidHex(fg) ? fg : "#000000"} 
                    onChange={(e) => setFg(e.target.value)} 
                    className="w-12 p-1 h-10 cursor-pointer"
                  />
                  <Input 
                    type="text" 
                    value={fg.toUpperCase()} 
                    onChange={(e) => setFg(e.target.value)} 
                    className="font-mono flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Color de Fondo (Background)</label>
                <div className="flex gap-2">
                  <Input 
                    type="color" 
                    value={isValidHex(bg) ? bg : "#ffffff"} 
                    onChange={(e) => setBg(e.target.value)} 
                    className="w-12 p-1 h-10 cursor-pointer"
                  />
                  <Input 
                    type="text" 
                    value={bg.toUpperCase()} 
                    onChange={(e) => setBg(e.target.value)} 
                    className="font-mono flex-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ScoreCard title="Texto Normal (AA)" target={4.5} current={ratio} />
            <ScoreCard title="Texto Grande (AA)" target={3.0} current={ratio} />
            <ScoreCard title="Texto Normal (AAA)" target={7.0} current={ratio} />
            <ScoreCard title="Texto Grande (AAA)" target={4.5} current={ratio} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-8 rounded-2xl border transition-colors duration-300 shadow-inner h-full flex flex-col justify-center items-center text-center gap-6" style={{ backgroundColor: bg, color: fg }}>
            <div className="text-[5rem] font-bold tracking-tighter leading-none">
              {ratio.toFixed(2)}
            </div>
            
            <div className="space-y-4 w-full px-4 text-left">
              <p className="text-3xl font-bold">Texto Grande</p>
              <p className="text-lg">Texto normal para previsualizar cómo se leería un párrafo con esta combinación de colores elegida.</p>
              <Button variant="outline" className="mt-4" style={{ backgroundColor: bg, color: fg, borderColor: fg }}>Botón de Muestra</Button>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
