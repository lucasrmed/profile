"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all")

  const projects = [
    {
      id: 1,
      title: "Dashboard Analytics",
      description:
        "Dashboard interativo com visualizações de dados em tempo real, filtros avançados e relatórios personalizados.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React", "TypeScript", "D3.js", "Tailwind CSS"],
      category: "web",
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: "Plataforma completa de e-commerce com carrinho, checkout, pagamentos e painel administrativo.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["Next.js", "Redux", "Stripe", "MongoDB"],
      category: "web",
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 3,
      title: "Fintech Mobile App",
      description: "Aplicativo móvel para gestão financeira pessoal com análise de gastos e investimentos.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React Native", "TypeScript", "Firebase"],
      category: "mobile",
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 4,
      title: "Design System",
      description: "Sistema de design completo com componentes reutilizáveis, documentação e guias de estilo.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React", "Storybook", "Styled Components"],
      category: "ui",
      demoUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      id: 5,
      title: "Task Management App",
      description: "Aplicativo de gerenciamento de tarefas com recursos de colaboração em equipe.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React", "GraphQL", "Apollo", "Tailwind CSS"],
      category: "web",
      demoUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      id: 6,
      title: "Real-time Chat",
      description: "Aplicação de chat em tempo real com suporte a mensagens, arquivos e notificações.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["Next.js", "Socket.io", "TypeScript"],
      category: "web",
      demoUrl: "#",
      githubUrl: "#",
      featured: false,
    },
  ]

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter)

  const featuredProjects = projects.filter((project) => project.featured)

  return (
    <section id="projetos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projetos em Destaque</h2>
          <p className="text-xl text-palette-silver">
            Uma seleção dos meus melhores trabalhos em desenvolvimento front-end
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden group border-0 bg-background shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition-all z-10" />
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={800}
                  height={600}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-normal text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 3 && (
                    <Badge variant="outline" className="font-normal text-xs">
                      +{project.tags.length - 3}
                    </Badge>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-palette-silver mb-4 line-clamp-2">{project.description}</p>
                <div className="flex items-center gap-3">
                  <Link href={project.demoUrl}>
                    <Button variant="default" size="sm" className="gap-1">
                      <ExternalLink className="h-4 w-4" />
                      Demo
                    </Button>
                  </Link>
                  <Link href={project.githubUrl}>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Github className="h-4 w-4" />
                      Código
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="group">
            Ver todos os projetos
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}
