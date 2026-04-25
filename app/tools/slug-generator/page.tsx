import { generateMetadata } from "@/lib/seo";
import SlugGeneratorClient from "./SlugGeneratorClient";

export const metadata = generateMetadata({
  title: "Generador de Slugs URL",
  description: "Crea slugs optimizados para SEO a partir de cualquier texto o título.",
  path: "/tools/slug-generator"
});

export default function SlugGeneratorPage() {
  return <SlugGeneratorClient />;
}
