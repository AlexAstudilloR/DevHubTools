import React from "react";
import { useTranslations } from "next-intl";
import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/lib/navigation";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await import(`@/messages/${locale}.json`).then(m => m.default.Sidebar);
  return constructMetadata({
    title: t.blog,
    description: "Read the latest news and tutorials about web development and DevTools Hub.",
    url: "/blog",
    locale
  });
}

const posts = [
  {
    title: "10 Essential Tools for Modern Web Developers",
    description: "Discover which tools can boost your productivity and simplify your daily workflow as a programmer.",
    date: "2024-04-20",
    readTime: "5 min read",
    category: "Productivity",
    slug: "essential-tools-for-developers"
  },
  {
    title: "Understanding JWT and how to use it safely",
    description: "A comprehensive guide on JSON Web Tokens, why they matter, and best practices for implementation.",
    date: "2024-04-15",
    readTime: "8 min read",
    category: "Security",
    slug: "understanding-jwt-safely"
  },
  {
    title: "Why SEO-friendly URL slugs matter",
    description: "Learn how URL structure affects your search engine rankings and how to generate the best slugs.",
    date: "2024-04-10",
    readTime: "4 min read",
    category: "SEO",
    slug: "seo-friendly-url-slugs"
  }
];

export default function BlogPage() {
  const t = useTranslations("Sidebar");

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-4 text-primary">{t("blog")}</h1>
          <p className="text-xl text-muted-foreground">Insights, tutorials, and updates from our team.</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <Card key={index} className="flex flex-col h-full hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded">
                  {post.category}
                </span>
              </div>
              <CardTitle className="leading-tight hover:text-primary transition-colors cursor-pointer">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <CardDescription className="text-sm line-clamp-3 mb-6">
                {post.description}
              </CardDescription>
              
              <div className="mt-auto pt-4 border-t flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
                <Link href={`/blog/${post.slug}`} className="text-primary font-bold flex items-center gap-1 hover:underline">
                  Read <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-20 p-12 rounded-2xl bg-primary/5 border text-center">
        <h2 className="text-2xl font-bold mb-4">Want more content?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter to receive the latest tools and articles directly in your inbox. No spam, just pure value for developers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input placeholder="Enter your email" className="bg-background" />
          <Button>Subscribe</Button>
        </div>
      </div>
    </div>
  );
}
