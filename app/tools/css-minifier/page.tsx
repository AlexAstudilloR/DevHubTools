import { Metadata } from "next";
import { CssMinifierClient } from "./CssMinifierClient";

export const metadata: Metadata = {
  title: "CSS Minifier | DevTools Hub",
  description: "Reduce el tamaño de tu código CSS eliminando espacios, comentarios y formato innecesario.",
};

export default function CssMinifierPage() {
  return <CssMinifierClient />;
}
