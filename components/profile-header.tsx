import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProfileHeader() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="font-bold text-xl">Meu Perfil</div>
        <nav className="hidden md:flex gap-6">
          <Link href="#sobre" className="text-muted-foreground hover:text-foreground transition-colors">
            Sobre
          </Link>
          <Link href="#experiencia" className="text-muted-foreground hover:text-foreground transition-colors">
            Experiência
          </Link>
          <Link href="#hobbies" className="text-muted-foreground hover:text-foreground transition-colors">
            Hobbies
          </Link>
          <Link href="#contato" className="text-muted-foreground hover:text-foreground transition-colors">
            Contato
          </Link>
        </nav>
        <Button variant="outline" className="hidden md:flex">
          Currículo
        </Button>
        <Button variant="outline" size="icon" className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </div>
    </header>
  )
}
