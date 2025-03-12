"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "E-mail inválido.",
  }),
  bio: z.string().max(160, {
    message: "A bio deve ter no máximo 160 caracteres.",
  }),
  url: z
    .string()
    .url({
      message: "URL inválida.",
    })
    .optional()
    .or(z.literal("")),
})

export function ProfileSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "João Silva",
      email: "joao.silva@exemplo.com",
      bio: "Estudante de Ciência da Computação apaixonado por IA e desenvolvimento web.",
      url: "https://joaosilva.dev",
    },
  })

  function onSubmit(data) {
    setIsLoading(true)

    // Simula uma chamada de API
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Perfil atualizado",
        description: "Suas informações de perfil foram atualizadas com sucesso.",
      })
      console.log(data)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
          <CardDescription>
            Gerencie suas informações de perfil e como elas são exibidas para outros usuários.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex flex-col items-center gap-2">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="@usuario" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                Alterar Foto
              </Button>
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" placeholder="Seu nome" {...form.register("name")} />
                {form.formState.errors.name && (
                  <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="Seu e-mail" {...form.register("email")} />
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Conte um pouco sobre você"
              className="resize-none"
              {...form.register("bio")}
            />
            <p className="text-xs text-muted-foreground">
              Sua bio será exibida em seu perfil público. Máximo de 160 caracteres.
            </p>
            {form.formState.errors.bio && (
              <p className="text-sm text-destructive">{form.formState.errors.bio.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="url">Website</Label>
            <Input id="url" placeholder="https://exemplo.com" {...form.register("url")} />
            {form.formState.errors.url && (
              <p className="text-sm text-destructive">{form.formState.errors.url.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}