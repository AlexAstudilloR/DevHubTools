import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { Link } from "@/lib/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return constructMetadata({
    title: locale === "es"
      ? "Buenas prácticas en el diseño de APIs REST – FastDevTools"
      : "Best Practices for REST API Design – FastDevTools",
    description: locale === "es"
      ? "Guía completa sobre principios y convenciones para diseñar APIs REST robustas."
      : "Comprehensive guide on principles and conventions for designing robust REST APIs.",
    url: "/blog/rest-api-best-practices",
    locale
  });
}

export default function RestApiPost({ params: { locale } }: { params: { locale: string } }) {
  const isEs = locale === "es";

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        {isEs ? "Volver al Blog" : "Back to Blog"}
      </Link>

      <header className="mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
          API
        </span>
        <h1 className="text-4xl font-bold mt-4 mb-4 leading-tight">
          {isEs
            ? "Buenas prácticas en el diseño de APIs REST"
            : "Best Practices for REST API Design"}
        </h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> 2026-04-26</span>
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {isEs ? "8 min de lectura" : "8 min read"}</span>
        </div>
      </header>

      <div className="prose dark:prose-invert max-w-none text-base leading-relaxed space-y-6">
        {isEs ? (
          <>
            <p>
              Diseñar una API REST de calidad va mucho más allá de simplemente exponer endpoints. Una buena API es
              predecible, consistente, segura y fácil de consumir. Aquí te presento las prácticas más importantes.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Usa sustantivos, no verbos en las rutas</h2>
            <p>El método HTTP ya describe la acción. Las rutas deben representar recursos:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`❌ GET /getUsers
❌ POST /createUser
❌ DELETE /deleteUser/1

✅ GET    /users
✅ POST   /users
✅ DELETE /users/1`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Usa los métodos HTTP correctamente</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>GET</strong> – leer recursos (sin efectos secundarios)</li>
              <li><strong>POST</strong> – crear un nuevo recurso</li>
              <li><strong>PUT</strong> – reemplazar un recurso completo</li>
              <li><strong>PATCH</strong> – actualizar parcialmente un recurso</li>
              <li><strong>DELETE</strong> – eliminar un recurso</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Versiona tu API desde el principio</h2>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`/api/v1/users
/api/v2/users`}</code></pre>
            <p className="text-muted-foreground">
              Versionar evita romper clientes existentes cuando evoluciona tu API.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Usa códigos de estado HTTP correctamente</h2>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`200 OK              → solicitud exitosa
201 Created         → recurso creado
204 No Content      → éxito sin cuerpo de respuesta
400 Bad Request     → datos inválidos del cliente
401 Unauthorized    → no autenticado
403 Forbidden       → autenticado pero sin permiso
404 Not Found       → recurso no existe
422 Unprocessable   → validación fallida
500 Server Error    → error interno del servidor`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Estructura de respuesta consistente</h2>
            <p>Nunca cambies el formato de respuesta entre endpoints. Usa una estructura estándar:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Éxito
{
  "data": { "id": 1, "name": "Ana" },
  "meta": { "page": 1, "total": 100 }
}

// Error
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "El campo email es requerido.",
    "details": [{ "field": "email", "issue": "required" }]
  }
}`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Paginación, filtros y ordenamiento</h2>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`GET /users?page=2&limit=20
GET /users?sort=createdAt&order=desc
GET /users?role=admin&status=active`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Seguridad básica</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Siempre usa <strong>HTTPS</strong> en producción</li>
              <li>Implementa autenticación con <strong>JWT</strong> o <strong>OAuth 2.0</strong></li>
              <li>Valida y sanitiza todos los inputs</li>
              <li>Implementa <strong>rate limiting</strong> para evitar abusos</li>
              <li>Usa headers de seguridad: <code className="bg-muted px-1 rounded">CORS</code>, <code className="bg-muted px-1 rounded">Content-Security-Policy</code></li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">8. Documenta tu API</h2>
            <p>
              Una API sin documentación es una API que nadie usará. Herramientas como <strong>Swagger/OpenAPI</strong> o
              <strong> Postman</strong> te permiten generar documentación interactiva de forma sencilla.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">9. Nombrado en plural y minúsculas</h2>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`✅ /api/v1/blog-posts
