"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

export function CookieBanner() {
  const t = useTranslations("Cookies");
  const tLegal = useTranslations("Legal");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "all");
    setShow(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "essential");
    setShow(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 md:max-w-2xl md:left-1/2 md:-translate-x-1/2 md:bottom-6 animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="bg-card border border-border shadow-2xl rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-full shrink-0">
            <Cookie className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-foreground leading-relaxed">
              {t("bannerText")}{" "}
              <Link href="/cookies-policy" className="text-primary hover:underline font-medium">
                {tLegal("cookies")}
              </Link>
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 mt-2">
          <Button variant="ghost" size="sm" onClick={handleReject} className="w-full sm:w-auto text-muted-foreground hover:text-foreground">
            {t("reject")}
          </Button>
          <Button variant="outline" size="sm" onClick={handleReject} className="w-full sm:w-auto">
            {t("configure")}
          </Button>
          <Button size="sm" onClick={handleAccept} className="w-full sm:w-auto">
            {t("accept")}
          </Button>
        </div>
      </div>
    </div>
  );
}
