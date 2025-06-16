"use client"

import { useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const testimonials = [
    {
      id: 1,
      content:
        "Profissional dedicado, de ótimo domínio técnico e de fácil adaptação a diferentes contextos. Ambientado com gestão através de metodologias ágeis e com atividades de boa complexidade e grande capacidade de execução.",
      author: "Kamir Voloski Pedernera",
      position: "Diretor de Inovação e Tecnologia",
      avatar: "/avatars/kamir-voloski.jpeg", // Correct
    },
    {
      id: 2,
      content:
        "Ótimo profissional, extremamente comunicativo e resolutivo, aprende rápido o ritmo da empresa e agarra as responsabilidades.",
      author: "Bruno Silva",
      position: "Front End Developer | React | React Native",
      avatar: "/avatars/wendel-cavalcanti.jpeg", // Swapped: Was Bruno's, now Wendel's photo
    },
    {
      id: 3,
      content:
        "Desenvolvedor Front-end com ótima interação com a equipe. Profissional dedicado e sempre em busca de conhecimento.",
      author: "Mário Eduardo Friedrich Cassali",
      position: "Analista de Testes Sênior",
      avatar: "/avatars/mario-cassali.jpeg", // Correct
    },
    {
      id: 4,
      content:
        'O mercado de tecnologia é um dos mais desafiadores que existem e é nesse cenário, com toda essa pressão e dificuldades, que uma das maiores qualidades do Lucas mais aparece: Sua paixão pela área! Lucas é um profissional persistente e dedicado, que não foge de desafios, não importa o quão difícil sejam: "Nova linguagem no Back: -Bora!", "Um app com Redux? - Bora!", "Agora um em React? -Booora!". Sua atitude sempre positiva somado a sua capacidade de aprendizagem e amor pela programação, fazem dele um profissional em ascenção diferenciado no mercado atual!',
      author: "Wendel T. Cavalcanti",
      position: "CTO na Villela Brasil Bank",
      avatar: "/avatars/bruno-silva.jpeg", // Swapped: Was Wendel's, now Bruno's photo
    },
  ]

  const nextSlide = () => {
    if (currentIndex < testimonials.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0) // Loop to start
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      setCurrentIndex(testimonials.length - 1) // Loop to end
    }
  }

  return (
    <section className="py-20 bg-palette-darkGray/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-palette-white">O que dizem sobre mim</h2>
          <p className="text-xl text-palette-white/80">Feedback de colegas e líderes com quem trabalhei</p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div ref={sliderRef} className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-2 md:px-4">
                  <Card className="border-0 bg-palette-darkBlue/50 shadow-xl h-full flex flex-col">
                    <CardContent className="p-6 md:p-8 flex-grow flex flex-col items-center text-center">
                      <div className="bg-palette-turquoise/10 p-3 rounded-full mb-6">
                        <Quote className="h-6 w-6 text-palette-turquoise" />
                      </div>
                      <p className="text-md md:text-lg text-palette-white/90 mb-8 italic leading-relaxed flex-grow">
                        "{testimonial.content}"
                      </p>
                      <div className="flex flex-col items-center mt-auto">
                        <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-palette-turquoise/30">
                          <Image
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.author}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-palette-white">{testimonial.author}</div>
                          <div className="text-sm text-palette-turquoise">{testimonial.position}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-0 md:-px-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="rounded-full text-palette-white hover:bg-palette-turquoise/10 hover:text-palette-turquoise"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="rounded-full text-palette-white hover:bg-palette-turquoise/10 hover:text-palette-turquoise"
              aria-label="Próximo"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className={`w-2.5 h-2.5 p-0 rounded-full transition-all ${
                  currentIndex === index
                    ? "bg-palette-turquoise scale-125"
                    : "bg-palette-white/30 hover:bg-palette-white/50"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
