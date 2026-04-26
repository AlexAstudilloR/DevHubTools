import React from "react";
import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/lib/navigation";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return constructMetadata({
    title: "Blog – DevTools Hub",
    description: "Artículos y tutoriales sobre desarrollo web, buenas prácticas y herramientas para programadores.",
    url: "/blog",
    locale
  });
}

const posts = [
  {
    titleEs: "Comandos Git esenciales para desarrolladores Junior",
    titleEn: "Essential Git Commands for Junior Developers",
    descEs: "Aprende los comandos de Git que todo desarrollador jr. debe dominar para trabajar de forma eficiente en equipos y proyectos reales.",
    descEn: "Learn the Git commands every junior developer must master to work efficiently in real teams and projects.",
    date: "2026-04-26",
    readTimeEs: "6 min de lectura",
    readTimeEn: "6 min read",
    category: "Git",
    slug: "git-commands-junior-developers"
  },
  {
    titleEs: "Buenas prácticas en el diseño de APIs REST",
    titleEn: "Best Practices for REST API Design",
    descEs: "Guía completa sobre los principios, convenciones y patrones que hacen una API REST robusta, predecible y fácil de consumir.",
    descEn: "A comprehensive guide on the principles, conventions, and patterns that make a REST API robust, predictable, and easy to consume.",
    date: "2026-04-26",
    readTimeEs: "8 min de lectura",
    readTimeEn: "8 min read",
    category: "API",
    slug: "rest-api-best-practices"
  },
  {
    titleEs: "Estándares de nomenclatura de variables: camelCase, snake_case y más",
    titleEn: "Variable Naming Standards: camelCase, snake_case and More",
    descEs: "Descubre los distintos estándares de nombrado de variables, cuándo usar cada uno y cómo mantener la consistencia en tu código.",
    descEn: "Discover the different variable naming standards, when to use each one, and how to maintain consistency in your code.",
    date: "2026-04-26",
    readTimeEs: "5 min de lectura",
    readTimeEn: "5 min read",
    category: "Best Practices",
    slug: "variable-naming-standards"
  }
];

export default async function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "Sidebar" });
  const isEs = locale === "es";

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-primary">{t("blog")}</h1>
        <p className="text-xl text-muted-foreground">
          {isEs
            ? "Artículos y tutoriales para mejorar tus habilidades como desarrollador."
            : "Articles and tutorials to improve your skills as a developer."}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
            <Card className="flex flex-col h-full hover:shadow-lg hover:border-primary/40 transition-all duration-200 cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <CardTitle className="leading-snug group-hover:text-primary transition-colors text-lg">
                  {isEs ? post.titleEs : post.titleEn}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-6">
                  {isEs ? post.descEs : post.descEn}
                </p>

                <div className="mt-auto pt-4 border-t flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {isEs ? post.readTimeEs : post.readTimeEn}
                    </span>
                  </div>
                  <span className="text-primary font-bold flex items-center gap-1 group-hover:underline">
                    {isEs ? "Leer" : "Read"} <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
