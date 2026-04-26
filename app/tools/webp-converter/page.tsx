import { generateMetadata } from "@/lib/seo";
import ImageConverterClient from "../jpg-to-png/ImageConverterClient";

export const metadata = generateMetadata({
  title: "Convertidor WEBP Online",
  description: "Convierte tus imágenes a formato WEBP de forma rápida para mejorar el SEO de tu web.",
  path: "/tools/webp-converter"
});

export default function WebpConverterPage() {
  return <ImageConverterClient />;
}
