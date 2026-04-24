import { Metadata } from "next";
import { UnitsClient } from "./UnitsClient";

export const metadata: Metadata = {
  title: "Conversor de Unidades CSS | DevTools Hub",
  description: "Convierte medidas entre píxeles (px), rem y em rápidamente.",
};

export default function UnitsPage() {
  return <UnitsClient />;
}
