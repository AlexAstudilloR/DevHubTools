import { Metadata } from "next";
import { UuidClient } from "./UuidClient";

export const metadata: Metadata = {
  title: "Generador UUID/GUID | DevTools Hub",
  description: "Genera identificadores únicos universales (UUID/GUID) versiones 4 y 5.",
};

export default function UuidPage() {
  return <UuidClient />;
}
