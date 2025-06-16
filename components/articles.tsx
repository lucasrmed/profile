import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function Articles() {
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
    <section id="artigos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-palette-white">Artigos Técnicos</h2>
          <p className="text-xl text-palette-white/80">
            Compartilhando conhecimento e experiências sobre desenvolvimento front-end
          </p>
        </div>

        <div className="space-y-12 max-w-5xl mx-auto">
          {articles.map((article, index) => (
            <Card
              key={article.id}
              className="overflow-hidden border-0 bg-palette-navy/50 shadow-lg hover:shadow-xl hover:shadow-palette-turquoise/10 transition-all duration-300 group"
            >
              <div
                className={cn(
                  "md:grid md:grid-cols-12 md:gap-8 items-center",
                  index % 2 === 0 ? "" : "", // Base classes, specific ordering below
                )}
              >
                {/* Image Section */}
                <div
                  className={cn(
                    "md:col-span-5 relative aspect-video md:aspect-[16/10] overflow-hidden",
                    index % 2 === 0 ? "md:order-1" : "md:order-2", // Alternates image position
                  )}
                >
                  <Link href={`/artigos/${article.id}`} className="block h-full">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 500px"
                    />
                  </Link>
                </div>

                {/* Content Section */}
                <div
                  className={cn(
                    "md:col-span-7 p-6 md:py-6",
                    index % 2 === 0 ? "md:order-2 md:pl-0" : "md:order-1 md:pr-0", // Alternates text position
                  )}
                >
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
                  <h3 className="text-2xl font-bold mb-3 text-palette-white">
                    <Link href={`/artigos/${article.id}`} className="hover:text-palette-turquoise transition-colors">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-palette-white/80 mb-4 line-clamp-3 md:line-clamp-4">{article.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
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
                  <Link
                    href={`/artigos/${article.id}`}
                    className="text-palette-turquoise hover:text-palette-turquoise/80 inline-flex items-center text-sm font-medium"
                  >
                    Ler artigo completo
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/artigos">
            <Button
              variant="outline"
              size="lg"
              className="border-palette-turquoise text-palette-turquoise hover:bg-palette-turquoise/10"
            >
              Ver todos os artigos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
