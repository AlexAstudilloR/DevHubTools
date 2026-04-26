"use client";

import React, { useState, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Download, RefreshCw } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function ImageConverterClient() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [format, setFormat] = useState<"png" | "jpeg" | "webp">("png");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
    }
  };

  const convertImage = () => {
    if (!file) return;
    setLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);

        const dataUrl = canvas.toDataURL(`image/${format}`, 0.9);
        setResult(dataUrl);
        setLoading(false);
      };
    };
  };

  return (
    <ToolLayout
      title={t('tool.jpg-to-png.name')}
      description={t('tool.jpg-to-png.desc')}
      toolId="jpg-to-png"
    >
      <div className="space-y-8 max-w-2xl mx-auto">
        <Card className="border-dashed border-2 bg-muted/5">
          <CardContent className="p-12 flex flex-col items-center text-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <div 
              className="p-4 rounded-full bg-primary/10 text-primary mb-4 cursor-pointer hover:scale-110 transition-transform"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold">{t('cat.Image')}</h3>
            {file && <p className="mt-4 text-sm font-bold text-primary">{file.name}</p>}
          </CardContent>
        </Card>

        {preview && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {["png", "jpeg", "webp"].map((f) => (
                <Button 
                  key={f}
                  variant={format === f ? "default" : "outline"}
                  onClick={() => setFormat(f as "png" | "jpeg" | "webp")}
                  className="uppercase"
                >
                  {f === "jpeg" ? "jpg" : f}
                </Button>
              ))}
            </div>

            <Button className="w-full h-12 text-lg gap-2" onClick={convertImage} disabled={loading}>
              <RefreshCw className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
              {loading ? t('btn.converting') : `${t('btn.convert')} ${format.toUpperCase()}`}
            </Button>

            {result && (
              <div className="space-y-4">
                <div className="aspect-video bg-muted rounded-xl overflow-hidden border flex items-center justify-center p-4">
                  <img src={result} alt="Converted" className="max-h-full object-contain shadow-lg" />
                </div>
                <a href={result} download={`converted-image.${format}`}>
                  <Button className="w-full gap-2" variant="secondary">
                    <Download className="h-4 w-4" /> {t('label.download_result')}
                  </Button>
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
