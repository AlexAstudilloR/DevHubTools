"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useDebounce } from "@/hooks/useDebounce";

interface GradientConfig {
  type: "linear" | "radial";
  color1: string;
  color2: string;
  angle: number; // only for linear
}

export function GradientsClient() {
  const [config, setConfig] = useState<GradientConfig>({
    type: "linear",
    color1: "#3B82F6",
    color2: "#8B5CF6",
    angle: 90,
  });

  const debouncedConfig = useDebounce(config, 300);
  const [history, setHistory, isHydrated] = useLocalStorage<GradientConfig[]>("history-gradients", []);

  // Save to history when debounced config changes (and it's a new one)
  useEffect(() => {
    if (isHydrated) {
      setHistory(prev => {
        const isDuplicate = prev.length > 0 && 
          prev[0].type === debouncedConfig.type &&
          prev[0].color1 === debouncedConfig.color1 &&
          prev[0].color2 === debouncedConfig.color2 &&
          prev[0].angle === debouncedConfig.angle;

        if (isDuplicate) return prev;
        return [debouncedConfig, ...prev].slice(0, 5);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedConfig, isHydrated]);

  const generateCSS = (c: GradientConfig) => {
    if (c.type === "linear") {
      return `background: linear-gradient(${c.angle}deg, ${c.color1}, ${c.color2});`;
    }
    return `background: radial-gradient(circle, ${c.color1}, ${c.color2});`;
  };

  const cssOutput = generateCSS(config);

  const handleCopy = () => {
    navigator.clipboard.writeText(cssOutput);
  };

  const handleExport = () => {
    const css = `.gradient-bg {\n  ${cssOutput}\n}`;
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gradient.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout<GradientConfig>
      title="Generador de Gradientes"
      description="Crea fondos degradados con controles visuales y obtén el código CSS."
      toolId="gradients"
      history={isHydrated ? history : []}
      onCopy={handleCopy}
      onExport={handleExport}
      onRestoreHistory={(item) => setConfig(item)}
      renderHistoryItem={(item) => (
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-md shadow-sm border border-border" 
            style={{ 
              background: item.type === "linear" 
                ? `linear-gradient(${item.angle}deg, ${item.color1}, ${item.color2})`
                : `radial-gradient(circle, ${item.color1}, ${item.color2})`
            }} 
          />
          <div className="flex flex-col">
            <span className="font-mono text-xs">{item.color1} → {item.color2}</span>
            <span className="text-[10px] text-muted-foreground uppercase">
              {item.type} {item.type === "linear" ? `${item.angle}°` : ""}
            </span>
          </div>
        </div>
      )}
    >
      <div className="space-y-6">
        {/* Preview Area */}
        <div 
          className="w-full h-64 rounded-2xl shadow-inner border border-border transition-all duration-300"
          style={{
            background: config.type === "linear"
              ? `linear-gradient(${config.angle}deg, ${config.color1}, ${config.color2})`
              : `radial-gradient(circle, ${config.color1}, ${config.color2})`
          }}
        />

        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo</label>
                <div className="flex gap-2">
                  <Button 
                    variant={config.type === "linear" ? "default" : "outline"}
                    onClick={() => setConfig({ ...config, type: "linear" })}
                    className="flex-1"
                  >
                    Linear
                  </Button>
                  <Button 
                    variant={config.type === "radial" ? "default" : "outline"}
                    onClick={() => setConfig({ ...config, type: "radial" })}
                    className="flex-1"
                  >
                    Radial
                  </Button>
                </div>
              </div>

              {config.type === "linear" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Ángulo</label>
                    <span className="text-sm text-muted-foreground font-mono">{config.angle}°</span>
                  </div>
                  <Input 
                    type="range" 
                    min={0} 
                    max={360} 
                    value={config.angle} 
                    onChange={(e) => setConfig({ ...config, angle: Number(e.target.value) })}
                    className="w-full cursor-pointer"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Color 1</label>
                <div className="flex gap-2">
                  <Input 
                    type="color" 
                    value={config.color1} 
                    onChange={(e) => setConfig({ ...config, color1: e.target.value })}
                    className="w-12 p-1 h-10 cursor-pointer"
                  />
                  <Input 
                    type="text" 
                    value={config.color1.toUpperCase()} 
                    onChange={(e) => setConfig({ ...config, color1: e.target.value })}
                    className="font-mono"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Color 2</label>
                <div className="flex gap-2">
                  <Input 
                    type="color" 
                    value={config.color2} 
                    onChange={(e) => setConfig({ ...config, color2: e.target.value })}
                    className="w-12 p-1 h-10 cursor-pointer"
                  />
                  <Input 
                    type="text" 
                    value={config.color2.toUpperCase()} 
                    onChange={(e) => setConfig({ ...config, color2: e.target.value })}
                    className="font-mono"
                  />
                </div>
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
