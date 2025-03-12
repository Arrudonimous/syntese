"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useTheme } from "next-themes"
import { Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"


export function AppearanceSettings() {
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [fontSize, setFontSize] = useState("medium")

  const handleSave = () => {
    toast({
      title: "Aparência atualizada",
      description: "Suas preferências de aparência foram salvas.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tema</CardTitle>
          <CardDescription>Escolha o tema que melhor se adapta às suas preferências.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div
              className={`flex cursor-pointer flex-col items-center rounded-md border-2 p-4 hover:border-primary ${theme === "light" ? "border-primary" : "border-transparent"}`}
              onClick={() => setTheme("light")}
            >
              <div className="mb-2 flex h-24 w-full items-center justify-center rounded-md bg-[#f8fafc] text-[#0f172a]">
                <span className="text-sm">A</span>
              </div>
              <div className="flex items-center gap-2">
                {theme === "light" && <Check className="h-4 w-4 text-primary" />}
                <span>Claro</span>
              </div>
            </div>

            <div
              className={`flex cursor-pointer flex-col items-center rounded-md border-2 p-4 hover:border-primary ${theme === "dark" ? "border-primary" : "border-transparent"}`}
              onClick={() => setTheme("dark")}
            >
              <div className="mb-2 flex h-24 w-full items-center justify-center rounded-md bg-[#0f172a] text-[#f8fafc]">
                <span className="text-sm">A</span>
              </div>
              <div className="flex items-center gap-2">
                {theme === "dark" && <Check className="h-4 w-4 text-primary" />}
                <span>Escuro</span>
              </div>
            </div>

            <div
              className={`flex cursor-pointer flex-col items-center rounded-md border-2 p-4 hover:border-primary ${theme === "system" ? "border-primary" : "border-transparent"}`}
              onClick={() => setTheme("system")}
            >
              <div className="mb-2 flex h-24 w-full items-center justify-center rounded-md bg-gradient-to-r from-[#f8fafc] to-[#0f172a]">
                <span className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-[#0f172a] to-[#f8fafc]">
                  A
                </span>
              </div>
              <div className="flex items-center gap-2">
                {theme === "system" && <Check className="h-4 w-4 text-primary" />}
                <span>Sistema</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tamanho da Fonte</CardTitle>
          <CardDescription>Ajuste o tamanho da fonte para melhorar a legibilidade.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={fontSize} onValueChange={setFontSize}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="small" id="small" />
              <Label htmlFor="small">Pequeno</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium" />
              <Label htmlFor="medium">Médio</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="large" id="large" />
              <Label htmlFor="large">Grande</Label>
            </div>
          </RadioGroup>

          <div className="mt-4 rounded-md border p-4">
            <p className={`${fontSize === "small" ? "text-sm" : fontSize === "medium" ? "text-base" : "text-lg"}`}>
              Este é um exemplo de texto com o tamanho de fonte selecionado.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Salvar Preferências</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Layout da Interface</CardTitle>
          <CardDescription>Personalize o layout da interface do Syntese.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center gap-2 rounded-md border p-4 hover:border-primary cursor-pointer">
              <div className="flex h-32 w-full flex-col rounded-md border">
                <div className="h-8 w-full border-b bg-muted/50"></div>
                <div className="flex flex-1">
                  <div className="w-1/4 border-r bg-muted/50"></div>
                  <div className="flex-1"></div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Barra lateral</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 rounded-md border p-4 hover:border-primary cursor-pointer opacity-50">
              <div className="flex h-32 w-full flex-col rounded-md border">
                <div className="h-8 w-full border-b bg-muted/50"></div>
                <div className="flex-1"></div>
              </div>
              <div className="flex items-center gap-2">
                <span>Sem barra lateral</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Salvar Preferências</Button>
        </CardFooter>
      </Card>
    </div>
  )
}