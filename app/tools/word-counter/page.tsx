import { generateMetadata } from "@/lib/seo";
import WordCounterClient from "./WordCounterClient";

export const metadata = generateMetadata({
  title: "Contador de Palabras y Caracteres",
  description: "Cuenta palabras, caracteres, oraciones y párrafos en tiempo real con nuestra herramienta gratuita.",
  path: "/tools/word-counter"
});

export default function WordCounterPage() {
  return <WordCounterClient />;
}
