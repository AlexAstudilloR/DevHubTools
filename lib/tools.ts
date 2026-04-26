import { 
  Palette, KeyRound, Hash, Paintbrush, BoxSelect, 
  LayoutGrid, FileJson, Type, ShieldCheck, FileCode2, 
  Ruler, Contrast, FileText, Text, Link2, 
  ListMinus
} from "lucide-react";

export const TOOLS_DATA = [
  { id: "color-palette", category: "css", href: "/tools/color-palette", icon: Palette },
  { id: "jwt", category: "security", href: "/tools/jwt", icon: KeyRound },
  { id: "uuid", category: "dev", href: "/tools/uuid", icon: Hash },
  { id: "gradients", category: "css", href: "/tools/gradients", icon: Paintbrush },
  { id: "shadows", category: "css", href: "/tools/shadows", icon: BoxSelect },
  { id: "grid", category: "css", href: "/tools/grid", icon: LayoutGrid },
  { id: "json", category: "dev", href: "/tools/json", icon: FileJson },
  { id: "lorem", category: "text", href: "/tools/lorem", icon: Type },
  { id: "password", category: "security", href: "/tools/password", icon: ShieldCheck },
  { id: "css-minifier", category: "dev", href: "/tools/css-minifier", icon: FileCode2 },
  { id: "units", category: "utility", href: "/tools/units", icon: Ruler },
  { id: "contrast", category: "css", href: "/tools/contrast", icon: Contrast },
  
  // New Text Tools
  { id: "word-counter", category: "text", href: "/tools/word-counter", icon: FileText },
  { id: "character-counter", category: "text", href: "/tools/character-counter", icon: Text },
  { id: "slug-generator", category: "text", href: "/tools/slug-generator", icon: Link2 },
  { id: "remove-duplicate-lines", category: "text", href: "/tools/remove-duplicate-lines", icon: ListMinus },
];
