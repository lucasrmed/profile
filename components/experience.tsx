"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, Award, GraduationCap } from "lucide-react"

export default function Experience() {
  const [activeTab, setActiveTab] = useState("work")

  const workExperience = [
    {
      id: 1,
      role: "Desenvolvedor Front-End Sênior",
      company: "Quattrus (Autônomo)",
      period: "Mar 2024 - Presente",
      description:
        "Lidero o desenvolvimento de um projeto de edição colaborativa de elementos gráficos, utilizando Fabric.js para uma experiência visual rica. A arquitetura segue os princípios da Clean Architecture para garantir escalabilidade e manutenibilidade.",
      achievements: [
        "Criação de um Design System para consistência e reutilização em múltiplos projetos.",
        "Desenvolvimento de uma solução white label com suporte à internacionalização (i18n).",
        "Implementação de CI/CD com Docker e Azure Pipelines para automação de entregas.",
        "Foco em desafios complexos de UX, performance e arquitetura de software.",
      ],
      technologies: [
        "React",
        "Next.js",
        "Fabric.js",
        "TypeScript",
        "Tanstack Query",
        "Zustand",
        "Tailwind CSS",
        "Docker",
        "Azure Pipelines",
      ],
    },
    {
      id: 2,
      role: "Desenvolvedor de Software",
      company: "Villela Brasil Bank",
      period: "Jan 2022 - Fev 2024",
      description:
        "Atuação consolidada no desenvolvimento de soluções Front-End com Next.js e mobile com React Native, focando na criação de aplicações eficientes, responsivas e com alta qualidade de experiência do usuário.",
      achievements: [
        "Desenvolvimento de aplicações web de alta eficiência e responsividade com Next.js.",
        "Construção de aplicativos móveis multiplataforma (iOS/Android) com React Native.",
        "Aplicação de técnicas avançadas de otimização de performance em todas as fases do projeto.",
        "Trabalho com metodologias ágeis para garantir entregas flexíveis e de alta qualidade.",
      ],
      technologies: ["Next.js", "React Native", "React.js", "TypeScript", "Performance Optimization", "Agile"],
    },
  ]

  const education = [
    {
      id: 1,
      degree: "MBA em Gestão de Projetos de TI",
      institution: "Universidade de Tecnologia",
      period: "2019 - 2020",
      description:
        "Especialização em gestão de projetos de tecnologia com foco em metodologias ágeis e liderança técnica.",
    },
    {
      id: 2,
      degree: "Bacharelado em Ciência da Computação",
      institution: "Universidade Federal",
      period: "2012 - 2016",
      description:
        "Formação em fundamentos da computação, algoritmos, estruturas de dados e desenvolvimento de software.",
    },
  ]

  const certifications = [
    {
      id: 1,
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2022",
      credentialId: "AWS-DEV-12345",
    },
    {
      id: 2,
      name: "Professional Scrum Master I",
      issuer: "Scrum.org",
      date: "2021",
      credentialId: "PSM-I-98765",
    },
    {
      id: 3,
      name: "React Advanced Patterns",
      issuer: "Frontend Masters",
      date: "2020",
      credentialId: "FM-REACT-54321",
    },
    {
      id: 4,
      name: "JavaScript Performance",
      issuer: "Udemy",
      date: "2019",
      credentialId: "UD-JS-PERF-67890",
    },
  ]

  return (
    <section id="experiencia" className="py-20 bg-palette-darkGray/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experiência Profissional</h2>
          <p className="text-xl text-palette-white/80">Minha trajetória profissional e formação acadêmica</p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-md shadow-sm bg-palette-darkBlue/50">
            <button
              onClick={() => setActiveTab("work")}
              className={`px-4 py-2 md:px-6 md:py-3 text-sm font-medium rounded-l-md border-y border-l border-palette-turquoise/20 flex items-center gap-2 transition-colors ${
                activeTab === "work"
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent text-palette-white/80 hover:bg-palette-turquoise/10"
              }`}
            >
              <Briefcase className="h-4 w-4" />
              Experiência
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`px-4 py-2 md:px-6 md:py-3 text-sm font-medium border border-palette-turquoise/20 flex items-center gap-2 transition-colors ${
                activeTab === "education"
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent text-palette-white/80 hover:bg-palette-turquoise/10"
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              Formação
            </button>
            <button
              onClick={() => setActiveTab("certifications")}
              className={`px-4 py-2 md:px-6 md:py-3 text-sm font-medium rounded-r-md border-y border-r border-palette-turquoise/20 flex items-center gap-2 transition-colors ${
                activeTab === "certifications"
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent text-palette-white/80 hover:bg-palette-turquoise/10"
              }`}
            >
              <Award className="h-4 w-4" />
              Certificações
            </button>
          </div>
        </div>

        {activeTab === "work" && (
          <div className="max-w-4xl mx-auto space-y-8">
            {workExperience.map((job) => (
              <Card key={job.id} className="border-l-4 border-l-primary bg-palette-darkBlue/50 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-palette-white">{job.role}</h3>
                      <div className="text-lg text-palette-turquoise">{job.company}</div>
                    </div>
                    <div className="flex items-center text-palette-white/70 text-sm flex-shrink-0">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{job.period}</span>
                    </div>
                  </div>

                  <p className="mb-4 text-palette-white/80">{job.description}</p>

                  {job.achievements && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2 text-palette-white">Principais conquistas:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {job.achievements.map((achievement, index) => (
                          <li key={index} className="text-palette-white/80">
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mt-4">
                    {job.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="font-normal bg-palette-turquoise/10 text-palette-turquoise border-palette-turquoise/20"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "education" && (
          <div className="max-w-4xl mx-auto space-y-8">
            {education.map((edu) => (
              <Card key={edu.id} className="border-l-4 border-l-primary bg-palette-darkBlue/50 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-palette-white">{edu.degree}</h3>
                      <div className="text-lg text-palette-turquoise">{edu.institution}</div>
                    </div>
                    <div className="flex items-center text-palette-white/70">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{edu.period}</span>
                    </div>
                  </div>

                  <p className="text-palette-white/80">{edu.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "certifications" && (
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              <Card key={cert.id} className="bg-palette-darkBlue/50 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-palette-white">{cert.name}</h3>
                      <div className="text-palette-turquoise">{cert.issuer}</div>
                      <div className="flex items-center mt-2 text-sm text-palette-white/70">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{cert.date}</span>
                      </div>
                      <div className="text-xs text-palette-white/60 mt-1">ID: {cert.credentialId}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
