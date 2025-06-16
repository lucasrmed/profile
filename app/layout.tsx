import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lucas Medeiros - Desenvolvedor Full Stack",
  description:
    "Portfólio de Lucas Medeiros, desenvolvedor full stack especialista em criar soluções web modernas e eficientes.",,
  // Adicione outras meta tags relevantes aqui, como open graph, twitter cards, etc.
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo-lucas-medeiros.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo-lucas-medeiros.png" type="image/png" />
        {/* Você pode adicionar outros tamanhos ou tipos de ícone aqui se necessário */}
        {/* Ex: <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"> */}
        {/* Ex: <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"> */}
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Mantendo o tema escuro como padrão conforme o design
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
