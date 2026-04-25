import { generateMetadata } from "@/lib/seo";
import AgeCalculatorClient from "./AgeCalculatorClient";

export const metadata = generateMetadata({
  title: "Calculadora de Edad Exacta",
  description: "Calcula tu edad exacta en años, meses y días de forma instantánea.",
  path: "/tools/age-calculator"
});

export default function AgeCalculatorPage() {
  return <AgeCalculatorClient />;
}
