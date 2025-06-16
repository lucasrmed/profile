"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function Skills() {
  const [activeTab, setActiveTab] = useState("frontend")

  const frontendSkills = [
    { name: "React/Next.js", level: 95, years: 6 },
    { name: "TypeScript", level: 90, years: 5 },
    { name: "JavaScript (ES6+)", level: 98, years: 8 },
    { name: "HTML5 & CSS3", level: 95, years: 8 },
    { name: "Tailwind CSS", level: 92, years: 4 },
    { name: "State Management (Redux, Zustand)", level: 88, years: 5 },
    { name: "Styled Components / Emotion", level: 85, years: 4 },
    { name: "TanStack Query / SWR", level: 85, years: 3 },
  ]

  const toolsSkills = [
    { name: "Git & GitHub", level: 90, years: 7 },
    { name: "Webpack / Vite", level: 85, years: 5 },
    { name: "Jest & Testing Library", level: 82, years: 4 },
    { name: "Storybook", level: 80, years: 3 },
    { name: "Figma", level: 75, years: 4 },
    { name: "CI/CD (GitHub Actions, Azure Pipelines)", level: 78, years: 3 },
    { name: "Docker", level: 70, years: 2 },
    { name: "Vercel / AWS", level: 75, years: 3 },
  ]

  const backendSkills = [
    { name: "Node.js & Express", level: 80, years: 4 },
    { name: "GraphQL (Apollo)", level: 70, years: 2 },
    { name: "RESTful APIs", level: 85, years: 5 },
    { name: "MongoDB / Mongoose", level: 65, years: 2 },
    { name: "PostgreSQL / Prisma", level: 60, years: 2 },
    { name: "Firebase (Auth, Firestore)", level: 75, years: 3 },
    { name: "Serverless Functions", level: 70, years: 2 },
    { name: "Authentication (JWT, OAuth)", level: 78, years: 4 },
  ]

  const softSkills = [
    "Liderança Técnica",
    "Mentoria de Desenvolvedores",
    "Comunicação Clara e Eficaz",
    "Resolução de Problemas Complexos",
    "Trabalho em Equipe Colaborativo",
    "Gerenciamento de Tempo e Prioridades",
    "Pensamento Crítico e Analítico",
    "Adaptabilidade e Flexibilidade",
    "Aprendizado Contínuo",
    "Atenção aos Detalhes e Qualidade",
    "Arquitetura de Software",
    "Metodologias Ágeis (Scrum/Kanban)",
  ]

  const renderSkillList = (skills: Array<{ name: string; level: number; years: number }>) => (
    <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
      {skills.map((skill) => (
        <div key={skill.name}>
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-medium text-palette-white">{skill.name}</h4>
            <span className="text-sm text-palette-turquoise/80">{skill.years} anos</span>
          </div>
          <Progress
            value={skill.level}
            className="h-1.5 bg-palette-navy" // Trilha da barra de progresso
            indicatorClassName="bg-palette-turquoise" // Cor da barra de progresso
          />
        </div>
      ))}
    </div>
  )

  return (
    <section id="habilidades" className="py-20 bg-palette-darkBlue">
      {" "}
      {/* Novo fundo */}
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-palette-white">Habilidades Técnicas</h2>
          <p className="text-xl text-palette-white/80">
            Minha stack de tecnologias, ferramentas e competências que utilizo para construir soluções digitais de
            impacto.
          </p>
        </div>

        <Tabs defaultValue="frontend" className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-10">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-xl bg-palette-navy shadow-md">
              <TabsTrigger
                value="frontend"
                onClick={() => setActiveTab("frontend")}
                className="py-2.5 text-sm font-medium text-palette-white/70 data-[state=active]:bg-palette-turquoise data-[state=active]:text-palette-darkBlue data-[state=active]:shadow-lg transition-all duration-200"
              >
                Front-end
              </TabsTrigger>
              <TabsTrigger
                value="tools"
                onClick={() => setActiveTab("tools")}
                className="py-2.5 text-sm font-medium text-palette-white/70 data-[state=active]:bg-palette-turquoise data-[state=active]:text-palette-darkBlue data-[state=active]:shadow-lg transition-all duration-200"
              >
                Ferramentas
              </TabsTrigger>
              <TabsTrigger
                value="backend"
                onClick={() => setActiveTab("backend")}
                className="py-2.5 text-sm font-medium text-palette-white/70 data-[state=active]:bg-palette-turquoise data-[state=active]:text-palette-darkBlue data-[state=active]:shadow-lg transition-all duration-200"
              >
                Back-end
              </TabsTrigger>
              <TabsTrigger
                value="soft"
                onClick={() => setActiveTab("soft")}
                className="py-2.5 text-sm font-medium text-palette-white/70 data-[state=active]:bg-palette-turquoise data-[state=active]:text-palette-darkBlue data-[state=active]:shadow-lg transition-all duration-200"
              >
                Soft Skills
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="frontend">{renderSkillList(frontendSkills)}</TabsContent>

          <TabsContent value="tools">{renderSkillList(toolsSkills)}</TabsContent>

          <TabsContent value="backend">{renderSkillList(backendSkills)}</TabsContent>

          <TabsContent value="soft" className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {softSkills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="justify-center text-center py-2.5 px-3 text-xs sm:text-sm leading-tight bg-palette-navy text-palette-white border border-palette-turquoise/20 hover:bg-palette-turquoise/10 transition-colors"
              >
                {skill}
              </Badge>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
