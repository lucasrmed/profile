import { Card, CardContent } from "@/components/ui/card"
import { Music, Book, Camera, Plane, Code, Dumbbell } from "lucide-react"

export default function HobbiesSection() {
  const hobbies = [
    {
      name: "Música",
      description: "Tocar violão e piano nas horas vagas",
      icon: Music,
    },
    {
      name: "Leitura",
      description: "Livros de ficção científica e desenvolvimento pessoal",
      icon: Book,
    },
    {
      name: "Fotografia",
      description: "Capturar momentos especiais e paisagens",
      icon: Camera,
    },
    {
      name: "Viagens",
      description: "Conhecer novas culturas e lugares",
      icon: Plane,
    },
    {
      name: "Programação",
      description: "Desenvolver projetos pessoais e aprender novas tecnologias",
      icon: Code,
    },
    {
      name: "Exercícios",
      description: "Manter a saúde física e mental em dia",
      icon: Dumbbell,
    },
  ]

  return (
    <section id="hobbies" className="py-20">
      <div className="space-y-4 mb-10">
        <h2 className="text-3xl font-bold tracking-tight">Hobbies & Interesses</h2>
        <p className="text-muted-foreground">O que eu gosto de fazer quando não estou trabalhando.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hobbies.map((hobby, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <hobby.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">{hobby.name}</h3>
                <p className="text-muted-foreground">{hobby.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
