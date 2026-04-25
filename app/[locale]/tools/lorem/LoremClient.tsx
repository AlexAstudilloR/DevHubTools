"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface LoremConfig {
  count: number;
  type: "paragraphs" | "words";
  html: boolean;
}

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", 
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", 
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", 
  "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis", 
  "aute", "irure", "in", "reprehenderit", "voluptate", "velit", "esse", "cillum", "eu", 
  "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", 
  "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
];

function generateText(count: number, type: "paragraphs" | "words", html: boolean): string {
  if (type === "words") {
    const result = [];
    for (let i = 0; i < count; i++) {
      const word = LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
      result.push(i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word);
    }
    const text = result.join(" ") + ".";
    return html ? `<p>${text}</p>` : text;
  } else {
    const paragraphs = [];
    for (let p = 0; p < count; p++) {
      const wordCount = Math.floor(Math.random() * 20) + 20; // 20 to 40 words per paragraph
      const paragraph = [];
      for (let i = 0; i < wordCount; i++) {
        let word = LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
        if (i === 0) word = word.charAt(0).toUpperCase() + word.slice(1);
        paragraph.push(word);
      }
      paragraphs.push(paragraph.join(" ") + ".");
    }
    if (html) {
      return paragraphs.map(p => `<p>${p}</p>`).join("\n\n");
    }
    return paragraphs.join("\n\n");
  }
}

export function LoremClient() {
  const [config, setConfig] = useState<LoremConfig>({
    count: 3,
    type: "paragraphs",
    html: false,
  });
  const [output, setOutput] = useState<string>("");
  
  const [history, setHistory, isHydrated] = useLocalStorage<LoremConfig[]>("history-lorem", []);

  const generate = (saveToHistory = true) => {
    const text = generateText(config.count, config.type, config.html);
    setOutput(text);
    
    if (saveToHistory) {
      setHistory(prev => {
        const isDuplicate = prev.length > 0 && JSON.stringify(prev[0]) === JSON.stringify(config);
        if (isDuplicate) return prev;
        return [config, ...prev].slice(0, 5);
      });
    }
  };

  useEffect(() => {
    generate(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  const handleExport = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = config.html ? 'lorem.html' : 'lorem.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout<LoremConfig>
      title="Generador de Lorem Ipsum"
      description="Crea texto de relleno rápidamente en formato texto plano o HTML."
      toolId="lorem"
      history={isHydrated ? history : []}
      onCopy={handleCopy}
      onExport={handleExport}
      onRestoreHistory={(item) => {
        setConfig(item);
        // Generamos instantáneamente al restaurar
        setTimeout(() => generate(false), 0);
      }}
      renderHistoryItem={(item) => (
        <div className="flex flex-col gap-1">
          <span className="font-medium text-sm">
            {item.count} {item.type === "paragraphs" ? "Párrafos" : "Palabras"}
          </span>
          <span className="text-[10px] text-muted-foreground">
            Formato: {item.html ? "HTML" : "Texto plano"}
          </span>
        </div>
      )}
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium">Cantidad</label>
                <Input 
                  type="number" 
                  min={1} 
                  max={100} 
                  value={config.count} 
                  onChange={(e) => setConfig({ ...config, count: Math.max(1, parseInt(e.target.value) || 1) })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo</label>
                <div className="flex gap-2">
                  <Button 
                    variant={config.type === "paragraphs" ? "default" : "outline"}
                    onClick={() => setConfig({ ...config, type: "paragraphs" })}
                    className="flex-1"
                  >
                    Párrafos
                  </Button>
                  <Button 
                    variant={config.type === "words" ? "default" : "outline"}
                    onClick={() => setConfig({ ...config, type: "words" })}
                    className="flex-1"
                  >
                    Palabras
                  </Button>
                </div>
              </div>

              <div className="space-y-2 flex flex-col h-full justify-end">
                <div className="flex items-center space-x-2 pb-2">
                  <input 
                    type="checkbox" 
                    id="html" 
                    checked={config.html}
                    onChange={(e) => setConfig({ ...config, html: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="html" className="text-sm font-medium cursor-pointer">Usar etiquetas HTML</label>
                </div>
              </div>
            </div>
            
            <Button onClick={() => generate()} className="w-full mt-6">
              Generar Texto
            </Button>
          </CardContent>
        </Card>

        {output && (
          <Card className="bg-muted/30">
            <CardContent className="p-0">
              <textarea 
                className="w-full h-80 p-6 bg-transparent border-none resize-y focus:outline-none"
                readOnly
                value={output}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
