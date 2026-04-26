"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Info, BookOpen } from "lucide-react";

interface ToolDocumentationProps {
  toolId: string;
}

export function ToolDocumentation({ toolId }: ToolDocumentationProps) {
  const t = useTranslations("Tools");
  const tInfo = useTranslations("ToolInfo");

  // Check if translation exists for these fields
  const whatIsIt = t(`${toolId}.whatIsIt`);
  const howToUse = t(`${toolId}.howToUse`);

  // If the translation key is returned (meaning it doesn't exist), don't show the section
  const hasWhatIsIt = whatIsIt !== `${toolId}.whatIsIt`;
  const hasHowToUse = howToUse !== `${toolId}.howToUse`;

  if (!hasWhatIsIt && !hasHowToUse) return null;

  return (
    <div className="mt-12 space-y-8 border-t pt-12 pb-12">
      <div className="flex flex-col gap-2 mb-4">
        <h2 className="text-3xl font-bold tracking-tight">{tInfo("description")}</h2>
        <p className="text-muted-foreground">{t(`${toolId}.description`)}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {hasWhatIsIt && (
          <Card className="bg-card/50">
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <Info className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">{tInfo("whatIsIt")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {whatIsIt}
              </p>
            </CardContent>
          </Card>
        )}

        {hasHowToUse && (
          <Card className="bg-card/50">
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">{tInfo("howToUse")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {howToUse}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="bg-primary/5 rounded-xl p-8 border border-primary/10 mt-8">
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-2 rounded-lg">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold">Pro Tip</h3>
            <p className="text-muted-foreground text-sm">
              All our tools process data locally in your browser. This means your data is never sent to any server, 
              making it secure and fast. You can even use this tool offline!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
