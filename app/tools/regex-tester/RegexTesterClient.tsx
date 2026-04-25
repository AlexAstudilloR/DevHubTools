"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "../../../components/ui/badge";
import { useTranslation } from "@/hooks/useTranslation";

export default function RegexTesterClient() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!pattern) {
      setMatches([]);
      setError(null);
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const m = Array.from(text.matchAll(regex));
      setMatches(m);
      setError(null);
    } catch (e) {
      setError(t('status.invalid_regex'));
      setMatches([]);
    }
  }, [pattern, flags, text, t]);

  return (
    <ToolLayout
      title={t('tool.regex-tester.name')}
      description={t('tool.regex-tester.desc')}
      toolId="regex-tester"
    >
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">{t('label.regex_pattern')}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">/</span>
              <Input
                placeholder="([a-z]+)"
                className="pl-6 pr-12 font-mono"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">/</span>
            </div>
          </div>
          <div className="w-24 space-y-2">
            <label className="text-sm font-medium">{t('label.regex_flags')}</label>
            <Input
              placeholder="g"
              className="font-mono text-center"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('label.test_text')}</label>
          <Textarea
            placeholder={t('label.placeholder_text')}
            className="min-h-[200px]"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium uppercase tracking-widest text-muted-foreground">{t('label.results')}</label>
            <Badge variant="outline">{matches.length} {t('label.matches')}</Badge>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg min-h-[100px] font-mono text-sm break-all">
            {text.split(new RegExp(`(${pattern})`, flags)).map((part, i) => {
              const isMatch = pattern && new RegExp(pattern, flags).test(part);
              return isMatch ? (
                <mark key={i} className="bg-primary/30 text-primary-foreground rounded px-0.5">{part}</mark>
              ) : (
                <span key={i}>{part}</span>
              );
            })}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
