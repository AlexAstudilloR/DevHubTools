import { generateMetadata } from "@/lib/seo";
import UrlEncoderClient from "./UrlEncoderClient";

export const metadata = generateMetadata({
  title: "URL Encoder & Decoder",
  description: "Herramienta online para codificar y decodificar parámetros de URL de forma segura.",
  path: "/tools/url-encoder"
});

export default function UrlEncoderPage() {
  return <UrlEncoderClient />;
}
