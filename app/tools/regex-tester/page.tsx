import { generateMetadata } from "@/lib/seo";
import RegexTesterClient from "./RegexTesterClient";

export const metadata = generateMetadata({
  title: "Regex Tester & Debugger",
  description: "Prueba y valida tus expresiones regulares en tiempo real con resaltado de coincidencias.",
  path: "/tools/regex-tester"
});

export default function RegexTesterPage() {
  return <RegexTesterClient />;
}
