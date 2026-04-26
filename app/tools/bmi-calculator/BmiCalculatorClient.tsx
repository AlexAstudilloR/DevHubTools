"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";

export default function BmiCalculatorClient() {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [result, setResult] = useState<{ bmi: number; status: string; color: string } | null>(null);
  const { t } = useTranslation();

  const calculateBmi = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // cm to m
    if (w > 0 && h > 0) {
      const bmi = parseFloat((w / (h * h)).toFixed(1));
      let statusKey = "status.normal";
      let color = "text-green-500";

      if (bmi < 18.5) { statusKey = "status.underweight"; color = "text-blue-500"; }
      else if (bmi >= 25 && bmi < 29.9) { statusKey = "status.overweight"; color = "text-yellow-500"; }
      else if (bmi >= 30) { statusKey = "status.obesity"; color = "text-red-500"; }

      setResult({ bmi, status: t(statusKey), color });
    }
  };

  return (
    <ToolLayout
      title={t('tool.bmi-calculator.name')}
      description={t('tool.bmi-calculator.desc')}
      toolId="bmi-calculator"
    >
      <div className="max-w-md mx-auto space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('label.weight')}</label>
            <Input
              type="number"
              placeholder="Ej: 70"
              value={weight}
              onChange={(e) => {setWeight(e.target.value); if(height) calculateBmi();}}
              onKeyUp={calculateBmi}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('label.height')}</label>
            <Input
              type="number"
              placeholder="Ej: 175"
              value={height}
              onChange={(e) => {setHeight(e.target.value); if(weight) calculateBmi();}}
              onKeyUp={calculateBmi}
            />
          </div>
        </div>

        {result && (
          <Card className="bg-primary/5 border-primary/10 overflow-hidden">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
              <div className="p-4 rounded-full bg-background border shadow-inner">
                <span className={`text-5xl font-black ${result.color}`}>{result.bmi}</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">BMI:</p>
                <p className={`text-2xl font-bold ${result.color}`}>{result.status}</p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground bg-muted/30 p-4 rounded-lg">
          <p>• Bajo peso: &lt; 18.5</p>
          <p>• Normal: 18.5 - 24.9</p>
          <p>• Sobrepeso: 25 - 29.9</p>
          <p>• Obesidad: &gt; 30</p>
        </div>
      </div>
    </ToolLayout>
  );
}
