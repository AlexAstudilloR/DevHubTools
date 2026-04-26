import React from "react";
import { useTranslations } from "next-intl";
import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { Mail, MessageSquare, Twitter, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await import(`@/messages/${locale}.json`).then(m => m.default.Sidebar);
  return constructMetadata({
    title: t.contact,
    description: "Get in touch with the DevTools Hub team.",
    url: "/contact",
    locale
  });
}

export default function ContactPage() {
  const t = useTranslations("Sidebar");

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-primary">{t("contact")}</h1>
        <p className="text-xl text-muted-foreground">We'd love to hear from you!</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="text-muted-foreground mb-6">
              Have questions, feedback, or a tool suggestion? Reach out to us through any of these channels.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg border bg-card">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">hello@devhubtools.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg border bg-card">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <Twitter className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">Twitter</p>
                <p className="text-sm text-muted-foreground">@devhubtools</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg border bg-card">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <Github className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">GitHub</p>
                <p className="text-sm text-muted-foreground">github.com/devhubtools</p>
              </div>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>We'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">Subject</label>
              <Input id="subject" placeholder="What is this about?" />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <textarea 
                id="message" 
                className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Type your message here..."
              />
            </div>
            <Button className="w-full">Send Message</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
