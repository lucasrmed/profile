"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all")

  const projects = [
    {
      id: 1,
      title: "Mobile Service",
      description:
        "Aplicação React Native que integra gerenciamento de viagens em grupo, permitindo organização colaborativa e sincronização em tempo real.",
      image: "/projects/framerama.png",
      tags: ["React Native", "TypeScript", "Mobile"],
      category: "mobile",
      demoUrl: "https://github.com/lucasmdocarmo/mobile-service",
      githubUrl: "https://github.com/lucasmdocarmo/mobile-service",
      featured: true,
    },
    {
      id: 2,
      title: "Mock Interface Creator",
      description: "Ferramenta para criação rápida de interfaces mockadas, facilitando o processo de prototipagem e validação de designs.",
      image: "/projects/mobile-service.png",
      tags: ["Next.js", "TypeScript", "UI/UX"],
      category: "web",
      demoUrl: "https://github.com/lucasmdocarmo/mock-interface-creator",
      githubUrl: "https://github.com/lucasmdocarmo/mock-interface-creator",
      featured: true,
    },
    {
      id: 3,
      title: "Framerama",
      description: "Filme Frame Game - aplicação Next.js que desafia os jogadores a identificar filmes a partir de imagens borradas. A cada tentativa incorreta, a imagem fica mais nítida.",
      image: "/projects/mock-creator.png",
      tags: ["Next.js", "TypeScript", "Game"],
      category: "web",
      demoUrl: "https://github.com/lucasmdocarmo/framerama",
      githubUrl: "https://github.com/lucasmdocarmo/framerama",
      featured: true,
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
