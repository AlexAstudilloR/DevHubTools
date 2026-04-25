"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
// Removed duplicate Button import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function WordCounterClient() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({ words: 0, characters: 0, sentences: 0, readingTime: 0 });

  const analyze = () => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const characters = text.length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const readingTime = Math.ceil(words / 200); // avg 200 wpm
    setStats({ words, characters, sentences, readingTime });
  };

  return (
    <Card className="max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Word Counter</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <textarea
          className="w-full h-40 p-2 border rounded-md focus:outline-none focus:ring"
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={analyze}>Analyze</Button>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p>Words: <span className="font-medium">{stats.words}</span></p>
          <p>Characters: <span className="font-medium">{stats.characters}</span></p>
          <p>Sentences: <span className="font-medium">{stats.sentences}</span></p>
          <p>Reading time (mins): <span className="font-medium">{stats.readingTime}</span></p>
        </div>
      </CardContent>
    </Card>
  );
}
