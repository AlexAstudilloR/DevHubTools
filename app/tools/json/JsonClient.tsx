"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/components/ui/use-toast";

export function JsonClient() {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  
  const [history, setHistory, isHydrated] = useLocalStorage<string[]>("history-json", []);
  const { toast } = useToast();

  const handleFormat = (spaces: number = 2) => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, spaces);
      setInput(formatted);
      setError(null);
      saveToHistory(formatted);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error";
      setError(msg);
      toast({ title: "JSON Inválido", description: msg, variant: "destructive" });
    }
  };

  const handleMinify = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setInput(minified);
      setError(null);
      saveToHistory(minified);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error";
      setError(msg);
      toast({ title: "JSON Inválido", description: msg, variant: "destructive" });
    }
  };

  const saveToHistory = (val: string) => {
    setHistory(prev => {
      if (prev.length > 0 && prev[0] === val) return prev;
      return [val, ...prev].slice(0, 5);
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
  };

  return (
    <ToolLayout<string>
      title="JSON Formatter & Validator"
      description="Valida, embellece y minifica tus estructuras JSON."
      toolId="json-formatter"
      history={isHydrated ? history : []}
      onCopy={handleCopy}
      onRestoreHistory={(item) => setInput(item)}
      renderHistoryItem={(item) => (
        <div className="font-mono text-xs truncate max-w-[200px] text-muted-foreground">
          {item.slice(0, 40)}{item.length > 40 ? "..." : ""}
        </div>
      )}
    >
      <div className="space-y-4">
        <Card>
          <CardContent className="p-0 border-none">
            <textarea 
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (error) setError(null);
              }}
              placeholder='{"key": "value"}'
              className="w-full h-80 p-4 font-mono text-sm bg-background border rounded-xl resize-y focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </CardContent>
        </Card>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-md text-sm font-mono">
            Error: {error}
          </div>
        )}

        <div className="flex flex-wrap gap-4">
          <Button onClick={() => handleFormat(2)}>Embellecer (2 espacios)</Button>
          <Button onClick={() => handleFormat(4)} variant="outline">Embellecer (4 espacios)</Button>
          <Button onClick={handleMinify} variant="secondary">Minificar</Button>
          <Button onClick={() => setInput("")} variant="ghost" className="ml-auto text-muted-foreground hover:text-foreground">
            Limpiar
          </Button>
        </div>
      </div>
    </ToolLayout>
  );
}
