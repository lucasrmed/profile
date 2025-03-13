import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Articles() {
  const articles = [
    {
      id: 1,
      title: "Otimizando Performance em Aplicações React",
      excerpt:
        "Técnicas avançadas para melhorar a performance de aplicações React, incluindo memoização, code splitting e renderização condicional.",
      image: "/placeholder.svg?height=400&width=600",
      date: "12 Mar 2023",
      readTime: "8 min",
      tags: ["React", "Performance", "JavaScript"],
    },
    {
      id: 2,
      title: "Arquitetura de Componentes Escaláveis",
      excerpt:
        "Como estruturar componentes React para projetos de grande escala, utilizando padrões de design e práticas de componentização.",
      image: "/placeholder.svg?height=400&width=600",
      date: "25 Jan 2023",
      readTime: "10 min",
      tags: ["Arquitetura", "React", "Design Patterns"],
    },
    {
      id: 3,
      title: "Testes Automatizados para Front-end",
      excerpt:
        "Estratégias eficientes para implementar testes unitários, de integração e end-to-end em aplicações front-end modernas.",
      image: "/placeholder.svg?height=400&width=600",
      date: "08 Dez 2022",
      readTime: "12 min",
      tags: ["Testes", "Jest", "Testing Library"],
    },
  ]

  return (
    <section id="artigos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Artigos Técnicos</h2>
          <p className="text-xl text-muted-foreground">
            Compartilhando conhecimento e experiências sobre desenvolvimento front-end
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="overflow-hidden flex flex-col h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-6 flex-grow">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {article.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {article.readTime}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <Link href="#" className="text-primary hover:underline inline-flex items-center text-sm font-medium">
                  Ler artigo completo
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            Ver todos os artigos
          </Button>
        </div>
      </div>
    </section>
  )
}

