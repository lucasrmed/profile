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
    { name: "JavaScript", level: 98, years: 8 },
    { name: "HTML5/CSS3", level: 95, years: 8 },
    { name: "Tailwind CSS", level: 92, years: 4 },
    { name: "Redux/Context API", level: 88, years: 5 },
    { name: "Styled Components", level: 85, years: 4 },
    { name: "React Query", level: 85, years: 3 },
  ]

  const toolsSkills = [
    { name: "Git/GitHub", level: 90, years: 7 },
    { name: "Webpack/Vite", level: 85, years: 5 },
    { name: "Jest/Testing Library", level: 82, years: 4 },
    { name: "Storybook", level: 80, years: 3 },
    { name: "Figma", level: 75, years: 4 },
    { name: "CI/CD", level: 78, years: 3 },
    { name: "Docker", level: 70, years: 2 },
    { name: "AWS/Vercel", level: 75, years: 3 },
  ]

  const backendSkills = [
    { name: "Node.js", level: 80, years: 4 },
    { name: "Express", level: 75, years: 3 },
    { name: "GraphQL", level: 70, years: 2 },
    { name: "REST APIs", level: 85, years: 5 },
    { name: "MongoDB", level: 65, years: 2 },
    { name: "PostgreSQL", level: 60, years: 2 },
    { name: "Firebase", level: 75, years: 3 },
    { name: "Serverless", level: 70, years: 2 },
  ]

  const softSkills = [
    "Liderança técnica",
    "Mentoria",
    "Comunicação",
    "Resolução de problemas",
    "Trabalho em equipe",
    "Gestão de tempo",
    "Pensamento crítico",
    "Adaptabilidade",
    "Aprendizado contínuo",
    "Atenção aos detalhes",
  ]

  return (
    <section id="habilidades" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Habilidades Técnicas</h2>
          <p className="text-xl text-muted-foreground">
            Experiência sólida em tecnologias front-end modernas e práticas de desenvolvimento
          </p>
        </div>

        <Tabs defaultValue="frontend" className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-xl">
              <TabsTrigger value="frontend" onClick={() => setActiveTab("frontend")}>
                Front-end
              </TabsTrigger>
              <TabsTrigger value="tools" onClick={() => setActiveTab("tools")}>
                Ferramentas
              </TabsTrigger>
              <TabsTrigger value="backend" onClick={() => setActiveTab("backend")}>
                Back-end
              </TabsTrigger>
              <TabsTrigger value="soft" onClick={() => setActiveTab("soft")}>
                Soft Skills
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="frontend" className="space-y-6">
            {frontendSkills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="font-medium">{skill.name}</div>
                  <div className="text-sm text-muted-foreground">{skill.years} anos</div>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            {toolsSkills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="font-medium">{skill.name}</div>
                  <div className="text-sm text-muted-foreground">{skill.years} anos</div>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="backend" className="space-y-6">
            {backendSkills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="font-medium">{skill.name}</div>
                  <div className="text-sm text-muted-foreground">{skill.years} anos</div>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="soft" className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {softSkills.map((skill) => (
              <Badge key={skill} variant="secondary" className="justify-center py-2 px-4 text-sm">
                {skill}
              </Badge>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

