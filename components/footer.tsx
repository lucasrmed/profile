import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-12 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <Link href="/" className="text-xl font-bold tracking-tight">
              <span className="text-primary">Dev</span>Sênior
            </Link>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
              Desenvolvedor Front-end Sênior especializado em criar experiências digitais modernas, acessíveis e de alta
              performance.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">© {currentYear} Seu Nome. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

