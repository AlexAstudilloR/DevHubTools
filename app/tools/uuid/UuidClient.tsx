"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/components/ui/use-toast";

interface UuidHistoryItem {
  uuids: string[];
  version: number;
  count: number;
}

const NAMESPACE_URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";

function isValidUUID(uuid: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid);
}

function hexToBytes(hex: string) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

async function generateUUIDv5(namespace: string, name: string): Promise<string> {
  const nsHex = namespace.replace(/-/g, "");
  const nsBytes = hexToBytes(nsHex);
  const nameBytes = new TextEncoder().encode(name);
  
  const data = new Uint8Array(nsBytes.length + nameBytes.length);
  data.set(nsBytes);
  data.set(nameBytes, nsBytes.length);
  
  const hashBuffer = await window.crypto.subtle.digest("SHA-1", data);
  const hashArray = new Uint8Array(hashBuffer);
  
  hashArray[6] = (hashArray[6] & 0x0f) | 0x50; // version 5
  hashArray[8] = (hashArray[8] & 0x3f) | 0x80; // variant
  
  const hex = Array.from(hashArray).map(b => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

export function UuidClient() {
  const [version, setVersion] = useState<4 | 5>(4);
  const [count, setCount] = useState<number>(1);
  const [namespace, setNamespace] = useState<string>(NAMESPACE_URL);
  const [nameInput, setNameInput] = useState<string>("devhub.tools");
  const [results, setResults] = useState<string[]>([]);
  
  const { toast } = useToast();
  const [history, setHistory, isHydrated] = useLocalStorage<UuidHistoryItem[]>("history-uuid", []);

  const generate = async (saveToHistory = true) => {
    const generated: string[] = [];
    
    if (version === 4) {
      for (let i = 0; i < count; i++) {
        generated.push(crypto.randomUUID());
      }
    } else {
      if (!isValidUUID(namespace)) {
        toast({ title: "Error", description: "El Namespace no es un UUID válido.", variant: "destructive" });
        return;
      }
      if (!nameInput) {
        toast({ title: "Error", description: "El Nombre no puede estar vacío.", variant: "destructive" });
        return;
      }
      
      // Si piden múltiples v5 con el mismo namespace y nombre, serán idénticos.
      // Para bulk v5, iteramos el nombre añadiendo un índice si es más de 1 para que sean distintos, o los dejamos igual.
      // Generalmente v5 es determinístico, así que generaremos 1 y lo clonaremos, o si prefieren distintos, agregamos índice.
      // Lo dejaremos determinístico: todos serán iguales si es bulk, pero alertaremos.
      const baseUuid = await generateUUIDv5(namespace, nameInput);
      for (let i = 0; i < count; i++) {
        generated.push(count > 1 ? await generateUUIDv5(namespace, `${nameInput}-${i}`) : baseUuid);
      }
    }

    setResults(generated);

    if (saveToHistory) {
      setHistory(prev => {
        const item: UuidHistoryItem = { uuids: generated, version, count };
        return [item, ...prev].slice(0, 5);
      });
    }
  };

  useEffect(() => {
    generate(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = () => {
    if (results.length > 0) {
      navigator.clipboard.writeText(results.join("\n"));
    }
  };

  const handleExport = () => {
    if (results.length > 0) {
      const blob = new Blob([results.join("\n")], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'uuids.txt';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <ToolLayout<UuidHistoryItem>
      title="Generador UUID/GUID"
      description="Crea identificadores únicos v4 (aleatorios) o v5 (basados en nombre)."
      toolId="uuid"
      history={isHydrated ? history : []}
      onCopy={handleCopy}
      onExport={handleExport}
      onRestoreHistory={(item) => {
        setResults(item.uuids);
        setVersion(item.version as 4 | 5);
        setCount(item.count);
      }}
      renderHistoryItem={(item) => (
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs truncate">
            {item.uuids[0]} {item.count > 1 ? `(+${item.count - 1})` : ''}
          </span>
          <span className="text-[10px] text-muted-foreground">v{item.version} - {item.count} items</span>
        </div>
      )}
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Versión</label>
                <div className="flex gap-2">
                  <Button 
                    variant={version === 4 ? "default" : "outline"}
                    onClick={() => setVersion(4)}
                    className="flex-1"
                  >
                    v4 (Random)
                  </Button>
                  <Button 
                    variant={version === 5 ? "default" : "outline"}
                    onClick={() => setVersion(5)}
                    className="flex-1"
                  >
                    v5 (SHA-1)
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Cantidad a generar (1-100)</label>
                <Input 
                  type="number" 
                  min={1} 
                  max={100} 
                  value={count} 
                  onChange={(e) => {
                    let val = parseInt(e.target.value) || 1;
                    if (val > 100) val = 100;
                    if (val < 1) val = 1;
                    setCount(val);
                  }}
                />
              </div>
            </div>

            {version === 5 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-muted/50 rounded-lg border">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Namespace (UUID)</label>
                  <Input 
                    value={namespace}
                    onChange={(e) => setNamespace(e.target.value)}
                    placeholder="6ba7b811-9dad-11d1-80b4-00c04fd430c8"
                    className="font-mono text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nombre</label>
                  <Input 
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="devhub.tools"
                  />
                </div>
              </div>
            )}
            
            <Button onClick={() => generate()} className="w-full">
              Generar UUID(s)
            </Button>
          </CardContent>
        </Card>

        {results.length > 0 && (
          <Card>
            <CardContent className="p-0">
              <textarea 
                className="w-full h-64 p-4 font-mono text-sm bg-transparent border-none resize-none focus:outline-none"
                readOnly
                value={results.join("\n")}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
