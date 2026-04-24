import { Metadata } from "next";
import { ColorPaletteClient } from "./ColorPaletteClient";

export const metadata: Metadata = {
  title: "Paleta de Colores | DevTools Hub",
  description: "Genera variantes de colores análogos y complementarios a partir de un código HEX.",
};

export default function ColorPalettePage() {
  return <ColorPaletteClient />;
}