✅ /api/v1/users/1/orders
❌ /api/v1/BlogPost
❌ /api/v1/User/1/Order`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">10. Idempotencia</h2>
            <p>
              Las operaciones <code className="bg-muted px-1 rounded">GET</code>, <code className="bg-muted px-1 rounded">PUT</code> y <code className="bg-muted px-1 rounded">DELETE</code> deben
              ser idempotentes: llamarlas múltiples veces debe tener el mismo efecto que llamarlas una sola vez.
            </p>
          </>
        ) : (
          <>
            <p>
              Designing a quality REST API goes well beyond just exposing endpoints. A good API is
              predictable, consistent, secure, and easy to consume. Here are the most important practices.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Use Nouns, Not Verbs in Routes</h2>
            <p>The HTTP method already describes the action. Routes should represent resources:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`❌ GET /getUsers
❌ POST /createUser
❌ DELETE /deleteUser/1

✅ GET    /users
✅ POST   /users
✅ DELETE /users/1`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Use HTTP Methods Correctly</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>GET</strong> – read resources (no side effects)</li>
              <li><strong>POST</strong> – create a new resource</li>
              <li><strong>PUT</strong> – fully replace a resource</li>
              <li><strong>PATCH</strong> – partially update a resource</li>
              <li><strong>DELETE</strong> – remove a resource</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Version Your API from the Start</h2>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`/api/v1/users
/api/v2/users`}</code></pre>
            <p className="text-muted-foreground">
              Versioning prevents breaking existing clients when your API evolves.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Use HTTP Status Codes Correctly</h2>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`200 OK              → successful request
201 Created         → resource created
204 No Content      → success with no response body
400 Bad Request     → invalid client data
401 Unauthorized    → not authenticated
403 Forbidden       → authenticated but no permission
404 Not Found       → resource doesn't exist
422 Unprocessable   → validation failed
500 Server Error    → internal server error`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Consistent Response Structure</h2>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Success
{
  "data": { "id": 1, "name": "Ana" },
  "meta": { "page": 1, "total": 100 }
}

// Error
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The email field is required.",
    "details": [{ "field": "email", "issue": "required" }]
  }
}`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Pagination, Filtering and Sorting</h2>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`GET /users?page=2&limit=20
GET /users?sort=createdAt&order=desc
GET /users?role=admin&status=active`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Basic Security</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Always use <strong>HTTPS</strong> in production</li>
              <li>Implement authentication with <strong>JWT</strong> or <strong>OAuth 2.0</strong></li>
              <li>Validate and sanitize all inputs</li>
              <li>Implement <strong>rate limiting</strong> to prevent abuse</li>
              <li>Use security headers: <code className="bg-muted px-1 rounded">CORS</code>, <code className="bg-muted px-1 rounded">Content-Security-Policy</code></li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">8. Document Your API</h2>
            <p>
              An undocumented API is an API nobody will use. Tools like <strong>Swagger/OpenAPI</strong> or
              <strong> Postman</strong> let you generate interactive documentation easily.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">9. Plural Lowercase Naming</h2>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`✅ /api/v1/blog-posts
✅ /api/v1/users/1/orders
❌ /api/v1/BlogPost
❌ /api/v1/User/1/Order`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">10. Idempotency</h2>
            <p>
              Operations <code className="bg-muted px-1 rounded">GET</code>, <code className="bg-muted px-1 rounded">PUT</code> and <code className="bg-muted px-1 rounded">DELETE</code> must
              be idempotent: calling them multiple times must have the same effect as calling them once.
            </p>
          </>
        )}
      </div>

      <div className="mt-12 p-6 bg-primary/5 rounded-xl border">
        <p className="text-sm text-muted-foreground">
          {isEs
            ? "¿Trabajas con JWT? Prueba nuestra herramienta para generar secretos seguros."
            : "Working with JWT? Try our tool to generate secure secrets."}
        </p>
        <Link href="/tools/jwt" className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-primary hover:underline">
          JWT Secret Generator <ArrowLeft className="h-3 w-3 rotate-180" />
        </Link>
      </div>
    </article>
  );
}
