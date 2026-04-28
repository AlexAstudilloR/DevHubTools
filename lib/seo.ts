import { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  locale?: string;
}

const siteName = "FastDevTools";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fast-dev-tools.vercel.app";

export function constructMetadata({
  title,
  description,
  url,
  image = "/og-image.jpg",
  locale = "es"
}: SEOProps): Metadata {
  return {
    title: {
      default: `${title} | ${siteName}`,
      template: `%s | ${siteName}`,
    },
    description,
    authors: [{ name: "FastDevTools" }],
    creator: "FastDevTools",
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `${siteUrl}${url}`,
      languages: {
        'es': `${siteUrl}/es${url}`,
        'en': `${siteUrl}/en${url}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${url}`,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@fastdevtools",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
