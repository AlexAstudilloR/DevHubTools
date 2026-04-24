import { Metadata } from "next";
import { ShadowsClient } from "./ShadowsClient";

export const metadata: Metadata = {
  title: "Generador de Sombras CSS | DevTools Hub",
  description: "Diseña sombras CSS interactuando con controles de desplazamiento, desenfoque y color.",
};

export default function ShadowsPage() {
  return <ShadowsClient />;
}
