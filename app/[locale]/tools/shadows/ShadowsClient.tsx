"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useDebounce } from "@/hooks/useDebounce";

interface ShadowConfig {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number; // 0 to 100
  inset: boolean;
}

export function ShadowsClient() {
  const [config, setConfig] = useState<ShadowConfig>({
    x: 10,
    y: 10,
    blur: 15,
    spread: -3,
    color: "#000000",
    opacity: 30,
    inset: false,
  });

  const debouncedConfig = useDebounce(config, 300);
  const [history, setHistory, isHydrated] = useLocalStorage<ShadowConfig[]>("history-shadows", []);

  useEffect(() => {
    if (isHydrated) {
      setHistory(prev => {
        const isDuplicate = prev.length > 0 && 
          JSON.stringify(prev[0]) === JSON.stringify(debouncedConfig);
        if (isDuplicate) return prev;
        return [debouncedConfig, ...prev].slice(0, 5);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedConfig, isHydrated]);

  // Convert hex + opacity to rgba
  const getRgba = (hex: string, alpha: number) => {
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
    return `rgba(${r}, ${g}, ${b}, ${(alpha / 100).toFixed(2)})`;
  };

  const rgbaColor = getRgba(config.color, config.opacity);
  const shadowValue = `${config.inset ? "inset " : ""}${config.x}px ${config.y}px ${config.blur}px ${config.spread}px ${rgbaColor}`;
  const cssOutput = `box-shadow: ${shadowValue};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssOutput);
  };

  const handleExport = () => {
    const css = `.shadow-box {\n  ${cssOutput}\n}`;
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shadow.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout<ShadowConfig>
      title="Generador de Sombras CSS"
      description="Configura de forma visual las propiedades de box-shadow y obtén el código CSS."
      toolId="shadows"
      history={isHydrated ? history : []}
      onCopy={handleCopy}
      onExport={handleExport}
      onRestoreHistory={(item) => setConfig(item)}
      renderHistoryItem={(item) => (
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs truncate">
            {item.inset ? "inset " : ""}{item.x}px {item.y}px {item.blur}px
          </span>
          <span className="text-[10px] text-muted-foreground flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getRgba(item.color, item.opacity) }} />
            {getRgba(item.color, item.opacity)}
          </span>
        </div>
      )}
    >
      <div className="space-y-6">
        {/* Preview Area */}
        <div className="w-full h-64 bg-muted/20 border flex items-center justify-center rounded-xl">
          <div 
            className="w-40 h-40 bg-card rounded-2xl flex items-center justify-center text-sm font-medium text-muted-foreground transition-all duration-300"
            style={{ boxShadow: shadowValue }}
          >
            Preview
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Desplazamiento X</label>
                  <span className="text-sm text-muted-foreground font-mono">{config.x}px</span>
                </div>
                <Input type="range" min={-50} max={50} value={config.x} onChange={(e) => setConfig({ ...config, x: Number(e.target.value) })} className="cursor-pointer" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Desplazamiento Y</label>
                  <span className="text-sm text-muted-foreground font-mono">{config.y}px</span>
                </div>
                <Input type="range" min={-50} max={50} value={config.y} onChange={(e) => setConfig({ ...config, y: Number(e.target.value) })} className="cursor-pointer" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Desenfoque (Blur)</label>
                  <span className="text-sm text-muted-foreground font-mono">{config.blur}px</span>
                </div>
                <Input type="range" min={0} max={100} value={config.blur} onChange={(e) => setConfig({ ...config, blur: Number(e.target.value) })} className="cursor-pointer" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Propagación (Spread)</label>
                  <span className="text-sm text-muted-foreground font-mono">{config.spread}px</span>
                </div>
                <Input type="range" min={-50} max={50} value={config.spread} onChange={(e) => setConfig({ ...config, spread: Number(e.target.value) })} className="cursor-pointer" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Color de la sombra</label>
                <div className="flex gap-2">
                  <Input type="color" value={config.color} onChange={(e) => setConfig({ ...config, color: e.target.value })} className="w-12 p-1 h-10 cursor-pointer" />
                  <Input type="text" value={config.color.toUpperCase()} onChange={(e) => setConfig({ ...config, color: e.target.value })} className="font-mono flex-1" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Opacidad del color</label>
                  <span className="text-sm text-muted-foreground font-mono">{config.opacity}%</span>
                </div>
                <Input type="range" min={0} max={100} value={config.opacity} onChange={(e) => setConfig({ ...config, opacity: Number(e.target.value) })} className="cursor-pointer" />
              </div>

              <div className="flex items-center space-x-2 pt-4">
                <input 
                  type="checkbox" 
                  id="inset" 
                  checked={config.inset}
                  onChange={(e) => setConfig({ ...config, inset: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="inset" className="text-sm font-medium cursor-pointer">Sombra Interior (Inset)</label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/30">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground mb-2">Código CSS:</div>
            <pre className="font-mono text-sm overflow-x-auto p-4 bg-background border rounded-lg">
              {cssOutput}
            </pre>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
