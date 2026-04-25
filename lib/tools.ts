import { 
  Palette, KeyRound, Hash, Paintbrush, BoxSelect, 
  LayoutGrid, FileJson, Type, ShieldCheck, FileCode2, 
  Ruler, Contrast, LucideIcon, Type as WordIcon,
  Code2, Link2, Image as ImageIcon, FileImage, 
  Scaling, Calculator, Calendar
} from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  category: "Design" | "Dev" | "Text" | "Image" | "General";
}

export const TOOLS: Tool[] = [
  // Design
  { id: "color-palette", name: "Paleta de Colores", description: "Genera variantes análogas y complementarias.", href: "/tools/color-palette", icon: Palette, category: "Design" },
  { id: "gradients", name: "Gradientes CSS", description: "Crea fondos con gradientes lineales y radiales.", href: "/tools/gradients", icon: Paintbrush, category: "Design" },
  { id: "shadows", name: "Sombras CSS", description: "Diseña sombras y cópialas como CSS.", href: "/tools/shadows", icon: BoxSelect, category: "Design" },
  { id: "grid", name: "Grid CSS", description: "Genera layouts con CSS Grid visualmente.", href: "/tools/grid", icon: LayoutGrid, category: "Design" },
  { id: "contrast", name: "Contraste WCAG", description: "Verifica el contraste entre colores.", href: "/tools/contrast", icon: Contrast, category: "Design" },
  
  // Dev
  { id: "jwt", name: "JWT Secret", description: "Genera claves seguras para JWT.", href: "/tools/jwt", icon: KeyRound, category: "Dev" },
  { id: "uuid", name: "UUID/GUID", description: "Genera identificadores únicos (v4/v5).", href: "/tools/uuid", icon: Hash, category: "Dev" },
  { id: "json", name: "JSON Formatter", description: "Formatea, valida y minifica JSON.", href: "/tools/json", icon: FileJson, category: "Dev" },
  { id: "css-minifier", name: "CSS Minifier", description: "Reduce el tamaño de tu código CSS.", href: "/tools/css-minifier", icon: FileCode2, category: "Dev" },
  { id: "base64", name: "Base64 Encoder", description: "Codifica y decodifica texto a Base64.", href: "/tools/base64", icon: Code2, category: "Dev" },
  { id: "url-encoder", name: "URL Encoder", description: "Codifica y decodifica parámetros de URL.", href: "/tools/url-encoder", icon: Link2, category: "Dev" },
  { id: "regex-tester", name: "Regex Tester", description: "Prueba y valida tus expresiones regulares.", href: "/tools/regex-tester", icon: Code2, category: "Dev" },
  
  // Text
  { id: "lorem", name: "Lorem Ipsum", description: "Genera texto de relleno en segundos.", href: "/tools/lorem", icon: Type, category: "Text" },
  { id: "word-counter", name: "Contador Palabras", description: "Cuenta palabras y caracteres en tiempo real.", href: "/tools/word-counter", icon: WordIcon, category: "Text" },
  { id: "slug-generator", name: "Generador Slug", description: "Convierte cualquier texto en un slug amigable.", href: "/tools/slug-generator", icon: Link2, category: "Text" },
  
  // General
  { id: "units", name: "Conversor Unidades", description: "Convierte entre px, rem y em.", href: "/tools/units", icon: Ruler, category: "General" },
  { id: "password", name: "Contraseñas", description: "Genera contraseñas fuertes y seguras.", href: "/tools/password", icon: ShieldCheck, category: "General" },
  { id: "bmi-calculator", name: "Calculadora IMC", description: "Calcula tu Índice de Masa Corporal.", href: "/tools/bmi-calculator", icon: Calculator, category: "General" },
  { id: "age-calculator", name: "Calculadora Edad", description: "Calcula tu edad exacta en años, meses y días.", href: "/tools/age-calculator", icon: Calendar, category: "General" },
  
  // Image
  { id: "jpg-to-png", name: "JPG to PNG", description: "Convierte imágenes JPG a formato PNG.", href: "/tools/jpg-to-png", icon: ImageIcon, category: "Image" },
  { id: "webp-converter", name: "WEBP Converter", description: "Convierte imágenes a formato WEBP.", href: "/tools/webp-converter", icon: FileImage, category: "Image" },
  { id: "image-compressor", name: "Compresor Imagen", description: "Reduce el peso de tus imágenes.", href: "/tools/image-compressor", icon: Scaling, category: "Image" },
];
