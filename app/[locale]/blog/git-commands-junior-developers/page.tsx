import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { Link } from "@/lib/navigation";
import { ArrowLeft, Calendar, Clock, GitBranch } from "lucide-react";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return constructMetadata({
    title: locale === "es"
      ? "Comandos Git esenciales para desarrolladores Junior – DevTools Hub"
      : "Essential Git Commands for Junior Developers – DevTools Hub",
    description: locale === "es"
      ? "Aprende los comandos de Git que todo desarrollador jr debe dominar."
      : "Learn the Git commands every junior developer must master.",
    url: "/blog/git-commands-junior-developers",
    locale
  });
}

export default function GitCommandsPost({ params: { locale } }: { params: { locale: string } }) {
  const isEs = locale === "es";

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        {isEs ? "Volver al Blog" : "Back to Blog"}
      </Link>

      <header className="mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
          Git
        </span>
        <h1 className="text-4xl font-bold mt-4 mb-4 leading-tight">
          {isEs
            ? "Comandos Git esenciales para desarrolladores Junior"
            : "Essential Git Commands for Junior Developers"}
        </h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> 2026-04-26</span>
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {isEs ? "6 min de lectura" : "6 min read"}</span>
        </div>
      </header>

      <div className="prose dark:prose-invert max-w-none text-base leading-relaxed space-y-6">
        {isEs ? (
          <>
            <p>
              Git es la herramienta de control de versiones más utilizada en el mundo del desarrollo de software.
              Si estás comenzando tu carrera como desarrollador, dominar estos comandos te ahorrará muchos dolores de cabeza.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Configuración inicial</h2>
            <p>Lo primero que debes hacer al instalar Git es configurar tu identidad:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Clonar un repositorio</h2>
            <p>Para descargar un proyecto existente a tu máquina:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`git clone https://github.com/usuario/repositorio.git`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. El flujo básico diario</h2>
            <p>Estos son los comandos que usarás literalmente todos los días:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Ver el estado de tus archivos
git status

# Agregar archivos al área de staging
git add .                   # todos los archivos
git add src/archivo.ts      # un archivo específico

# Confirmar los cambios con un mensaje
git commit -m "feat: agregar formulario de login"

# Subir tus cambios al repositorio remoto
git push origin main`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Trabajar con ramas (branches)</h2>
            <p>Las ramas son fundamentales para no romper el código principal:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Crear y cambiar a una nueva rama
git checkout -b feature/nueva-funcionalidad

# Ver todas las ramas
git branch

# Cambiar de rama
git checkout main

# Fusionar una rama en la actual
git merge feature/nueva-funcionalidad`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Obtener cambios del equipo</h2>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Descargar los últimos cambios sin fusionarlos
git fetch origin

# Descargar y fusionar los últimos cambios
git pull origin main`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Ver el historial</h2>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Ver todos los commits
git log --oneline --graph

# Ver qué cambió en un commit específico
git show abc1234`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Deshacer cambios</h2>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Descartar cambios en un archivo (¡cuidado, es irreversible!)
git checkout -- archivo.ts

# Quitar un archivo del staging sin perder cambios
git reset HEAD archivo.ts

# Guardar cambios temporalmente sin commitear
git stash
git stash pop  # recuperarlos después`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">Convención de mensajes de commit</h2>
            <p>Usa la convención <strong>Conventional Commits</strong> para que tu historial sea legible:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><code className="bg-muted px-1 rounded">feat:</code> nueva funcionalidad</li>
              <li><code className="bg-muted px-1 rounded">fix:</code> corrección de bug</li>
              <li><code className="bg-muted px-1 rounded">docs:</code> cambios en documentación</li>
              <li><code className="bg-muted px-1 rounded">refactor:</code> refactorización de código</li>
              <li><code className="bg-muted px-1 rounded">chore:</code> tareas de mantenimiento</li>
            </ul>
          </>
        ) : (
          <>
            <p>
              Git is the most widely used version control tool in software development.
              If you're starting your career as a developer, mastering these commands will save you many headaches.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Initial Setup</h2>
            <p>The first thing to do after installing Git is to configure your identity:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`git config --global user.name "Your Name"
git config --global user.email "you@email.com"`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Clone a Repository</h2>
            <p>To download an existing project to your machine:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`git clone https://github.com/user/repo.git`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Daily Basic Flow</h2>
            <p>These are the commands you'll use literally every day:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Check the status of your files
git status

# Add files to the staging area
git add .                   # all files
git add src/file.ts         # specific file

# Commit changes with a message
git commit -m "feat: add login form"

# Push changes to the remote repository
git push origin main`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Working with Branches</h2>
            <p>Branches are fundamental to avoid breaking main code:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Create and switch to a new branch
git checkout -b feature/new-feature

# List all branches
git branch

# Switch branch
git checkout main

# Merge a branch into the current one
git merge feature/new-feature`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Get Team Changes</h2>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Download latest changes without merging
git fetch origin

# Download and merge latest changes
git pull origin main`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. View History</h2>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`# View all commits
git log --oneline --graph

# See what changed in a specific commit
git show abc1234`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Undoing Changes</h2>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Discard changes in a file (caution: irreversible!)
git checkout -- file.ts

# Remove a file from staging without losing changes
git reset HEAD file.ts

# Temporarily save changes without committing
git stash
git stash pop  # recover them later`}</code></pre>

            <h2 className="text-2xl font-bold mt-8 mb-4">Commit Message Convention</h2>
            <p>Use <strong>Conventional Commits</strong> to keep your history readable:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><code className="bg-muted px-1 rounded">feat:</code> new feature</li>
              <li><code className="bg-muted px-1 rounded">fix:</code> bug fix</li>
              <li><code className="bg-muted px-1 rounded">docs:</code> documentation changes</li>
              <li><code className="bg-muted px-1 rounded">refactor:</code> code refactoring</li>
              <li><code className="bg-muted px-1 rounded">chore:</code> maintenance tasks</li>
            </ul>
          </>
        )}
      </div>

      <div className="mt-12 p-6 bg-primary/5 rounded-xl border">
        <p className="text-sm text-muted-foreground">
          {isEs
            ? "¿Quieres practicar? Prueba nuestras herramientas de generación de slugs o UUID para tus proyectos."
            : "Want to practice? Try our slug generator or UUID tools for your projects."}
        </p>
        <Link href="/tools/uuid" className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-primary hover:underline">
          UUID Generator <ArrowLeft className="h-3 w-3 rotate-180" />
        </Link>
      </div>
    </article>
  );
}
