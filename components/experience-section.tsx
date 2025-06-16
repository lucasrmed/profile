import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ExperienceSection() {
  const experiences = [
    {
      title: "Desenvolvedor Front-end",
      company: "Empresa XYZ",
      period: "2020 - Presente",
      description:
        "Desenvolvimento de interfaces de usuário responsivas e acessíveis utilizando React, Next.js e Tailwind CSS.",
      skills: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    },
    {
      title: "Designer UX/UI",
      company: "Agência ABC",
      period: "2018 - 2020",
      description: "Criação de wireframes, protótipos e design de interfaces para aplicações web e mobile.",
      skills: ["Figma", "Adobe XD", "UI Design", "Prototyping"],
    },
    {
      title: "Estagiário de Desenvolvimento",
      company: "Startup DEF",
      period: "2017 - 2018",
      description: "Suporte no desenvolvimento de aplicações web e implementação de novas funcionalidades.",
      skills: ["HTML", "CSS", "JavaScript", "PHP"],
    },
  ]

  return (
    <section id="experiencia" className="py-20">
      <div className="space-y-4 mb-10">
        <h2 className="text-3xl font-bold tracking-tight">Experiência Profissional</h2>
        <p className="text-muted-foreground">Minha jornada profissional e habilidades adquiridas ao longo dos anos.</p>
      </div>
      <div className="grid gap-6">
        {experiences.map((exp, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{exp.title}</CardTitle>
                  <CardDescription>{exp.company}</CardDescription>
                </div>
                <Badge variant="outline">{exp.period}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, i) => (
                  <Badge key={i} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
