"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useDebounce } from "@/hooks/useDebounce";

interface GridConfig {
  columns: number;
  rows: number;
  columnGap: number;
  rowGap: number;
}

export function GridClient() {
  const [config, setConfig] = useState<GridConfig>({
    columns: 3,
    rows: 3,
    columnGap: 16,
    rowGap: 16,
  });

  const debouncedConfig = useDebounce(config, 300);
  const [history, setHistory, isHydrated] = useLocalStorage<GridConfig[]>("history-grid", []);

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

  const cssOutput = `.grid-container {
  display: grid;
  grid-template-columns: repeat(${config.columns}, 1fr);
  grid-template-rows: repeat(${config.rows}, 1fr);
  column-gap: ${config.columnGap}px;
  row-gap: ${config.rowGap}px;
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssOutput);
  };

  const handleExport = () => {
    const blob = new Blob([cssOutput], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grid.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalItems = config.columns * config.rows;

  return (
    <ToolLayout<GridConfig>
      title="Grid CSS Generator"
      description="Crea layouts de CSS Grid visualmente y obtén el código listo para usar."
      toolId="grid"
      history={isHydrated ? history : []}
      onCopy={handleCopy}
      onExport={handleExport}
      onRestoreHistory={(item) => setConfig(item)}
      renderHistoryItem={(item) => (
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs font-medium">
            {item.columns} x {item.rows}
          </span>
          <span className="text-[10px] text-muted-foreground">
            Gap: {item.columnGap}px / {item.rowGap}px
          </span>
        </div>
      )}
    >
      <div className="space-y-6">
        {/* Preview Area */}
        <div className="w-full bg-muted/20 border rounded-xl p-4 overflow-x-auto">
          <div 
            className="min-w-[300px] min-h-[300px] w-full h-full transition-all duration-300"
            style={{ 
              display: "grid", 
              gridTemplateColumns: `repeat(${config.columns}, 1fr)`,
              gridTemplateRows: `repeat(${config.rows}, 1fr)`,
              columnGap: `${config.columnGap}px`,
              rowGap: `${config.rowGap}px`
            }}
          >
            {Array.from({ length: totalItems }).map((_, i) => (
              <div 
                key={i} 
                className="bg-primary/10 border-2 border-primary/20 rounded-md flex items-center justify-center font-mono text-sm text-primary p-4 min-h-[60px]"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Columnas</label>
                  <span className="text-sm text-muted-foreground font-mono">{config.columns}</span>
                </div>
                <Input 
                  type="range" 
                  min={1} 
                  max={12} 
                  value={config.columns} 
                  onChange={(e) => setConfig({ ...config, columns: Number(e.target.value) })} 
                  className="cursor-pointer" 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Filas</label>
                  <span className="text-sm text-muted-foreground font-mono">{config.rows}</span>
                </div>
                <Input 
                  type="range" 
                  min={1} 
                  max={12} 
                  value={config.rows} 
                  onChange={(e) => setConfig({ ...config, rows: Number(e.target.value) })} 
                  className="cursor-pointer" 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Espaciado de Columnas (Gap X)</label>
                  <span className="text-sm text-muted-foreground font-mono">{config.columnGap}px</span>
                </div>
                <Input 
                  type="range" 
                  min={0} 
                  max={100} 
                  value={config.columnGap} 
                  onChange={(e) => setConfig({ ...config, columnGap: Number(e.target.value) })} 
                  className="cursor-pointer" 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Espaciado de Filas (Gap Y)</label>
                  <span className="text-sm text-muted-foreground font-mono">{config.rowGap}px</span>
                </div>
                <Input 
                  type="range" 
                  min={0} 
                  max={100} 
                  value={config.rowGap} 
                  onChange={(e) => setConfig({ ...config, rowGap: Number(e.target.value) })} 
                  className="cursor-pointer" 
                />
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
