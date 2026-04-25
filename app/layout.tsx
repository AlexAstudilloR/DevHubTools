import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/ui/use-toast";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { CookieBanner } from "@/components/CookieBanner";
import { Analytics } from "@/components/Analytics";

import { TranslationProvider } from "@/hooks/useTranslation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevTools Hub",
  description: "Herramientas cliente para desarrolladores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Analytics />
        <TranslationProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider>
              <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Header />
                  <main className="flex-1 overflow-y-auto bg-muted/20">
                    {children}
                  </main>
                </div>
              </div>
              <CookieBanner />
            </ToastProvider>
          </ThemeProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
