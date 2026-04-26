import { generateMetadata } from "@/lib/seo";
import ImageCompressorClient from "./ImageCompressorClient";

export const metadata = generateMetadata({
  title: "Compresor de Imágenes Online",
  description: "Reduce el peso de tus fotos e imágenes sin pérdida de calidad visual. Totalmente gratis y privado.",
  path: "/tools/image-compressor"
});

export default function ImageCompressorPage() {
  return <ImageCompressorClient />;
}
