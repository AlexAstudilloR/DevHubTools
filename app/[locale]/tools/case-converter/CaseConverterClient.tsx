"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export function CaseConverterClient() {
  const [text, setText] = useState("")
  const [caseType, setCaseType] = useState("uppercase")
  const [result, setResult] = useState("")

  const convert = () => {
    let transformed = text
    switch (caseType) {
      case "uppercase":
        transformed = text.toUpperCase()
        break
      case "lowercase":
        transformed = text.toLowerCase()
        break
      case "title":
        transformed = text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        break
      case "camel":
        transformed = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        break
      default:
        break
    }
    setResult(transformed)
  }

  return (
    <Card className="max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Case Converter</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <textarea
          className="w-full h-32 p-2 border rounded-md focus:outline-none focus:ring"
          placeholder="Enter text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Select value={caseType} onValueChange={(v) => setCaseType(v)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select case" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="uppercase">UPPERCASE</SelectItem>
            <SelectItem value="lowercase">lowercase</SelectItem>
            <SelectItem value="title">Title Case</SelectItem>
            <SelectItem value="camel">camelCase</SelectItem>
          </SelectContent>
        </Select>
        <button onClick={convert} className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition">
          Convert
        </button>
        {result && (
          <div className="p-4 bg-muted rounded-md">
            <pre className="whitespace-pre-wrap break-words">{result}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
