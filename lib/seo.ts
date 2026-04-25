import { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}

export function generateMetadata({ title, description, path = "", ogImage }: SEOProps): Metadata {
  const url = `https://devhubtools.com${path}`;
  const fullTitle = `${title} | DevHub Tools`;

  return {
    title: fullTitle,
    description: description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description: description,
      url: url,
      siteName: "DevHub Tools",
      locale: "es_ES",
      type: "website",
      images: ogImage ? [{ url: ogImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description,
      images: ogImage ? [ogImage] : [],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
