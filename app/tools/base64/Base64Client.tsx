"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";

export default function Base64Client() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const handleProcess = (val: string, currentMode: "encode" | "decode") => {
    setInput(val);
    try {
      if (currentMode === "encode") {
        setOutput(btoa(val));
      } else {
        setOutput(atob(val));
      }
    } catch {
      setOutput("Error: Entrada no válida");
    }
  };

  const toggleMode = () => {
    const newMode = mode === "encode" ? "decode" : "encode";
    setMode(newMode);
    // Swap input and output for convenience
    setInput(output);
    handleProcess(output, newMode);
  };

  return (
    <ToolLayout
      title="Base64 Encoder/Decoder"
      description="Codifica y decodifica texto a formato Base64 de forma segura."
      toolId="base64"
      onCopy={() => navigator.clipboard.writeText(output)}
    >
      <div className="space-y-6">
        <div className="flex justify-center">
          <Button variant="outline" size="lg" onClick={toggleMode} className="gap-2">
            <ArrowLeftRight className="h-4 w-4" />
            Modo: {mode === "encode" ? "Codificar" : "Decodificar"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Entrada</label>
            <Textarea
              placeholder="Escribe o pega aquí..."
              className="min-h-[300px] font-mono"
              value={input}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleProcess(e.target.value, mode)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Salida</label>
            <Textarea
              placeholder="Resultado..."
              className="min-h-[300px] font-mono bg-muted"
              value={output}
              readOnly
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
