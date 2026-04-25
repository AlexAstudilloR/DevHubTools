import { generateMetadata } from "@/lib/seo";
import BmiCalculatorClient from "./BmiCalculatorClient";

export const metadata = generateMetadata({
  title: "Calculadora de IMC (BMI)",
  description: "Calcula tu índice de masa corporal de forma rápida y sencilla.",
  path: "/tools/bmi-calculator"
});

export default function BmiCalculatorPage() {
  return <BmiCalculatorClient />;
}
