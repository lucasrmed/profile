"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ArticlesPage() {
  const articles = [
    {
      id: 1,
      title: "Otimizando Performance em Aplicações React",
      excerpt:
        "Técnicas avançadas para melhorar a performance de aplicações React, incluindo memoização, code splitting e renderização condicional.",
      image: "/images/articles/react-logo-purple-bg.jpeg",
      date: "12 Mar 2023",
      readTime: "8 min",
      tags: ["React", "Performance", "JavaScript"],
    },
    {
      id: 2,
      title: "Arquitetura de Componentes Escaláveis",
      excerpt:
        "Como estruturar componentes React para projetos de grande escala, utilizando padrões de design e práticas de componentização.",
      image: "/images/articles/pixel-art-hands-window.jpeg",
      date: "25 Jan 2023",
      readTime: "10 min",
      tags: ["Arquitetura", "React", "Design Patterns"],
    },
    {
      id: 3,
      title: "Testes Automatizados para Front-end",
      excerpt:
        "Estratégias eficientes para implementar testes unitários, de integração e end-to-end em aplicações front-end modernas.",
      image: "/images/articles/abstract-code-lines.jpeg",
      date: "08 Dez 2022",
      readTime: "12 min",
      tags: ["Testes", "Jest", "Testing Library"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-main pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-8">
          <Link href="/" className="text-palette-turquoise hover:text-palette-turquoise/80 flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Home
          </Link>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-palette-white">Artigos Técnicos</h1>
          <p className="text-xl text-palette-white/80">
            Compartilhando conhecimento e experiências sobre desenvolvimento front-end e tecnologias web.
          </p>
        </div>

        <div className="grid gap-10 max-w-5xl mx-auto">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="overflow-hidden border-0 bg-palette-navy/50 shadow-lg hover:shadow-xl hover:shadow-palette-turquoise/10 transition-all duration-300 group"
            >
              <Link href={`/artigos/${article.id}`} className="block md:grid md:grid-cols-3 md:gap-0">
                <div className="relative h-60 md:h-full overflow-hidden">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 320px"
                  />
                </div>
                <div className="md:col-span-2 p-6">
                  <div className="flex items-center gap-4 text-sm text-palette-turquoise mb-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {article.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-palette-white group-hover:text-palette-turquoise transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-palette-white/80 mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="font-normal bg-palette-turquoise/10 text-palette-turquoise border-palette-turquoise/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-palette-turquoise group-hover:text-palette-turquoise/80 inline-flex items-center text-sm font-medium">
                    Ler artigo completo
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
