import { Metadata } from "next";
import { GridClient } from "./GridClient";

export const metadata: Metadata = {
  title: "Grid CSS Generator | DevTools Hub",
  description: "Genera estructuras de CSS Grid personalizadas, visualiza el resultado y obtén el código.",
};

export default function GridPage() {
  return <GridClient />;
}
