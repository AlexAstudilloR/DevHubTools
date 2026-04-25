"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { RefreshCcw } from "lucide-react";

interface PasswordConfig {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

interface PasswordHistory {
  password: string;
  strength: number;
}

export function PasswordClient() {
  const [config, setConfig] = useState<PasswordConfig>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  
  const [password, setPassword] = useState("");
  const [history, setHistory, isHydrated] = useLocalStorage<PasswordHistory[]>("history-password", []);

  const calculateStrength = (pass: string): number => {
    let score = 0;
    if (!pass) return score;
    if (pass.length > 8) score += 1;
    if (pass.length > 12) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return Math.min(5, Math.ceil(score * 0.83)); // max 5
  };

  const generate = (saveToHistory = true) => {
    let chars = "";
    if (config.uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (config.lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (config.numbers) chars += "0123456789";
    if (config.symbols) chars += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (!chars) {
      setPassword("");
      return;
    }

    let result = "";
    // Use crypto if available
    if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
      const randomValues = new Uint32Array(config.length);
      window.crypto.getRandomValues(randomValues);
      for (let i = 0; i < config.length; i++) {
        result += chars.charAt(randomValues[i] % chars.length);
      }
    } else {
      for (let i = 0; i < config.length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }

    setPassword(result);

    if (saveToHistory) {
      const strength = calculateStrength(result);
      setHistory(prev => {
        const item = { password: result, strength };
        const filtered = prev.filter(p => p.password !== result);
        return [item, ...filtered].slice(0, 5);
      });
    }
  };

  useEffect(() => {
    generate(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.length, config.uppercase, config.lowercase, config.numbers, config.symbols]);

  const strength = calculateStrength(password);
  
  const getStrengthColor = (s: number) => {
    if (s <= 1) return "bg-red-500";
    if (s === 2) return "bg-orange-500";
    if (s === 3) return "bg-yellow-500";
    if (s === 4) return "bg-lime-500";
    return "bg-green-500";
  };

  const getStrengthLabel = (s: number) => {
    if (s <= 1) return "Muy Débil";
    if (s === 2) return "Débil";
    if (s === 3) return "Aceptable";
    if (s === 4) return "Fuerte";
    return "Muy Fuerte";
  };

  return (
    <ToolLayout<PasswordHistory>
      title="Contraseñas Seguras"
      description="Genera contraseñas robustas evaluando su nivel de seguridad."
      toolId="password"
      history={isHydrated ? history : []}
      onCopy={() => navigator.clipboard.writeText(password)}
      onRestoreHistory={(item) => setPassword(item.password)}
      renderHistoryItem={(item) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getStrengthColor(item.strength)}`} />
            <span className="font-mono text-sm truncate max-w-[200px]" style={{ filter: "blur(2px)" }} onMouseOver={e => e.currentTarget.style.filter = "none"} onMouseOut={e => e.currentTarget.style.filter = "blur(2px)"}>
              {item.password}
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground ml-4">
            Longitud: {item.password.length}
          </span>
        </div>
      )}
    >
      <div className="space-y-6">
        <Card className="bg-muted/10 border-primary/20">
          <CardContent className="p-8">
            <div className="relative">
              <input 
                type="text" 
                value={password}
                readOnly
                className="w-full text-center text-3xl sm:text-4xl font-mono bg-transparent border-none focus:outline-none tracking-widest break-all"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-1/2 -translate-y-1/2"
                onClick={() => generate()}
              >
                <RefreshCcw className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="mt-8 space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Nivel de Seguridad</span>
                <span className={getStrengthColor(strength).replace("bg-", "text-")}>
                  {password ? getStrengthLabel(strength) : "N/A"}
                </span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div 
                    key={level} 
                    className={`h-full flex-1 transition-all ${level <= strength ? getStrengthColor(strength) : "bg-transparent"}`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Longitud de la contraseña</label>
                  <span className="text-xl font-bold text-primary">{config.length}</span>
                </div>
                <Input 
                  type="range" 
                  min={4} 
                  max={64} 
                  value={config.length} 
                  onChange={(e) => setConfig({ ...config, length: Number(e.target.value) })}
                  className="w-full cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={config.uppercase}
                    onChange={(e) => setConfig({ ...config, uppercase: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium">Mayúsculas (A-Z)</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={config.lowercase}
                    onChange={(e) => setConfig({ ...config, lowercase: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium">Minúsculas (a-z)</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={config.numbers}
                    onChange={(e) => setConfig({ ...config, numbers: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium">Números (0-9)</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={config.symbols}
                    onChange={(e) => setConfig({ ...config, symbols: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium">Símbolos (!@#$...)</span>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
