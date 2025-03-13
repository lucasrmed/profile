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
      role: "Lead Front-end Developer",
      company: "Tech Innovations Inc.",
      period: "2021 - Presente",
      description:
        "Lidero uma equipe de 6 desenvolvedores front-end, definindo arquitetura, padrões de código e melhores práticas. Implementei um design system que reduziu o tempo de desenvolvimento em 40% e melhorou a consistência da UI em todos os produtos.",
      achievements: [
        "Reduzi o tempo de carregamento das páginas em 65% através de otimizações de performance",
        "Implementei CI/CD que diminuiu bugs em produção em 80%",
        "Migrei o projeto legado para React e TypeScript, melhorando a manutenibilidade",
      ],
      technologies: ["React", "TypeScript", "Next.js", "Redux", "Jest", "Tailwind CSS"],
    },
    {
      id: 2,
      role: "Front-end Developer Sênior",
      company: "Digital Solutions",
      period: "2018 - 2021",
      description:
        "Responsável pelo desenvolvimento de aplicações web de alta performance para clientes enterprise. Trabalhei diretamente com designers e stakeholders para implementar interfaces complexas e garantir a melhor experiência do usuário.",
      achievements: [
        "Desenvolvi um framework interno que acelerou o desenvolvimento em 35%",
        "Implementei testes automatizados que aumentaram a cobertura de código para 90%",
        "Mentoria de desenvolvedores júnior e pleno",
      ],
      technologies: ["React", "JavaScript", "Styled Components", "GraphQL", "Webpack"],
    },
    {
      id: 3,
      role: "Desenvolvedor Front-end",
      company: "Creative Web Agency",
      period: "2016 - 2018",
      description:
        "Desenvolvimento de websites e aplicações web responsivas para diversos clientes. Foco em performance, acessibilidade e experiência do usuário.",
      achievements: [
        "Implementei metodologia BEM e SASS que melhorou a organização do CSS",
        "Desenvolvi componentes reutilizáveis que aceleraram entregas em 25%",
        "Otimizei o processo de build reduzindo o tamanho dos bundles em 40%",
      ],
      technologies: ["JavaScript", "HTML5", "CSS3", "SASS", "jQuery", "Gulp"],
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
    <section id="experiencia" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experiência Profissional</h2>
          <p className="text-xl text-muted-foreground">Minha trajetória profissional e formação acadêmica</p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setActiveTab("work")}
              className={`px-6 py-3 text-sm font-medium rounded-l-md border ${
                activeTab === "work"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-input hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Briefcase className="h-4 w-4 mr-2" />
              Experiência
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`px-6 py-3 text-sm font-medium border-y ${
                activeTab === "education"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-input hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <GraduationCap className="h-4 w-4 mr-2" />
              Formação
            </button>
            <button
              onClick={() => setActiveTab("certifications")}
              className={`px-6 py-3 text-sm font-medium rounded-r-md border ${
                activeTab === "certifications"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-input hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Award className="h-4 w-4 mr-2" />
              Certificações
            </button>
          </div>
        </div>

        {activeTab === "work" && (
          <div className="max-w-4xl mx-auto space-y-8">
            {workExperience.map((job) => (
              <Card key={job.id} className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{job.role}</h3>
                      <div className="text-lg text-muted-foreground">{job.company}</div>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{job.period}</span>
                    </div>
                  </div>

                  <p className="mb-4">{job.description}</p>

                  {job.achievements && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Principais conquistas:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {job.achievements.map((achievement, index) => (
                          <li key={index} className="text-muted-foreground">
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mt-4">
                    {job.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
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
              <Card key={edu.id} className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{edu.degree}</h3>
                      <div className="text-lg text-muted-foreground">{edu.institution}</div>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{edu.period}</span>
                    </div>
                  </div>

                  <p>{edu.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "certifications" && (
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              <Card key={cert.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">{cert.name}</h3>
                      <div className="text-muted-foreground">{cert.issuer}</div>
                      <div className="flex items-center mt-2 text-sm">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{cert.date}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">ID: {cert.credentialId}</div>
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

