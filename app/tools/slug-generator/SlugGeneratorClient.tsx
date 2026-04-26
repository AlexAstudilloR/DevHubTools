"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/useTranslation";

export default function SlugGeneratorClient() {
  const [input, setInput] = useState("");
  const [slug, setSlug] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const generatedSlug = input
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove non-word chars
      .replace(/[\s_-]+/g, "-") // Replace spaces/underscores with -
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing -
    setSlug(generatedSlug);
  }, [input]);

  return (
    <ToolLayout
      title={t('tool.slug-generator.name')}
      description={t('tool.slug-generator.desc')}
      toolId="slug-generator"
      onCopy={() => navigator.clipboard.writeText(slug)}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('label.input_text')}</label>
          <Textarea
            placeholder={t('label.placeholder_text')}
            className="min-h-[150px]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('label.generated_slug')}</label>
          <Input
            value={slug}
            readOnly
            className="font-mono bg-muted text-lg h-12"
          />
        </div>
      </div>
    </ToolLayout>
  );
}
