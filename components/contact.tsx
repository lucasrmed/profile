"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica para enviar o formulário
    console.log("Form data:", formData)
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    // Mostrar mensagem de sucesso
    alert("Mensagem enviada com sucesso!")
  }

  return (
    <section id="contato" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Vamos Conversar</h2>
          <p className="text-xl text-palette-cream">
            Interessado em trabalhar juntos? Entre em contato para discutirmos seu projeto.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold mb-6">Entre em Contato</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nome
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Assunto
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Como posso ajudar?"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Descreva seu projeto ou pergunta..."
                  className="min-h-[150px]"
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full group">
                Enviar Mensagem
                <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">Informações de Contato</h3>

            <div className="space-y-6 mb-8">
              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <a
                      href="mailto:contato@seudominio.com"
                      className="text-palette-cream hover:text-primary transition-colors"
                    >
                      contato@seudominio.com
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Telefone</h4>
                    <a href="tel:+5511999999999" className="text-palette-cream hover:text-primary transition-colors">
                      +55 (11) 99999-9999
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Localização</h4>
                    <p className="text-palette-cream">São Paulo, Brasil</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Redes Sociais</h4>
              <div className="flex gap-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Button size="icon" variant="outline" className="h-12 w-12 rounded-full">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Button size="icon" variant="outline" className="h-12 w-12 rounded-full">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Button size="icon" variant="outline" className="h-12 w-12 rounded-full">
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                </a>
              </div>
            </div>

            <div className="mt-8 p-6 bg-muted/30 rounded-lg">
              <h4 className="font-medium mb-2">Disponibilidade</h4>
              <p className="text-palette-cream mb-4">
                Atualmente disponível para projetos freelance e oportunidades de contrato.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Disponível para novos projetos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
