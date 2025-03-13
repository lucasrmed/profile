"use client"

import { useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const testimonials = [
    {
      id: 1,
      content:
        "Um dos desenvolvedores front-end mais talentosos com quem já trabalhei. Seu conhecimento técnico e atenção aos detalhes são impressionantes. Ele não apenas entrega código de alta qualidade, mas também contribui com ideias inovadoras que elevam o produto final.",
      author: "Ana Silva",
      position: "CTO, Tech Innovations",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      content:
        "Sua capacidade de transformar designs complexos em interfaces intuitivas e responsivas é excepcional. Além disso, sua habilidade para otimizar performance e garantir acessibilidade fez toda a diferença em nossos projetos.",
      author: "Carlos Mendes",
      position: "Product Manager, Digital Solutions",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      content:
        "Além de ser um excelente desenvolvedor, ele é um ótimo mentor. Sua paciência e disposição para compartilhar conhecimento elevaram o nível técnico de toda a equipe. Recomendo fortemente para qualquer empresa que valorize qualidade e profissionalismo.",
      author: "Mariana Costa",
      position: "Lead Designer, Creative Agency",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]

  const nextSlide = () => {
    if (currentIndex < testimonials.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      setCurrentIndex(testimonials.length - 1)
    }
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">O que dizem sobre mim</h2>
          <p className="text-xl text-muted-foreground">Feedback de colegas e clientes com quem trabalhei</p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div ref={sliderRef} className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex justify-center mb-6">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Quote className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <p className="text-lg text-center mb-8 italic">"{testimonial.content}"</p>
                      <div className="flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <img
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold">{testimonial.author}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.position}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            <Button variant="outline" size="icon" onClick={prevSlide} className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Anterior</span>
            </Button>

            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className={`w-2 h-2 p-0 rounded-full ${
                  currentIndex === index ? "bg-primary" : "bg-muted-foreground/30"
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <span className="sr-only">Slide {index + 1}</span>
              </Button>
            ))}

            <Button variant="outline" size="icon" onClick={nextSlide} className="rounded-full">
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Próximo</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

