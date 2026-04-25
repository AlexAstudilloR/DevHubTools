"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CharacterCounterClient() {
  const [text, setText] = useState("");
  const [counts, setCounts] = useState({ withSpaces: 0, withoutSpaces: 0 });

  const analyze = () => {
    const withSpaces = text.length;
    const withoutSpaces = text.replace(/\s/g, "").length;
    setCounts({ withSpaces, withoutSpaces });
  };

  return (
    <Card className="max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Character Counter</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <textarea
          className="w-full h-40 p-2 border rounded-md focus:outline-none focus:ring"
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={analyze}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
        >
          Analyze
        </button>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p>Characters (incl. spaces): <span className="font-medium">{counts.withSpaces}</span></p>
          <p>Characters (no spaces): <span className="font-medium">{counts.withoutSpaces}</span></p>
        </div>
      </CardContent>
    </Card>
  );
}
