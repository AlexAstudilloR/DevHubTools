import { generateMetadata } from "@/lib/seo";
import ImageConverterClient from "./ImageConverterClient";

export const metadata = generateMetadata({
  title: "Convertidor JPG a PNG y WEBP",
  description: "Convierte tus imágenes de JPG a PNG o WEBP de forma gratuita y sin subir archivos a internet.",
  path: "/tools/jpg-to-png"
});

export default function ImageConverterPage() {
  return <ImageConverterClient />;
}
