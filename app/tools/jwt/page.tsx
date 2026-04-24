import { Metadata } from "next";
import { JwtClient } from "./JwtClient";

export const metadata: Metadata = {
  title: "Generador JWT Secret | DevTools Hub",
  description: "Genera claves seguras para firmar JSON Web Tokens (JWT).",
};

export default function JwtPage() {
  return <JwtClient />;
}
