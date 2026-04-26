"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

import { useTranslation } from "@/hooks/useTranslation";

export default function WordCounterClient() {
  const [text, setText] = useState("");
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
  });

  useEffect(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = text.split(/\n+/).filter(Boolean).length;

    setStats({ words, characters, charactersNoSpaces, sentences, paragraphs });
  }, [text]);

  return (
    <ToolLayout
      title={t('tool.word-counter.name')}
      description={t('tool.word-counter.desc')}
      toolId="word-counter"
      onCopy={() => navigator.clipboard.writeText(text)}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatCard label={t('label.words')} value={stats.words} />
          <StatCard label={t('label.characters')} value={stats.characters} />
          <StatCard label={t('label.chars_no_spaces')} value={stats.charactersNoSpaces} />
          <StatCard label={t('label.sentences')} value={stats.sentences} />
          <StatCard label={t('label.paragraphs')} value={stats.paragraphs} />
        </div>

        <Textarea
          placeholder={t('label.placeholder_text')}
          className="min-h-[400px] text-lg p-6"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
        />
      </div>
    </ToolLayout>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card className="bg-primary/5 border-primary/10">
      <CardContent className="p-4 flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold text-primary">{value}</span>
        <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{label}</span>
      </CardContent>
    </Card>
  );
}
