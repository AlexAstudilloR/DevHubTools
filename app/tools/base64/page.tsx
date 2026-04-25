import { generateMetadata } from "@/lib/seo";
import Base64Client from "./Base64Client";

export const metadata = generateMetadata({
  title: "Base64 Encoder & Decoder",
  description: "Herramienta online para codificar y decodificar texto en formato Base64 de forma instantánea.",
  path: "/tools/base64"
});

export default function Base64Page() {
  return <Base64Client />;
}
