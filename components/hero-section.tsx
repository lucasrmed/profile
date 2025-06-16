import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section id="sobre" className="py-20 md:py-32 flex flex-col md:flex-row items-center gap-10">
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Olá, eu sou <span className="text-primary">Seu Nome</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Desenvolvedor Web & Designer apaixonado por criar experiências digitais incríveis.
        </p>
        <div className="flex gap-4">
          <Button>Entre em contato</Button>
          <Button variant="outline">Ver projetos</Button>
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary">
          <Image
            src="/placeholder.svg?height=320&width=320"
            alt="Foto de perfil"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  )
}
