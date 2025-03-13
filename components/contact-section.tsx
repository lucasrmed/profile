import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react"

export default function ContactSection() {
  return (
    <section id="contato" className="py-20">
      <div className="space-y-4 mb-10">
        <h2 className="text-3xl font-bold tracking-tight">Entre em Contato</h2>
        <p className="text-muted-foreground">Tem alguma pergunta ou proposta? Não hesite em entrar em contato.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">seuemail@exemplo.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Telefone</h3>
                <p className="text-muted-foreground">(00) 12345-6789</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Localização</h3>
                <p className="text-muted-foreground">São Paulo, Brasil</p>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button size="icon" variant="outline">
                <Github className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="outline">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="outline">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nome
              </label>
              <Input id="name" placeholder="Seu nome" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" type="email" placeholder="seuemail@exemplo.com" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">
              Assunto
            </label>
            <Input id="subject" placeholder="Como posso ajudar?" />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Mensagem
            </label>
            <Textarea id="message" placeholder="Sua mensagem..." className="min-h-[120px]" />
          </div>

          <Button type="submit" className="w-full">
            Enviar Mensagem
          </Button>
        </form>
      </div>
    </section>
  )
}

