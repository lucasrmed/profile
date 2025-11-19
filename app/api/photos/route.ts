import { NextResponse } from "next/server"

export async function GET() {
  const photos = {
    lifestyle: [
      {
        id: 1,
        title: "Noite de Código",
        description: "Desenvolvendo soluções na madrugada, quando a criatividade flui.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0438-iSpNdVoQoLOBScCEBdCL4Xx7sf7VRN.jpeg",
        date: "15 Jan 2025",
        location: "Home Office",
        category: "lifestyle",
      },
      {
        id: 2,
        title: "Pizza & Vinho",
        description: "Momentos simples que tornam a vida especial.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9E3C7D9A-65F6-4C1E-965B-00D7A1CC17CC-KCokGqx2dL3ZcogITIHIHyxit6uaAy.jpeg",
        date: "22 Dez 2024",
        location: "Casa",
        category: "lifestyle",
      },
      {
        id: 3,
        title: "Jantar a Dois",
        description: "Celebrando conexões e momentos especiais.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0582-SBpGU3v841Z8FUoPeTyClWuyy9XedZ.jpeg",
        date: "10 Nov 2024",
        location: "Restaurante",
        category: "lifestyle",
      },
      {
        id: 4,
        title: "Adega de Vinhos",
        description: "Entre barris centenários e arte nas paredes, a tradição vive.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9520-gObfrS1kpTR3Dmfm46h1dCy26MndRK.jpeg",
        date: "28 Out 2024",
        location: "Vale dos Vinhedos, RS",
        category: "lifestyle",
      },
    ],
    urbana: [
      {
        id: 5,
        title: "Café Aconchegante",
        description: "Explorando espaços urbanos com personalidade e charme.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0743-oWGdOfXNcGPD9mzNGXseQamBQ8fQ8J.jpeg",
        date: "05 Out 2024",
        location: "Centro da Cidade",
        category: "urbana",
      },
      {
        id: 6,
        title: "Lustre e Vitrais",
        description: "Detalhes arquitetônicos que contam histórias.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0208-IQdIB76tLzIap4xvgzA83e6oY4MJvy.jpeg",
        date: "18 Set 2024",
        location: "Edifício Histórico",
        category: "urbana",
      },
      {
        id: 7,
        title: "Geometria e Luz",
        description: "Arquitetura minimalista e iluminação natural.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9776-OtA4zJLn0SFNfT8Le5sonXO5Vt8QGd.jpeg",
        date: "30 Ago 2024",
        location: "Museu",
        category: "urbana",
      },
      {
        id: 8,
        title: "Vitral Ornamentado",
        description: "A majestade dos vitrais clássicos em um edifício histórico.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9763-vZd4OWD1a9jprKc8t5ilxc8sQ5m6fd.jpeg",
        date: "12 Ago 2024",
        location: "Museu Histórico",
        category: "urbana",
      },
      {
        id: 9,
        title: "Entre Ilustrações",
        description: "Admirando a arte botânica e ornitológica em exposição.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0908.JPG-cEJzzSXqVj7o5xwluO3PhaecVmiKWW.jpeg",
        date: "25 Jul 2024",
        location: "Museu de História Natural",
        category: "urbana",
      },
    ],
  }

  return NextResponse.json(photos)
}

export async function POST(request: Request) {
  try {
    const { photo } = await request.json()
    
    // TODO: Save to database or persistent storage
    // For now, just return success
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving photo:", error)
    return NextResponse.json({ error: "Failed to save photo" }, { status: 500 })
  }
}
