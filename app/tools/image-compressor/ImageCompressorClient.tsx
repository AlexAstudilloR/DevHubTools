"use client";

import React, { useState, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Download, ImageIcon } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function ImageCompressorClient() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [compressed, setCompressed] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<{ original: number; result: number } | null>(null);
  const { t } = useTranslation();
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setCompressed(null);
      setStats(null);
    }
  };

  const compressImage = () => {
    if (!file) return;
    setLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        setCompressed(dataUrl);
        
        // Estimate size
        const head = "data:image/jpeg;base64,";
        const resultSize = Math.round((dataUrl.length - head.length) * 3 / 4);
        
        setStats({ original: file.size, result: resultSize });
        setLoading(false);
      };
    };
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <ToolLayout
      title={t('tool.image-compressor.name')}
      description={t('tool.image-compressor.desc')}
      toolId="image-compressor"
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
            {file && <p className="mt-4 text-sm font-bold text-primary">{file.name} ({formatSize(file.size)})</p>}
          </CardContent>
        </Card>

        {preview && (
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium flex justify-between">
                <span>{t('label.select_format')}: {Math.round(quality * 100)}%</span>
              </label>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <Button className="w-full h-12 text-lg" onClick={compressImage} disabled={loading}>
              {loading ? t('btn.compressing') : t('btn.compress')}
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="space-y-2 text-center">
                <p className="text-xs font-bold uppercase text-muted-foreground">{t('label.original')}</p>
                <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center border">
                  <img src={preview} alt="Original" className="max-h-full object-contain" />
                </div>
              </div>
              <div className="space-y-2 text-center">
                <p className="text-xs font-bold uppercase text-muted-foreground">{t('label.compressed')}</p>
                <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center border">
                  {compressed ? (
                    <img src={compressed} alt="Compressed" className="max-h-full object-contain" />
                  ) : (
                    <div className="text-muted-foreground flex flex-col items-center">
                      <ImageIcon className="h-12 w-12 opacity-20" />
                      <p className="text-xs mt-2 italic">{t('label.placeholder_text')}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {stats && (
              <Card className="bg-green-500/10 border-green-500/20">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold">{t('label.saving')}</p>
                    <p className="text-2xl font-black text-green-600">
                      -{Math.round((1 - stats.result / stats.original) * 100)}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{t('label.new_size')}: {formatSize(stats.result)}</p>
                    <a href={compressed!} download={`compressed-${file?.name}`}>
                      <Button size="sm" className="mt-2 gap-2">
                        <Download className="h-4 w-4" /> {t('common.export')}
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
