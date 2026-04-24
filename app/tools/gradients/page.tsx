import { Metadata } from "next";
import { GradientsClient } from "./GradientsClient";

export const metadata: Metadata = {
  title: "Generador de Gradientes CSS | DevTools Hub",
  description: "Crea fondos con gradientes lineales y radiales interactivos, y obtén el código CSS y Tailwind.",
};

export default function GradientsPage() {
  return <GradientsClient />;
}
