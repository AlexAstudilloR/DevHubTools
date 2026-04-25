"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface JwtHistoryItem {
  secret: string;
  type: string;
  length: number;
}

export function JwtClient() {
  const [length, setLength] = useState<number>(64);
  const [type, setType] = useState<"hex" | "base64" | "alphanumeric">("base64");
  const [secret, setSecret] = useState("");
  const [history, setHistory, isHydrated] = useLocalStorage<JwtHistoryItem[]>("history-jwt", []);

  const generateSecret = (saveToHistory = true) => {
    let result = "";
    let characters = "";

    if (type === "hex") {
      characters = "0123456789abcdef";
    } else if (type === "alphanumeric") {
      characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    } else if (type === "base64") {
      characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    }

    const charactersLength = characters.length;
    // Use crypto if available for better randomness
    if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
      const randomValues = new Uint32Array(length);
      window.crypto.getRandomValues(randomValues);
      for (let i = 0; i < length; i++) {
        result += characters.charAt(randomValues[i] % charactersLength);
      }
    } else {
      // Fallback
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
    }

    // Si es base64, añadir padding si es necesario
    if (type === "base64") {
      while (result.length % 4 !== 0) {
        result += "=";
      }
    }

    setSecret(result);

    if (saveToHistory) {
      setHistory(prev => {
        const item: JwtHistoryItem = { secret: result, type, length };
        const filtered = prev.filter(p => p.secret !== result);
        return [item, ...filtered].slice(0, 5);
      });
    }
  };

  useEffect(() => {
    generateSecret(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = () => {
    if (secret) {
      navigator.clipboard.writeText(secret);
    }
  };

  return (
    <ToolLayout<JwtHistoryItem>
      title="Generador JWT Secret"
      description="Crea claves secretas fuertes para firmar tus JSON Web Tokens."
      toolId="jwt"
      history={isHydrated ? history : []}
      onCopy={handleCopy}
      onRestoreHistory={(item) => {
        setSecret(item.secret);
        setLength(item.length);
        setType(item.type as "base64" | "hex" | "alphanumeric");
      }}
      renderHistoryItem={(item) => (
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs truncate max-w-[200px]" title={item.secret}>
            {item.secret}
          </span>
          <span className="text-[10px] text-muted-foreground uppercase">{item.type} - {item.length} chars</span>
        </div>
      )}
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Longitud ({length})</label>
                <Input 
                  type="range" 
                  min={16} 
                  max={128} 
                  step={8}
                  value={length} 
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Formato</label>
                <div className="flex gap-2">
                  {(["base64", "hex", "alphanumeric"] as const).map(t => (
                    <Button 
                      key={t}
                      variant={type === t ? "default" : "outline"}
                      onClick={() => setType(t)}
                      className="flex-1"
                      size="sm"
                    >
                      {t.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            <Button onClick={() => generateSecret()} className="w-full">
              Generar Nuevo Secret
            </Button>
          </CardContent>
        </Card>

        {secret && (
          <Card className="bg-muted/30 border-primary/20">
            <CardContent className="p-6 relative">
              <div className="text-sm font-medium text-muted-foreground mb-2">Secret Generado:</div>
              <p className="font-mono text-lg break-all">{secret}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
