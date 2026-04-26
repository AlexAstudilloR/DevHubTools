"use client";

import { useEffect, useState } from 'react';

import { useTranslation } from '@/hooks/useTranslation';


export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = window?.localStorage?.getItem('devhub-cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    window?.localStorage?.setItem('devhub-cookie-consent', 'accepted');
    setVisible(false);
  };
  const reject = () => {
    window?.localStorage?.setItem('devhub-cookie-consent', 'rejected');
    setVisible(false);
  };

  const { t } = useTranslation();

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-muted/90 backdrop-blur-md rounded-xl shadow-md p-4 flex items-center space-x-4 max-w-md w-full z-50">
      <p className="text-sm text-muted-foreground flex-1">
        {t('cookie.message')}
      </p>
      <button onClick={accept} className="px-3 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition">
        {t('cookie.accept')}
      </button>
      <button onClick={reject} className="px-3 py-1 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition">
        {t('cookie.reject')}
      </button>
    </div>
  );
}
