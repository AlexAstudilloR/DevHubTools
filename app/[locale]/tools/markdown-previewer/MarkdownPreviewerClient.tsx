"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

export function MarkdownPreviewerClient() {
  const [markdown, setMarkdown] = useState("");

  return (
    <Card className="max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Markdown Previewer</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <textarea
          className="w-full h-48 p-2 border rounded-md focus:outline-none focus:ring"
          placeholder="Enter markdown..."
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        />
        <div className="prose prose-zinc dark:prose-invert max-w-none p-4 bg-muted rounded-md overflow-auto">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
}
