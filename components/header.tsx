"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Sobre", href: "#sobre" },
    { name: "Habilidades", href: "#habilidades" },
    { name: "Projetos", href: "#projetos" },
    { name: "Experiência", href: "#experiencia" },
    { name: "Artigos", href: "/artigos" },
    { name: "Fotografia", href: "/fotografia" },
    { name: "Contato", href: "#contato" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-palette-darkBlue/90 backdrop-blur-md border-b border-palette-turquoise/10 py-3"
          : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-lucas-medeiros.png" // Este caminho usará a imagem atualizada
            alt="Lucas Medeiros Logo"
            width={150} // Ajuste a largura conforme necessário para o seu logo
            height={40} // Ajuste a altura conforme necessário para o seu logo
            className="h-8 md:h-10 w-auto" // Altura responsiva
            priority // Importante para LCP (Largest Contentful Paint)
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-palette-white/70 hover:text-palette-turquoise transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Button className="bg-palette-turquoise hover:bg-palette-turquoise/90 text-palette-darkBlue">
            Contrate-me
          </Button>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-palette-white hover:text-palette-turquoise"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-palette-darkBlue border-b border-palette-turquoise/10">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium py-2 text-palette-white/70 hover:text-palette-turquoise transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button className="mt-2 bg-palette-turquoise hover:bg-palette-turquoise/90 text-palette-darkBlue">
              Contrate-me
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
