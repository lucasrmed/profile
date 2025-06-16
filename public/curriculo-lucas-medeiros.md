# Lucas Medeiros

Porto Alegre - RS | Celular: (51) 99440-0050 | E-mail: rodrigues@lucasmedeiros.dev
LinkedIn: [www.linkedin.com/in/guicarneiro1](https://www.linkedin.com/in/guicarneiro1) | GitHub: [github.com/lucasrmed](https://github.com/lucasrmed) | Site: [Seu Site Aqui](https://example.com)

---

## RESUMO PROFISSIONAL

Desenvolvedor de software com mais de 4 anos de experiência em ambientes ágeis, especializado em Front-End e Desenvolvimento Mobile. Expertise comprovada em React.js, Next.js, React Native e Typescript, com conhecimento em Angular. Apaixonado por criar experiências de usuário excepcionais, aplicando técnicas de otimização de performance e Clean Architecture para garantir entregas robustas e escaláveis. Comprometido com a melhoria contínua e inovação, com interesse em tecnologias emergentes, como Inteligência Artificial, Cloud Computing e Blockchain.

---

## EXPERIÊNCIA PROFISSIONAL

### Quattrus – Desenvolvedor Front-End Sênior
*Março 2024 – Presente | Porto Alegre, RS*

- **Liderança de Projeto:** Responsável pelo desenvolvimento de uma solução colaborativa para edição de elementos gráficos, com utilização de Fabric.js, React e Next.js.
- **Arquitetura e Integração:** Implementação de Clean Architecture e integração de Docker com pipelines de CI/CD (Azure Pipelines) para ambientes consistentes (desenvolvimento, testes e produção).
- **Design & Experiência do Usuário:** Criação e manutenção de um Design System que agilizou o desenvolvimento e garantiu interfaces modernas e responsivas, com suporte à internacionalização.
- **Colaboração e Metodologias Ágeis:** Trabalho em equipe multidisciplinar utilizando práticas ágeis, o que resultou em entregas consistentes e melhoria contínua de processos.

### Villela Brasil Bank – Desenvolvedor de Software
*Janeiro 2022 – Fevereiro 2024 | Rio Grande do Sul, RS*

- **Desenvolvimento Web e Mobile:** Criação de aplicações web robustas com Next.js e aplicativos multiplataforma com React Native, entregando soluções que aumentaram a performance e a responsividade.
- **Otimização de Performance:** Aplicação de técnicas avançadas para otimização, contribuindo para uma experiência de usuário aprimorada e maior eficiência operacional.
- **Metodologias Ágeis:** Colaboração em times ágeis, assegurando a aderência às melhores práticas e a entrega de projetos com qualidade superior.

---

## COMPETÊNCIAS & PALAVRAS-CHAVE

- **Desenvolvimento Web e Mobile:** React.js, Next.js, React Native, Angular
- **Linguagens & Ferramentas:** JavaScript, Typescript, HTML5, CSS3, Tailwind CSS
- **Metodologias Ágeis:** Scrum, Kanban, CI/CD (Azure Pipelines)
- **Otimização & Arquitetura:** Performance Optimization, Clean Architecture
- **Gerenciamento de Estado & API:** Zustand, Tanstack React Query, ContextAPI
- **Contêineres & Cloud:** Docker
- **Design e UI:** Design System, Fabric.js
- **Ferramentas de Versionamento:** Git, GitHub

---

## FORMAÇÃO ACADÊMICA

### Senac RS – Análise e Desenvolvimento de Sistemas
*Abril 2022 – Maio 2024*

---

## RESULTADOS & IMPACTO

- **Redução de Retrabalho:** Otimização dos processos de desenvolvimento com a implementação de CI/CD, resultando em ciclos de entrega mais rápidos e consistentes.
- **Melhoria na Experiência do Usuário:** Aplicação de técnicas de performance que contribuíram para uma interface mais responsiva e intuitiva, elevando a satisfação dos usuários finais.
- **Inovação e Escalabilidade:** Desenvolvimento de soluções white label com suporte à internacionalização e design modular, facilitando adaptações para diferentes mercados e marcas.
\`\`\`

```typescriptreact file="components/hero.tsx"
[v0-no-op-code-block-prefix]"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 0.5
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        // Ajustando a cor das partículas para combinar com a nova paleta
        const colors = ["rgba(1, 195, 142, 0.2)", "rgba(255, 255, 255, 0.1)"]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function init() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()

        // Connect particles with lines
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(1, 195, 142, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    init()
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <section id="sobre" className="relative min-h-screen flex items-center pt-16">
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" style={{ opacity: 0.7 }} />

      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center py-20">
        <div className="space-y-6 order-2 md:order-1">
          <div>
            <h2 className="text-lg font-medium text-primary mb-2">Desenvolvedor Front-end Sênior</h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-palette-white">
              Transformando ideias em experiências digitais excepcionais
            </h1>
          </div>

          <p className="text-xl text-palette-white/80 leading-relaxed">
            Com mais de 5 anos de experiência, especializado em criar interfaces modernas, acessíveis e de alta
            performance utilizando React, TypeScript e as mais recentes tecnologias front-end.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="group bg-palette-turquoise hover:bg-palette-turquoise/90">
              Ver projetos
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-palette-turquoise text-palette-turquoise hover:bg-palette-turquoise/10"
              asChild // Allows the Button to wrap an anchor tag
            >
              <a href="/curriculo-lucas-medeiros.md" download="Curriculo_Lucas_Medeiros.md">
                Download CV
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-6 pt-6">
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-10 rounded-full text-palette-white hover:text-palette-turquoise hover:bg-palette-darkBlue/50"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-10 rounded-full text-palette-white hover:text-palette-turquoise hover:bg-palette-darkBlue/50"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-10 rounded-full text-palette-white hover:text-palette-turquoise hover:bg-palette-darkBlue/50"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative order-1 md:order-2 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-palette-turquoise/20 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-palette-turquoise/10 to-palette-turquoise/30 z-10" />
            <Image
              src="/profile-picture.jpeg" // Updated image source
              alt="Foto de perfil"
              fill // Use fill to cover the container
              className="object-cover w-full h-full"
              priority // Add priority for LCP
            />
          </div>
          <div className="absolute -bottom-6 right-0 md:right-10 bg-palette-navy border border-palette-turquoise/20 rounded-lg py-3 px-4 shadow-lg">
            <div className="text-sm font-medium text-palette-white">Disponível para projetos</div>
            <div className="text-xs text-palette-turquoise">Contate-me agora</div>
          </div>
        </div>
      </div>
    </section>
  )
}
