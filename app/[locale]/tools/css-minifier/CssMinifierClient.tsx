"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export function CssMinifierClient() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [savings, setSavings] = useState<{ original: number; minified: number; percent: number } | null>(null);
  
  const [history, setHistory, isHydrated] = useLocalStorage<string[]>("history-css-min", []);

  const minifyCSS = () => {
    if (!input.trim()) return;

    let minified = input;
    // Remove comments
    minified = minified.replace(/\/\*[\s\S]*?\*\//g, "");
    // Remove newlines and tabs
    minified = minified.replace(/\n|\r|\t/g, "");
    // Remove extra spaces
    minified = minified.replace(/\s+/g, " ");
    // Remove spaces around special characters
    minified = minified.replace(/\s*([{}:;,])\s*/g, "$1");
    // Remove last semicolon in block
    minified = minified.replace(/;}/g, "}");

    const originalSize = new Blob([input]).size;
    const minifiedSize = new Blob([minified]).size;
    const percent = originalSize > 0 ? ((originalSize - minifiedSize) / originalSize) * 100 : 0;

    setOutput(minified);
    setSavings({ original: originalSize, minified: minifiedSize, percent });

    setHistory(prev => {
      if (prev.length > 0 && prev[0] === minified) return prev;
      return [minified, ...prev].slice(0, 5);
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  const handleExport = () => {
    const blob = new Blob([output], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'style.min.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <ToolLayout<string>
      title="CSS Minifier"
      description="Minimiza tu código CSS eliminando espacios, comentarios y saltos de línea para mejorar el rendimiento."
      toolId="css-minifier"
      history={isHydrated ? history : []}
      onCopy={output ? handleCopy : undefined}
      onExport={output ? handleExport : undefined}
      onRestoreHistory={(item) => setOutput(item)}
      renderHistoryItem={(item) => (
        <div className="font-mono text-xs truncate max-w-[200px] text-muted-foreground">
          {item.slice(0, 40)}{item.length > 40 ? "..." : ""}
        </div>
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">CSS Original</label>
            {savings && <span className="text-xs text-muted-foreground">{formatBytes(savings.original)}</span>}
          </div>
          <Card>
            <CardContent className="p-0 border-none">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="/* Pega tu CSS aquí */&#10;.clase {&#10;  color: red;&#10;}"
                className="w-full h-[500px] p-4 font-mono text-sm bg-background border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </CardContent>
          </Card>
          <Button onClick={minifyCSS} className="w-full">Minificar CSS</Button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">CSS Minificado</label>
            {savings && (
              <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                {formatBytes(savings.minified)} (-{savings.percent.toFixed(1)}%)
              </span>
            )}
          </div>
          <Card>
            <CardContent className="p-0 border-none">
              <textarea 
                value={output}
                readOnly
                placeholder="El resultado aparecerá aquí..."
                className="w-full h-[500px] p-4 font-mono text-sm bg-muted/30 border rounded-xl resize-none focus:outline-none"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
