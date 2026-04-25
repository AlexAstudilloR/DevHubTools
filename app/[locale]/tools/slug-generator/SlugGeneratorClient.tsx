"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SlugGeneratorClient() {
  const [text, setText] = useState("");
  const [slug, setSlug] = useState("");

  const generate = () => {
    const s = text
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    setSlug(s);
  };

  return (
    <Card className="max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Slug Generator</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <textarea
          className="w-full h-32 p-2 border rounded-md focus:outline-none focus:ring"
          placeholder="Enter text to slugify..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={generate}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
        >
          Generate Slug
        </button>
        {slug && (
          <div className="p-2 bg-muted rounded-md break-words">
            <strong>Slug:</strong> {slug}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
