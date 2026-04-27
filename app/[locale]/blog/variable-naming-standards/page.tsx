import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { Link } from "@/lib/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return constructMetadata({
    title: locale === "es"
      ? "Estándares de nomenclatura de variables – FastDevTools"
      : "Variable Naming Standards: camelCase, snake_case and More – FastDevTools",
    description: locale === "es"
      ? "Descubre los distintos estándares de nombrado de variables y cuándo usar cada uno."
      : "Discover the different variable naming standards and when to use each one.",
    url: "/blog/variable-naming-standards",
    locale
  });
}

export default function NamingStandardsPost({ params: { locale } }: { params: { locale: string } }) {
  const isEs = locale === "es";

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        {isEs ? "Volver al Blog" : "Back to Blog"}
      </Link>

      <header className="mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
          Best Practices
        </span>
        <h1 className="text-4xl font-bold mt-4 mb-4 leading-tight">
          {isEs
            ? "Estándares de nomenclatura de variables: camelCase, snake_case y más"
            : "Variable Naming Standards: camelCase, snake_case and More"}
        </h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> 2026-04-26</span>
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {isEs ? "5 min de lectura" : "5 min read"}</span>
        </div>
      </header>

      <div className="prose dark:prose-invert max-w-none text-base leading-relaxed space-y-6">
        {isEs ? (
          <>
            <p>
              El nombrado consistente de variables y funciones es una de las bases del código limpio y mantenible.
              Existen varios estándares ampliamente adoptados en la industria, cada uno con sus propios contextos de uso.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Los principales estándares</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-3 border">Estándar</th>
                    <th className="text-left p-3 border">Ejemplo</th>
                    <th className="text-left p-3 border">Uso común</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-3 border font-mono">camelCase</td><td className="p-3 border font-mono">userName</td><td className="p-3 border">JavaScript, Java, Dart</td></tr>
                  <tr className="bg-muted/50"><td className="p-3 border font-mono">PascalCase</td><td className="p-3 border font-mono">UserName</td><td className="p-3 border">Clases, Componentes React, C#</td></tr>
                  <tr><td className="p-3 border font-mono">snake_case</td><td className="p-3 border font-mono">user_name</td><td className="p-3 border">Python, Ruby, SQL</td></tr>
                  <tr className="bg-muted/50"><td className="p-3 border font-mono">SCREAMING_SNAKE</td><td className="p-3 border font-mono">MAX_RETRIES</td><td className="p-3 border">Constantes en todos los lenguajes</td></tr>
                  <tr><td className="p-3 border font-mono">kebab-case</td><td className="p-3 border font-mono">user-name</td><td className="p-3 border">URLs, CSS, HTML atributos</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">camelCase</h2>
            <p>La primera palabra en minúscula, las siguientes capitalizadas. Es el estándar en JavaScript/TypeScript:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`// JavaScript / TypeScript
const userName = "Ana";
let totalPrice = 100;
function fetchUserData() { ... }
const isLoggedIn = true;`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">PascalCase</h2>
            <p>Todas las palabras capitalizadas. Se usa para clases, componentes y tipos:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Clases
class UserAccount { ... }

// Componentes React
function LoginButton() { ... }
export default function UserProfile() { ... }

// Tipos e interfaces TypeScript
interface ApiResponse { ... }
type UserRole = "admin" | "viewer";`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">snake_case</h2>
            <p>Palabras separadas por guiones bajos. Es el estándar en Python y muy usado en bases de datos:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Python
user_name = "Ana"
total_price = 100
def fetch_user_data():
    pass

-- SQL
SELECT user_name, created_at FROM users
WHERE is_active = true`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">SCREAMING_SNAKE_CASE</h2>
            <p>Todo en mayúsculas con guiones bajos. Reservado para constantes que no cambian:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Constantes de configuración
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = "https://api.example.com";
const DEFAULT_TIMEOUT_MS = 5000;`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">kebab-case</h2>
            <p>Palabras separadas por guiones. Ideal para URLs, clases CSS y atributos HTML:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`/* CSS */
.nav-bar { }
.primary-button { }
.user-profile-card { }

<!-- HTML -->
<div class="main-container" data-user-id="1">

/* URLs */
/blog/essential-git-commands
/tools/color-palette`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">Reglas generales de buen nombrado</h2>
            <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
              <li><strong>Sé descriptivo:</strong> <code className="bg-muted px-1 rounded">userAge</code> es mejor que <code className="bg-muted px-1 rounded">a</code> o <code className="bg-muted px-1 rounded">x</code></li>
              <li><strong>Evita abreviaturas confusas:</strong> <code className="bg-muted px-1 rounded">temperature</code> &gt; <code className="bg-muted px-1 rounded">tmp</code></li>
              <li><strong>Usa verbos para funciones:</strong> <code className="bg-muted px-1 rounded">getUser()</code>, <code className="bg-muted px-1 rounded">sendEmail()</code>, <code className="bg-muted px-1 rounded">isValid()</code></li>
              <li><strong>Usa sustantivos para variables:</strong> <code className="bg-muted px-1 rounded">user</code>, <code className="bg-muted px-1 rounded">orderList</code>, <code className="bg-muted px-1 rounded">errorMessage</code></li>
              <li><strong>Usa booleanos con prefijo:</strong> <code className="bg-muted px-1 rounded">isActive</code>, <code className="bg-muted px-1 rounded">hasPermission</code>, <code className="bg-muted px-1 rounded">canEdit</code></li>
              <li><strong>Sé consistente:</strong> si tu equipo elige un estándar, todos lo siguen</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Por lenguaje: resumen rápido</h2>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`JavaScript/TypeScript:
  Variables y funciones → camelCase
  Clases y componentes → PascalCase
  Constantes           → SCREAMING_SNAKE_CASE

Python:
  Variables y funciones → snake_case
  Clases               → PascalCase
  Constantes           → SCREAMING_SNAKE_CASE

CSS/HTML:
  Clases y IDs         → kebab-case

Base de datos (SQL):
  Columnas y tablas    → snake_case`}</code></pre>
          </>
        ) : (
          <>
            <p>
              Consistent naming of variables and functions is one of the foundations of clean, maintainable code.
              There are several widely adopted standards in the industry, each with its own use contexts.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">The Main Standards</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-3 border">Standard</th>
                    <th className="text-left p-3 border">Example</th>
                    <th className="text-left p-3 border">Common Use</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-3 border font-mono">camelCase</td><td className="p-3 border font-mono">userName</td><td className="p-3 border">JavaScript, Java, Dart</td></tr>
                  <tr className="bg-muted/50"><td className="p-3 border font-mono">PascalCase</td><td className="p-3 border font-mono">UserName</td><td className="p-3 border">Classes, React Components, C#</td></tr>
                  <tr><td className="p-3 border font-mono">snake_case</td><td className="p-3 border font-mono">user_name</td><td className="p-3 border">Python, Ruby, SQL</td></tr>
                  <tr className="bg-muted/50"><td className="p-3 border font-mono">SCREAMING_SNAKE</td><td className="p-3 border font-mono">MAX_RETRIES</td><td className="p-3 border">Constants in all languages</td></tr>
                  <tr><td className="p-3 border font-mono">kebab-case</td><td className="p-3 border font-mono">user-name</td><td className="p-3 border">URLs, CSS, HTML attributes</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">camelCase</h2>
            <p>First word lowercase, subsequent words capitalized. Standard in JavaScript/TypeScript:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`// JavaScript / TypeScript
const userName = "Ana";
let totalPrice = 100;
function fetchUserData() { ... }
const isLoggedIn = true;`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">PascalCase</h2>
            <p>All words capitalized. Used for classes, components and types:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Classes
class UserAccount { ... }

// React Components
function LoginButton() { ... }
export default function UserProfile() { ... }

// TypeScript types and interfaces
interface ApiResponse { ... }
type UserRole = "admin" | "viewer";`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">snake_case</h2>
            <p>Words separated by underscores. Standard in Python and widely used in databases:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Python
user_name = "Ana"
total_price = 100
def fetch_user_data():
    pass

-- SQL
SELECT user_name, created_at FROM users
WHERE is_active = true`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">SCREAMING_SNAKE_CASE</h2>
            <p>All uppercase with underscores. Reserved for constants that don&apos;t change:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Configuration constants
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = "https://api.example.com";
const DEFAULT_TIMEOUT_MS = 5000;`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">kebab-case</h2>
            <p>Words separated by hyphens. Ideal for URLs, CSS classes and HTML attributes:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`/* CSS */
.nav-bar { }
.primary-button { }
.user-profile-card { }

<!-- HTML -->
<div class="main-container" data-user-id="1">

/* URLs */
/blog/essential-git-commands
/tools/color-palette`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">General Good Naming Rules</h2>
            <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
              <li><strong>Be descriptive:</strong> <code className="bg-muted px-1 rounded">userAge</code> is better than <code className="bg-muted px-1 rounded">a</code> or <code className="bg-muted px-1 rounded">x</code></li>
              <li><strong>Avoid confusing abbreviations:</strong> <code className="bg-muted px-1 rounded">temperature</code> &gt; <code className="bg-muted px-1 rounded">tmp</code></li>
              <li><strong>Use verbs for functions:</strong> <code className="bg-muted px-1 rounded">getUser()</code>, <code className="bg-muted px-1 rounded">sendEmail()</code>, <code className="bg-muted px-1 rounded">isValid()</code></li>
              <li><strong>Use nouns for variables:</strong> <code className="bg-muted px-1 rounded">user</code>, <code className="bg-muted px-1 rounded">orderList</code>, <code className="bg-muted px-1 rounded">errorMessage</code></li>
              <li><strong>Use boolean prefixes:</strong> <code className="bg-muted px-1 rounded">isActive</code>, <code className="bg-muted px-1 rounded">hasPermission</code>, <code className="bg-muted px-1 rounded">canEdit</code></li>
              <li><strong>Be consistent:</strong> if your team picks a standard, everyone follows it</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Per Language: Quick Summary</h2>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`JavaScript/TypeScript:
  Variables & functions → camelCase
  Classes & components  → PascalCase
  Constants             → SCREAMING_SNAKE_CASE

Python:
  Variables & functions → snake_case
  Classes               → PascalCase
  Constants             → SCREAMING_SNAKE_CASE

CSS/HTML:
  Classes & IDs         → kebab-case

Database (SQL):
  Columns & tables      → snake_case`}</code></pre>
          </>
        )}
      </div>

      <div className="mt-12 p-6 bg-primary/5 rounded-xl border">
        <p className="text-sm text-muted-foreground">
          {isEs
            ? "¿Generando slugs para tus URLs? Prueba nuestra herramienta de Slug Generator."
            : "Generating slugs for your URLs? Try our Slug Generator tool."}
        </p>
        <Link href="/tools/slug-generator" className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-primary hover:underline">
          Slug Generator <ArrowLeft className="h-3 w-3 rotate-180" />
        </Link>
      </div>
    </article>
  );
}
