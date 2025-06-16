"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight, Download, Share2, Info } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PhotoLightboxProps {
  photos: any[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function PhotoLightbox({ photos, currentIndex, isOpen, onClose, onNavigate }: PhotoLightboxProps) {
  const [showInfo, setShowInfo] = useState(true)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<"left" | "right" | null>(null)

  const currentPhoto = photos[currentIndex]

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft") {
        navigatePrev()
      } else if (e.key === "ArrowRight") {
        navigateNext()
      } else if (e.key === "i") {
        setShowInfo((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentIndex, photos.length])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const navigateNext = useCallback(() => {
    if (isAnimating) return

    setIsAnimating(true)
    setDirection("right")

    setTimeout(() => {
      if (currentIndex < photos.length - 1) {
        onNavigate(currentIndex + 1)
      } else {
        onNavigate(0) // Loop back to the first photo
      }
      setIsAnimating(false)
    }, 300)
  }, [currentIndex, photos.length, onNavigate, isAnimating])

  const navigatePrev = useCallback(() => {
    if (isAnimating) return

    setIsAnimating(true)
    setDirection("left")

    setTimeout(() => {
      if (currentIndex > 0) {
        onNavigate(currentIndex - 1)
      } else {
        onNavigate(photos.length - 1) // Loop to the last photo
      }
      setIsAnimating(false)
    }, 300)
  }, [currentIndex, photos.length, onNavigate, isAnimating])

  // Handle touch events for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      navigateNext()
    } else if (isRightSwipe) {
      navigatePrev()
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  if (!isOpen || !currentPhoto) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={onClose}>
      {/* Main content */}
      <div
        className="relative w-full h-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-white hover:text-palette-turquoise transition-colors"
          aria-label="Fechar"
        >
          <X className="h-8 w-8" />
        </button>

        {/* Navigation buttons */}
        <button
          onClick={navigatePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:text-palette-turquoise transition-colors"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="h-10 w-10" />
        </button>

        <button
          onClick={navigateNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:text-palette-turquoise transition-colors"
          aria-label="Próxima foto"
        >
          <ChevronRight className="h-10 w-10" />
        </button>

        {/* Image container with animation */}
        <div className="relative w-full h-full max-w-7xl max-h-[80vh] flex items-center justify-center px-4 py-16">
          <div
            className={cn(
              "relative w-full h-full transition-transform duration-300",
              isAnimating && direction === "right" && "-translate-x-[100px] opacity-0",
              isAnimating && direction === "left" && "translate-x-[100px] opacity-0",
            )}
          >
            <div className="relative w-full h-full">
              <Image
                src={currentPhoto.image || "/placeholder.svg"}
                alt={currentPhoto.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
            </div>
          </div>
        </div>

        {/* Info panel */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm transition-transform duration-300 p-4 md:p-6",
            showInfo ? "translate-y-0" : "translate-y-full",
          )}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{currentPhoto.title}</h2>
                <p className="text-white/80 mb-2">{currentPhoto.description}</p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-palette-turquoise">
                  <div>{currentPhoto.date}</div>
                  <div>{currentPhoto.location}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-palette-turquoise hover:bg-white/10"
                  aria-label="Download"
                >
                  <Download className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-palette-turquoise hover:bg-white/10"
                  aria-label="Compartilhar"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("text-white hover:bg-white/10", showInfo ? "text-palette-turquoise" : "text-white")}
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowInfo(!showInfo)
                  }}
                  aria-label={showInfo ? "Esconder informações" : "Mostrar informações"}
                >
                  <Info className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-white/60 text-sm">
                Foto {currentIndex + 1} de {photos.length}
              </div>

              <div className="text-white/60 text-sm hidden md:block">
                Use as setas do teclado para navegar • ESC para fechar • I para {showInfo ? "esconder" : "mostrar"}{" "}
                informações
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
