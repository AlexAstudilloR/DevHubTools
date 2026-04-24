import { Metadata } from "next";
import { ContrastClient } from "./ContrastClient";

export const metadata: Metadata = {
  title: "Calculadora de Contraste WCAG | DevTools Hub",
  description: "Verifica que tus combinaciones de colores cumplan con los estándares de accesibilidad WCAG.",
};

export default function ContrastPage() {
  return <ContrastClient />;
}
