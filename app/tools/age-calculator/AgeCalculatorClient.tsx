"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";

export default function AgeCalculatorClient() {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);
  const { t } = useTranslation();

  const calculateAge = (date: string) => {
    setBirthDate(date);
    if (!date) return;

    const birth = new Date(date);
    const now = new Date();

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }
    if (days < 0) {
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      days += prevMonth;
      months--;
    }

    setAge({ years, months, days });
  };

  return (
    <ToolLayout
      title={t('tool.age-calculator.name')}
      description={t('tool.age-calculator.desc')}
      toolId="age-calculator"
    >
      <div className="max-w-md mx-auto space-y-8">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('label.birth_date')}</label>
          <Input
            type="date"
            value={birthDate}
            onChange={(e) => calculateAge(e.target.value)}
            className="h-12"
          />
        </div>

        {age && (
          <div className="grid grid-cols-3 gap-4">
            <ResultBox label={t('label.years')} value={age.years} />
            <ResultBox label={t('label.months')} value={age.months} />
            <ResultBox label={t('label.days')} value={age.days} />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}

function ResultBox({ label, value }: { label: string; value: number }) {
  return (
    <Card className="bg-primary/5 border-primary/10">
      <CardContent className="p-6 flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-black text-primary">{value}</span>
        <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{label}</span>
      </CardContent>
    </Card>
  );
}
