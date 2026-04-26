import React from "react";
import { useTranslations } from "next-intl";
import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await import(`@/messages/${locale}.json`).then(m => m.default.Sidebar);
  return constructMetadata({
    title: t.about,
    description: "Learn more about DevTools Hub and our mission.",
    url: "/about",
    locale
  });
}

export default function AboutPage() {
  const t = useTranslations("Sidebar");
  const tLegal = useTranslations("Legal");

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-primary">{t("about")}</h1>
      
      <div className="prose dark:prose-invert max-w-none space-y-6 text-lg">
        <p>
          Welcome to <span className="font-bold text-primary">DevTools Hub</span>, your comprehensive destination for web development utilities.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 my-12">
          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <h2 className="text-xl font-bold mb-3 text-primary">Our Mission</h2>
            <p className="text-muted-foreground">
              To provide developers with high-quality, privacy-focused tools that run entirely in the browser. 
              No data is ever sent to our servers.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <h2 className="text-xl font-bold mb-3 text-primary">Privacy First</h2>
            <p className="text-muted-foreground">
              {tLegal("privacyContent")}
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-4">Why choose DevTools Hub?</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>Fast & Local:</strong> Tools execute in your browser using JavaScript, ensuring maximum speed.</li>
          <li><strong>Offline Ready:</strong> Many tools can work even when you are not connected to the internet.</li>
          <li><strong>Open Source Spirit:</strong> We believe in transparency and developer-centric design.</li>
          <li><strong>Responsive Design:</strong> Use our tools on your desktop, tablet, or smartphone.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-12 mb-4">Technology Stack</h2>
        <p className="text-muted-foreground">
          Built with the latest web technologies including Next.js, Tailwind CSS, and TypeScript to ensure a smooth and secure experience.
        </p>
      </div>
    </div>
  );
}
