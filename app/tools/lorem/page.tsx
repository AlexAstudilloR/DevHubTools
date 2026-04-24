import { Metadata } from "next";
import { LoremClient } from "./LoremClient";

export const metadata: Metadata = {
  title: "Generador de Lorem Ipsum | DevTools Hub",
  description: "Genera texto falso Lorem Ipsum por párrafos o palabras, con opción de markup HTML.",
};

export default function LoremPage() {
  return <LoremClient />;
}
