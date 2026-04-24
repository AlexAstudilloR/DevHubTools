import { Metadata } from "next";
import { PasswordClient } from "./PasswordClient";

export const metadata: Metadata = {
  title: "Generador de Contraseñas Seguras | DevTools Hub",
  description: "Crea contraseñas robustas con indicadores de fuerza y múltiples opciones de complejidad.",
};

export default function PasswordPage() {
  return <PasswordClient />;
}
