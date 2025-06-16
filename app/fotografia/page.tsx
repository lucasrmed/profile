"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import PhotoLightbox from "@/components/photo-lightbox"

// Simulate a larger dataset for each category
const generateMorePhotos = (basePhotos: any[], totalCount = 30) => {
  const result = [...basePhotos]

  while (result.length < totalCount) {
    const originalPhotos = basePhotos.map((photo, index) => ({
      ...photo,
      id: photo.id + result.length,
      date: new Date(new Date(photo.date).setMonth(new Date(photo.date).getMonth() - result.length / basePhotos.length))
        .toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })
        .replace(".", ""),
    }))
    result.push(...originalPhotos)
  }

  return result.slice(0, totalCount)
}

// Add this PhotoGrid component with lazy loading and infinite scroll
function PhotoGrid({ photos: initialPhotos }: { photos: any[] }) {
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null)
  const [photos, setPhotos] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const loaderRef = useRef<HTMLDivElement>(null)
  const PHOTOS_PER_PAGE = 6

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  // Simulate fetching photos from an API
  const fetchPhotos = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const startIndex = (page - 1) * PHOTOS_PER_PAGE
    const endIndex = startIndex + PHOTOS_PER_PAGE
    const newPhotos = initialPhotos.slice(startIndex, endIndex)

    if (newPhotos.length === 0) {
      setHasMore(false)
    } else {
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos])
      setPage((prevPage) => prevPage + 1)
    }

    setLoading(false)
  }, [initialPhotos, page, loading, hasMore])

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          fetchPhotos()
        }
      },
      { threshold: 0.1 },
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [fetchPhotos, loading])

  // Initial load
  useEffect(() => {
    setPhotos([])
    setPage(1)
    setHasMore(true)
    fetchPhotos()
  }, [initialPhotos]) // Reset when photos change (tab change)

  // Generate random positions and sizes for scattered layout
  const getPhotoStyle = (index: number) => {
    const seed = index * 123456789 // Use index as seed for consistent positioning
    const random = (seed: number) => {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }

    const baseSize = 280
    const sizeVariation = random(seed + 1) * 80 + 40 // 40-120px variation
    const width = baseSize + sizeVariation
    const height = baseSize + random(seed + 2) * 100 + 50 // Different height variation

    return {
      width: `${width}px`,
      height: `${height}px`,
      transform: `rotate(${(random(seed + 3) - 0.5) * 6}deg)`, // Random rotation -3 to 3 degrees
    }
  }

  // Open lightbox with the clicked photo
  const openLightbox = (index: number) => {
    setCurrentPhotoIndex(index)
    setLightboxOpen(true)
  }

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  // Navigate to a specific photo in the lightbox
  const navigateToPhoto = (index: number) => {
    setCurrentPhotoIndex(index)
  }

  return (
    <div className="relative">
      {/* Desktop and Tablet Layout */}
      <div className="hidden md:block">
        <div className="columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {photos.map((photo, index) => {
            const isHovered = hoveredPhoto === photo.id
            const style = getPhotoStyle(index)

            return (
              <div
                key={photo.id}
                className="break-inside-avoid mb-6"
                style={{
                  transform: `${style.transform} ${isHovered ? "scale(1.05)" : "scale(1)"}`,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  zIndex: isHovered ? 20 : 1,
                }}
                onMouseEnter={() => setHoveredPhoto(photo.id)}
                onMouseLeave={() => setHoveredPhoto(null)}
                onClick={() => openLightbox(index)}
              >
                <Card
                  className={`overflow-hidden border-0 bg-palette-navy/50 transition-all duration-300 group cursor-pointer ${
                    isHovered
                      ? "shadow-2xl shadow-palette-turquoise/20 ring-2 ring-palette-turquoise/30"
                      : "shadow-lg hover:shadow-xl"
                  }`}
                >
                  <div className="relative" style={{ height: style.height }}>
                    <Image
                      src={photo.image || "/placeholder.svg"}
                      alt={photo.title}
                      fill
                      className="object-cover transition-transform duration-300"
                      loading="lazy" // Enable native lazy loading
                      style={{
                        transform: isHovered ? "scale(1.1)" : "scale(1)",
                      }}
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 flex flex-col justify-end p-4 ${
                        isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <h3
                        className="text-lg font-bold text-white mb-1 transform transition-transform duration-300"
                        style={{ transform: isHovered ? "translateY(0)" : "translateY(10px)" }}
                      >
                        {photo.title}
                      </h3>
                      <p
                        className="text-sm text-white/80 transform transition-transform duration-300"
                        style={{ transform: isHovered ? "translateY(0)" : "translateY(10px)" }}
                      >
                        {photo.description}
                      </p>
                      <div
                        className="flex justify-between items-center mt-2 text-xs text-white/70 transform transition-transform duration-300"
                        style={{ transform: isHovered ? "translateY(0)" : "translateY(10px)" }}
                      >
                        <span>{photo.date}</span>
                        <span>{photo.location}</span>
                      </div>
                    </div>
                    {/* Floating highlight effect */}
                    {isHovered && (
                      <div className="absolute -inset-2 bg-gradient-to-r from-palette-turquoise/20 to-transparent rounded-lg blur-sm animate-pulse" />
                    )}
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="grid grid-cols-1 gap-4">
          {photos.map((photo, index) => {
            const isHovered = hoveredPhoto === photo.id

            return (
              <div
                key={photo.id}
                className="w-full"
                onTouchStart={() => setHoveredPhoto(photo.id)}
                onTouchEnd={() => setHoveredPhoto(null)}
                onClick={() => openLightbox(index)}
              >
                <Card
                  className={`overflow-hidden border-0 bg-palette-navy/50 transition-all duration-300 group ${
                    isHovered ? "shadow-2xl shadow-palette-turquoise/20 ring-2 ring-palette-turquoise/30" : "shadow-lg"
                  }`}
                >
                  <div className="relative h-64">
                    <Image
                      src={photo.image || "/placeholder.svg"}
                      alt={photo.title}
                      fill
                      loading="lazy" // Enable native lazy loading
                      className="object-cover transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-active:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h3 className="text-lg font-bold text-white mb-1">{photo.title}</h3>
                      <p className="text-sm text-white/80">{photo.description}</p>
                      <div className="flex justify-between items-center mt-2 text-xs text-white/70">
                        <span>{photo.date}</span>
                        <span>{photo.location}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
      </div>

      {/* Loading indicator and intersection observer target */}
      <div ref={loaderRef} className="flex justify-center items-center py-12">
        {loading && (
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 text-palette-turquoise animate-spin" />
            <p className="text-palette-white/80 mt-2">Carregando mais fotos...</p>
          </div>
        )}
        {!loading && !hasMore && photos.length > 0 && (
          <p className="text-palette-white/80">Você chegou ao fim da galeria</p>
        )}
      </div>

      {/* Lightbox */}
      <PhotoLightbox
        photos={photos}
        currentIndex={currentPhotoIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNavigate={navigateToPhoto}
      />
    </div>
  )
}

export default function PhotographyPage() {
  const [activeTab, setActiveTab] = useState("natureza")

  // Base photo data
  const basePhotos = {
    natureza: [
      {
        id: 1,
        title: "Montanhas ao Pôr do Sol",
        description: "Capturada durante uma trilha nas montanhas, com o sol se pondo no horizonte.",
        image: "/placeholder.svg?height=800&width=1200",
        date: "15 Jun 2023",
        location: "Serra da Mantiqueira, Brasil",
      },
      {
        id: 2,
        title: "Cachoeira Véu de Noiva",
        description: "A beleza natural da queda d'água em meio à floresta preservada.",
        image: "/placeholder.svg?height=800&width=1200",
        date: "22 Jul 2023",
        location: "Chapada dos Veadeiros, Brasil",
      },
      {
        id: 3,
        title: "Floresta Nebulosa",
        description: "Árvores emergindo da névoa matinal em uma floresta de altitude.",
        image: "/placeholder.svg?height=800&width=1200",
        date: "03 Ago 2023",
        location: "Campos do Jordão, Brasil",
      },
      {
        id: 4,
        title: "Praia Deserta",
        description: "Areias douradas e águas cristalinas em uma praia isolada.",
        image: "/placeholder.svg?height=800&width=1200",
        date: "12 Set 2023",
        location: "Fernando de Noronha, Brasil",
      },
      {
        id: 5,
        title: "Campos de Lavanda",
        description: "Extensos campos de lavanda sob o céu azul de verão.",
        image: "/placeholder.svg?height=800&width=1200",
        date: "05 Out 2023",
        location: "Cunha, Brasil",
      },
      {
        id: 6,
        title: "Lago Espelhado",
        description: "Reflexo perfeito das montanhas na superfície calma do lago.",
        image: "/placeholder.svg?height=800&width=1200",
        date: "18 Nov 2023",
        location: "Patagônia, Argentina",
      },
    ],
    urbana: [
      {
        id: 7,
        title: "Luzes da Cidade",
        description: "Vista noturna da cidade com seus milhares de luzes brilhantes.",
        image: "/placeholder.svg?height=800&width=1200",
        date: "10 Jan 2023",
        location: "São Paulo, Brasil",
      },
      {
        id: 8,
        title: "Arquitetura Moderna",
        description: "Linhas e formas de um edifício contemporâneo no centro da cidade.",
        image: "/placeholder.svg?height=800&width=1200",
        date: "25 Fev 2023",
        location: "Rio de Janeiro, Brasil",
      },
      {
        id: 9,
        title: "Estação Antiga",
        description: "Detalhes arquitetônicos de uma estação ferroviária histórica.",
        image: "/placeholder.svg?height=800&width=1200",
        date: "14 Mar 2023",
        location: "Paranapiacaba, Brasil",
      },
      {
        id: 10,
        title: "Grafite Urbano",
        description: "Arte de rua colorida em um bairro boêmio da cidade.",
        image: "/placeholder.svg?height=800&width=1200",
        date: "30 Abr 2023",
        location: "Belo Horizonte, Brasil",
      },
    ],
    retratos: [
      {
        id: 11,
        title: "Olhar Profundo",
        description: "Retrato em preto e branco capturando a expressão intensa do sujeito.",
        image: "/placeholder.svg?height=800&width=1200",
        date: "08 Mai 2023",
        location: "Estúdio, São Paulo",
      },
      {
        id: 12,
        title: "Sorriso Genuíno",
        description: "Momento espontâneo de alegria capturado em luz natural.",
        image: "/placeholder.svg?height=800&width=1200",
        date: "19 Jun 2023",
        location: "Parque Ibirapuera, São Paulo",
      },
      {
        id: 13,
        title: "Artesão em Ação",
        description: "Retrato ambiental de um artesão trabalhando em sua oficina.",
        image: "/placeholder.svg?height=800&width=1200",
        date: "27 Jul 2023",
        location: "Embu das Artes, Brasil",
      },
    ],
    eventos: [
      {
        id: 14,
        title: "Show ao Vivo",
        description: "Banda se apresentando para uma multidão entusiasmada.",
        image: "/placeholder.svg?height=800&width=1200",
        date: "12 Ago 2023",
        location: "Festival de Verão, Salvador",
      },
      {
        id: 15,
        title: "Casamento na Praia",
        description: "Momento emocionante durante uma cerimônia de casamento à beira-mar.",
        image: "/placeholder.svg?height=800&width=1200",
        date: "23 Set 2023",
        location: "Ilhabela, Brasil",
      },
      {
        id: 16,
        title: "Conferência de Tecnologia",
        description: "Palestrante compartilhando conhecimento em um evento de tecnologia.",
        image: "/placeholder.svg?height=800&width=1200",
        date: "05 Out 2023",
        location: "Centro de Convenções, Brasília",
      },
    ],
  }

  // Generate larger datasets for each category
  const photos = {
    natureza: generateMorePhotos(basePhotos.natureza, 30),
    urbana: generateMorePhotos(basePhotos.urbana, 24),
    retratos: generateMorePhotos(basePhotos.retratos, 18),
    eventos: generateMorePhotos(basePhotos.eventos, 21),
  }

  return (
    <div className="min-h-screen bg-gradient-main pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-8">
          <Link href="/" className="text-palette-turquoise hover:text-palette-turquoise/80 flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Home
          </Link>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-palette-white">Minha Fotografia</h1>
          <p className="text-xl text-palette-white/80">
            Capturando momentos e paisagens através das minhas lentes. Aqui compartilho minha paixão pela fotografia e
            algumas das minhas melhores imagens.
          </p>
          <div className="mt-4 flex items-center text-palette-turquoise">
            <div className="flex items-center">
              <span className="text-sm">
                {activeTab === "natureza" && "30 fotos"}
                {activeTab === "urbana" && "24 fotos"}
                {activeTab === "retratos" && "18 fotos"}
                {activeTab === "eventos" && "21 fotos"}
              </span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="natureza" className="max-w-7xl mx-auto" onValueChange={(value) => setActiveTab(value)}>
          <div className="flex justify-center mb-12">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-xl bg-palette-darkBlue">
              <TabsTrigger
                value="natureza"
                className="data-[state=active]:bg-palette-turquoise data-[state=active]:text-palette-darkBlue"
              >
                Natureza
              </TabsTrigger>
              <TabsTrigger
                value="urbana"
                className="data-[state=active]:bg-palette-turquoise data-[state=active]:text-palette-darkBlue"
              >
                Urbana
              </TabsTrigger>
              <TabsTrigger
                value="retratos"
                className="data-[state=active]:bg-palette-turquoise data-[state=active]:text-palette-darkBlue"
              >
                Retratos
              </TabsTrigger>
              <TabsTrigger
                value="eventos"
                className="data-[state=active]:bg-palette-turquoise data-[state=active]:text-palette-darkBlue"
              >
                Eventos
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="natureza">
            <PhotoGrid photos={photos.natureza} />
          </TabsContent>

          <TabsContent value="urbana">
            <PhotoGrid photos={photos.urbana} />
          </TabsContent>

          <TabsContent value="retratos">
            <PhotoGrid photos={photos.retratos} />
          </TabsContent>

          <TabsContent value="eventos">
            <PhotoGrid photos={photos.eventos} />
          </TabsContent>
        </Tabs>

        {/* Keep the existing "Sobre Minha Fotografia" and equipment sections */}
        <div className="max-w-4xl mx-auto mt-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-palette-white">Sobre Minha Fotografia</h2>
          <div className="text-palette-white/80 space-y-4">
            <p>
              Minha jornada na fotografia começou há mais de 5 anos, quando adquiri minha primeira câmera DSLR. Desde
              então, tenho explorado diferentes estilos e técnicas, sempre buscando capturar a essência dos momentos e
              lugares que fotografo.
            </p>
            <p>
              Minha abordagem fotográfica é minimalista e focada em destacar a beleza natural dos elementos. Prefiro
              trabalhar com luz natural e busco composições que contem histórias através das imagens.
            </p>
            <p>
              Além da fotografia de natureza e paisagens, que é minha principal paixão, também gosto de explorar a
              fotografia urbana, retratos e eventos especiais.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-16 p-8 bg-palette-navy/50 rounded-lg border border-palette-turquoise/20">
          <h3 className="text-xl font-bold mb-4 text-palette-white">Equipamento</h3>
          <ul className="space-y-2 text-palette-white/80">
            <li>• Câmera: Sony Alpha a7 III</li>
            <li>• Lentes: Sony 24-70mm f/2.8 GM, Sony 70-200mm f/4 G, Sony 85mm f/1.8</li>
            <li>• Tripé: Manfrotto Befree Advanced</li>
            <li>• Filtros: Polarizador circular, ND variável</li>
            <li>• Edição: Adobe Lightroom e Photoshop</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
