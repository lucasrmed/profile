"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Settings } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from 'lucide-react'
import PhotoLightbox from "@/components/photo-lightbox"
import { Button } from "@/components/ui/button"

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
  const [activeTab, setActiveTab] = useState("lifestyle")
  const [photos, setPhotos] = useState<any>({ lifestyle: [], urbana: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch("/api/photos")
        const data = await response.json()
        setPhotos(data)
      } catch (error) {
        console.error("Error fetching photos:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPhotos()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-main pt-24 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-palette-turquoise animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-main pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-palette-turquoise hover:text-palette-turquoise/80 flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Home
          </Link>
          <Link href="/fotografia/admin">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Admin
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-palette-white">Minha Fotografia</h1>
          <p className="text-xl text-palette-white/80">
            Capturando momentos do dia a dia, arquitetura e lifestyle. Aqui compartilho minha visão através das lentes.
          </p>
          <div className="mt-4 flex items-center text-palette-turquoise">
            <div className="flex items-center">
              <span className="text-sm">
                {activeTab === "lifestyle" && `${photos.lifestyle.length} fotos`}
                {activeTab === "urbana" && `${photos.urbana.length} fotos`}
              </span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="lifestyle" className="max-w-7xl mx-auto" onValueChange={(value) => setActiveTab(value)}>
          <div className="flex justify-center mb-12">
            <TabsList className="grid grid-cols-2 w-full max-w-md bg-palette-darkBlue">
              <TabsTrigger
                value="lifestyle"
                className="data-[state=active]:bg-palette-turquoise data-[state=active]:text-palette-darkBlue"
              >
                Lifestyle
              </TabsTrigger>
              <TabsTrigger
                value="urbana"
                className="data-[state=active]:bg-palette-turquoise data-[state=active]:text-palette-darkBlue"
              >
                Urbana
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="lifestyle">
            <PhotoGrid photos={photos.lifestyle} />
          </TabsContent>

          <TabsContent value="urbana">
            <PhotoGrid photos={photos.urbana} />
          </TabsContent>
        </Tabs>

        <div className="max-w-4xl mx-auto mt-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-palette-white">Sobre Minha Fotografia</h2>
          <div className="text-palette-white/80 space-y-4">
            <p>
              A fotografia para mim é uma forma de capturar momentos autênticos do cotidiano. Gosto de registrar desde
              cenas simples do dia a dia até detalhes arquitetônicos que chamam minha atenção.
            </p>
            <p>
              Minha abordagem é espontânea e focada em capturar a essência de cada momento, seja um jantar especial,
              uma noite de trabalho ou a beleza de espaços urbanos.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-16 p-8 bg-palette-navy/50 rounded-lg border border-palette-turquoise/20">
          <h3 className="text-xl font-bold mb-4 text-palette-white">Equipamento</h3>
          <ul className="space-y-2 text-palette-white/80">
            <li>• iPhone para capturas espontâneas</li>
            <li>• Edição: Lightroom Mobile e VSCO</li>
            <li>• Foco em luz natural e composições autênticas</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
