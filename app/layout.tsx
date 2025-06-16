import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lucas Medeiros - Desenvolvedor Full Stack",
  description:
    "Portfólio de Lucas Medeiros, desenvolvedor full stack especialista em criar soluções web modernas e eficientes.", // Vírgula extra removida daqui
  // Adicione outras meta tags relevantes aqui, como open graph, twitter cards, etc.
  generator: "v0.dev", // Supondo que esta linha exista ou você queira adicioná-la
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
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
