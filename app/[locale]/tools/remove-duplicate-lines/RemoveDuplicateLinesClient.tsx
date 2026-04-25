"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RemoveDuplicateLinesClient() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const removeDuplicates = () => {
    const lines = text.split(/\r?\n/);
    const unique = Array.from(new Set(lines));
    setResult(unique.join("\n"));
  };

  return (
    <Card className="max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Remove Duplicate Lines</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <textarea
          className="w-full h-48 p-2 border rounded-md focus:outline-none focus:ring"
          placeholder="Paste text with duplicate lines..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={removeDuplicates}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
        >
          Remove Duplicates
        </button>
        {result && (
          <div className="p-4 bg-muted rounded-md">
            <pre className="whitespace-pre-wrap break-words">{result}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
