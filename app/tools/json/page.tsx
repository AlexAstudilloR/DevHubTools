import { Metadata } from "next";
import { JsonClient } from "./JsonClient";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator | DevTools Hub",
  description: "Valida, formatea y minifica archivos JSON localmente en tu navegador.",
};

export default function JsonPage() {
  return <JsonClient />;
}
