"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function UrlEncoderClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const { t } = useTranslation();

  const handleProcess = (val: string, currentMode: "encode" | "decode") => {
    setInput(val);
    try {
      if (currentMode === "encode") {
        setOutput(encodeURIComponent(val));
      } else {
        setOutput(decodeURIComponent(val));
      }
    } catch (e) {
      setOutput("Error: Entrada no válida");
    }
  };

  const toggleMode = () => {
    const newMode = mode === "encode" ? "decode" : "encode";
    setMode(newMode);
    setInput(output);
    handleProcess(output, newMode);
  };

  return (
    <ToolLayout
      title={t('tool.url-encoder.name')}
      description={t('tool.url-encoder.desc')}
      toolId="url-encoder"
      onCopy={() => navigator.clipboard.writeText(output)}
    >
      <div className="space-y-6">
        <div className="flex justify-center">
          <Button variant="outline" size="lg" onClick={toggleMode} className="gap-2">
            <ArrowLeftRight className="h-4 w-4" />
            {mode === "encode" ? t('btn.mode_encode') : t('btn.mode_decode')}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('label.input')}</label>
            <Textarea
              placeholder={t('label.placeholder_text')}
              className="min-h-[300px] font-mono"
              value={input}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleProcess(e.target.value, mode)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('label.output')}</label>
            <Textarea
              placeholder={t('label.placeholder_text')}
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
