import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/ui/use-toast";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { FavoritesProvider } from "@/context/FavoritesContext";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { AdStickyMobileFooter, AdBanner } from "@/components/ads/AdPlaceholders";
import { constructMetadata } from "@/lib/seo";
import { GA_TRACKING_ID } from "@/lib/analytics";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Index' });
  return constructMetadata({
    title: "DevTools Hub",
    description: t('description'),
    url: "/",
    locale
  });
}

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider>
              <FavoritesProvider>
                <div className="flex h-screen overflow-hidden">
                  <Sidebar />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <Header />
                    <AdBanner className="hidden md:flex" />
                    <main className="flex-1 overflow-y-auto bg-muted/20 relative flex flex-col pb-12 md:pb-0">
                      <div className="flex-1">
                        {children}
                      </div>
                      <Footer />
                    </main>
                  </div>
                </div>
                <CookieBanner />
                <AdStickyMobileFooter />
              </FavoritesProvider>
            </ToastProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
