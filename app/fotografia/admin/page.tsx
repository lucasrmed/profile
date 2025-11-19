"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, Loader2, Trash2 } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import Image from "next/image"

interface Photo {
  id: number
  title: string
  description: string
  image: string
  date: string
  location: string
  category: "lifestyle" | "urbana"
}

export default function AdminPhotographyPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [photos, setPhotos] = useState<{ lifestyle: Photo[], urbana: Photo[] }>({ lifestyle: [], urbana: [] })
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null)
  const router = useRouter()

  // Form states
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState<"lifestyle" | "urbana">("lifestyle")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (isAuthenticated) {
      loadPhotos()
    }
  }, [isAuthenticated])

  const loadPhotos = async () => {
    try {
      const response = await fetch("/api/photos")
      const data = await response.json()
      setPhotos(data)
    } catch (error) {
      console.error("Error loading photos:", error)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simple password check (you can set this as an environment variable)
    if (password === "lucasmedeiros2025") {
      setIsAuthenticated(true)
    } else {
      alert("Senha incorreta!")
    }

    setLoading(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      alert("Selecione uma imagem primeiro!")
      return
    }

    setUploadLoading(true)

    try {
      // Upload to Blob
      const formData = new FormData()
      formData.append("file", file)

      const uploadResponse = await fetch("/api/photos/upload", {
        method: "POST",
        headers: {
          "x-admin-password": password,
        },
        body: formData,
      })

      if (!uploadResponse.ok) {
        throw new Error("Upload failed")
      }

      const { url } = await uploadResponse.json()

      // Save photo metadata
      const photoData = {
        title,
        description,
        location,
        category,
        image: url,
        date: new Date().toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      }

      await fetch("/api/photos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ photo: photoData }),
      })

      alert("Foto adicionada com sucesso!")
      
      // Reset form
      setFile(null)
      setTitle("")
      setDescription("")
      setLocation("")
      setPreviewUrl(null)
      
      loadPhotos()
    } catch (error) {
      console.error("Error uploading photo:", error)
      alert("Erro ao fazer upload da foto. Tente novamente.")
    } finally {
      setUploadLoading(false)
    }
  }

  const handleDelete = async (photoId: number, imageUrl: string) => {
    if (!confirm("Tem certeza que deseja deletar esta foto?")) {
      return
    }

    setDeleteLoading(photoId)

    try {
      const response = await fetch("/api/photos/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ id: photoId, imageUrl }),
      })

      if (!response.ok) {
        throw new Error("Delete failed")
      }

      alert("Foto removida com sucesso!")
      loadPhotos()
    } catch (error) {
      console.error("Error deleting photo:", error)
      alert("Erro ao deletar a foto. Tente novamente.")
    } finally {
      setDeleteLoading(null)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-main pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center mb-8">
            <Link href="/fotografia" className="text-palette-turquoise hover:text-palette-turquoise/80 flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Fotografia
            </Link>
          </div>

          <div className="max-w-md mx-auto">
            <Card className="p-8 bg-palette-navy/50 border-palette-turquoise/20">
              <h1 className="text-2xl font-bold mb-6 text-palette-white">Admin - Fotografia</h1>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="password" className="text-palette-white">Senha de Acesso</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 bg-palette-darkBlue text-palette-white border-palette-turquoise/30"
                    placeholder="Digite a senha"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-palette-turquoise text-palette-darkBlue hover:bg-palette-turquoise/80"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Entrar"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-main pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-8">
          <Link href="/fotografia" className="text-palette-turquoise hover:text-palette-turquoise/80 flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Fotografia
          </Link>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-palette-white">Gerenciar Fotos</h2>
            
            <div className="space-y-8">
              {/* Lifestyle Photos */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-palette-turquoise">Lifestyle</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {photos.lifestyle.map((photo) => (
                    <Card key={photo.id} className="bg-palette-navy/50 border-palette-turquoise/20 overflow-hidden">
                      <div className="relative aspect-square">
                        <Image
                          src={photo.image || "/placeholder.svg"}
                          alt={photo.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="text-palette-white font-semibold mb-1">{photo.title}</h4>
                        <p className="text-palette-white/60 text-sm mb-3">{photo.location}</p>
                        <Button
                          onClick={() => handleDelete(photo.id, photo.image)}
                          disabled={deleteLoading === photo.id}
                          variant="destructive"
                          size="sm"
                          className="w-full"
                        >
                          {deleteLoading === photo.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remover
                            </>
                          )}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Urbana Photos */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-palette-turquoise">Urbana</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {photos.urbana.map((photo) => (
                    <Card key={photo.id} className="bg-palette-navy/50 border-palette-turquoise/20 overflow-hidden">
                      <div className="relative aspect-square">
                        <Image
                          src={photo.image || "/placeholder.svg"}
                          alt={photo.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="text-palette-white font-semibold mb-1">{photo.title}</h4>
                        <p className="text-palette-white/60 text-sm mb-3">{photo.location}</p>
                        <Button
                          onClick={() => handleDelete(photo.id, photo.image)}
                          disabled={deleteLoading === photo.id}
                          variant="destructive"
                          size="sm"
                          className="w-full"
                        >
                          {deleteLoading === photo.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remover
                            </>
                          )}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Upload Form */}
          <div>
            <Card className="p-8 bg-palette-navy/50 border-palette-turquoise/20">
              <h2 className="text-2xl font-bold mb-6 text-palette-white">Adicionar Nova Foto</h2>
              
              <form onSubmit={handleUpload} className="space-y-6">
                {/* File Upload */}
                <div>
                  <Label htmlFor="file" className="text-palette-white">Imagem</Label>
                  <div className="mt-2">
                    <Input
                      id="file"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="bg-palette-darkBlue text-palette-white border-palette-turquoise/30"
                    />
                  </div>
                  {previewUrl && (
                    <div className="mt-4">
                      <img
                        src={previewUrl || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                {/* Title */}
                <div>
                  <Label htmlFor="title" className="text-palette-white">Título</Label>
                  <Input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-2 bg-palette-darkBlue text-palette-white border-palette-turquoise/30"
                    placeholder="Ex: Noite de Código"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description" className="text-palette-white">Descrição</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-2 bg-palette-darkBlue text-palette-white border-palette-turquoise/30"
                    placeholder="Descreva a foto..."
                    required
                    rows={3}
                  />
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location" className="text-palette-white">Localização</Label>
                  <Input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mt-2 bg-palette-darkBlue text-palette-white border-palette-turquoise/30"
                    placeholder="Ex: Caxias do Sul, RS"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category" className="text-palette-white">Categoria</Label>
                  <Select value={category} onValueChange={(value: "lifestyle" | "urbana") => setCategory(value)}>
                    <SelectTrigger className="mt-2 bg-palette-darkBlue text-palette-white border-palette-turquoise/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="urbana">Urbana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  disabled={uploadLoading}
                  className="w-full bg-palette-turquoise text-palette-darkBlue hover:bg-palette-turquoise/80"
                >
                  {uploadLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Fazendo Upload...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Adicionar Foto
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
